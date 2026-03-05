import { useState, useEffect } from 'react';
import { testimonialsService } from '../services/dataService';
import { Plus, Search, Edit2, Trash2, CheckCircle, XCircle, X } from 'lucide-react';

const emptyForm = {
    name: '', company: '', role: '', quote: '', rating: 5, photo: '',
    featured: false, approvalStatus: 'pending',
};

export default function Testimonials() {
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [form, setForm] = useState({ ...emptyForm });
    const [deleteId, setDeleteId] = useState(null);
    const [toast, setToast] = useState(null);

    const load = () => setItems(testimonialsService.getAll());
    useEffect(() => { load(); }, []);

    const filtered = items.filter(item => {
        const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.company?.toLowerCase().includes(search.toLowerCase());
        const matchStatus = filterStatus === 'all' || item.approvalStatus === filterStatus;
        return matchSearch && matchStatus;
    });

    const openAdd = () => { setEditItem(null); setForm({ ...emptyForm }); setShowModal(true); };
    const openEdit = (item) => { setEditItem(item); setForm({ ...item }); setShowModal(true); };

    const handleSave = (e) => {
        e.preventDefault();
        if (editItem) {
            testimonialsService.update(editItem.id, form);
            showToast('Testimonial updated!');
        } else {
            testimonialsService.create(form);
            showToast('Testimonial created!');
        }
        setShowModal(false);
        load();
    };

    const handleDelete = () => {
        testimonialsService.delete(deleteId);
        setDeleteId(null);
        showToast('Testimonial deleted.');
        load();
    };

    const handleApprove = (id) => {
        testimonialsService.update(id, { approvalStatus: 'approved' });
        showToast('Testimonial approved!');
        load();
    };

    const handleReject = (id) => {
        testimonialsService.update(id, { approvalStatus: 'rejected' });
        showToast('Testimonial rejected.');
        load();
    };

    const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

    const renderStars = (rating) => (
        <div className="star-rating">
            {[1, 2, 3, 4, 5].map(s => <span key={s} className={s <= rating ? '' : 'star-empty'}>★</span>)}
        </div>
    );

    const statusBadge = (status) => {
        const map = { approved: 'success', pending: 'warning', rejected: 'danger' };
        return <span className={`badge badge-${map[status] || 'default'}`}>{status}</span>;
    };

    return (
        <div>
            {toast && <div className="toast-container"><div className="toast success">✓ {toast}</div></div>}

            <div className="toolbar">
                <div className="toolbar-left">
                    <div className="search-input">
                        <Search size={16} />
                        <input placeholder="Search testimonials..." value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                    <select className="filter-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                        <option value="all">All Status</option>
                        <option value="approved">Approved</option>
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
                <div className="toolbar-right">
                    <button className="btn btn-primary" onClick={openAdd}><Plus size={18} /> Add Testimonial</button>
                </div>
            </div>

            <div className="card">
                <div className="data-table-wrapper">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Client</th>
                                <th>Quote</th>
                                <th>Rating</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr><td colSpan={5}><div className="empty-state">
                                    <div className="empty-state-icon">💬</div>
                                    <h3>No testimonials found</h3>
                                    <p>Add client testimonials to showcase social proof.</p>
                                    <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> Add Testimonial</button>
                                </div></td></tr>
                            ) : filtered.map(item => (
                                <tr key={item.id}>
                                    <td>
                                        <div style={{ fontWeight: 600 }}>{item.name}</div>
                                        <div className="text-sm text-muted">{item.role}{item.company ? `, ${item.company}` : ''}</div>
                                    </td>
                                    <td><div className="truncate" style={{ maxWidth: 300 }}>{item.quote}</div></td>
                                    <td>{renderStars(item.rating)}</td>
                                    <td>{statusBadge(item.approvalStatus)}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 4 }}>
                                            {item.approvalStatus === 'pending' && (
                                                <>
                                                    <button className="btn btn-ghost btn-icon" title="Approve" onClick={() => handleApprove(item.id)}>
                                                        <CheckCircle size={16} color="#10b981" />
                                                    </button>
                                                    <button className="btn btn-ghost btn-icon" title="Reject" onClick={() => handleReject(item.id)}>
                                                        <XCircle size={16} color="#ef4444" />
                                                    </button>
                                                </>
                                            )}
                                            <button className="btn btn-ghost btn-icon" onClick={() => openEdit(item)}><Edit2 size={16} /></button>
                                            <button className="btn btn-ghost btn-icon" onClick={() => setDeleteId(item.id)}><Trash2 size={16} color="#ef4444" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add/Edit Modal */}
            <div className={`modal-overlay ${showModal ? 'active' : ''}`} onClick={() => setShowModal(false)}>
                <div className="modal" onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                        <h3>{editItem ? 'Edit Testimonial' : 'Add New Testimonial'}</h3>
                        <button className="modal-close" onClick={() => setShowModal(false)}><X size={18} /></button>
                    </div>
                    <form onSubmit={handleSave}>
                        <div className="modal-body">
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Client Name <span className="required">*</span></label>
                                    <input className="form-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Company</label>
                                    <input className="form-input" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Role / Position</label>
                                <input className="form-input" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Testimonial Quote <span className="required">*</span></label>
                                <textarea className="form-input" rows={4} value={form.quote} onChange={e => setForm({ ...form, quote: e.target.value })} required />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Rating</label>
                                    <div className="star-rating" style={{ fontSize: '1.5rem', cursor: 'pointer' }}>
                                        {[1, 2, 3, 4, 5].map(s => (
                                            <span key={s} onClick={() => setForm({ ...form, rating: s })} className={s <= form.rating ? '' : 'star-empty'}>★</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Status</label>
                                    <select className="form-input" value={form.approvalStatus} onChange={e => setForm({ ...form, approvalStatus: e.target.value })}>
                                        <option value="pending">Pending</option>
                                        <option value="approved">Approved</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                                    <label className="toggle-switch">
                                        <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} />
                                        <span className="toggle-slider"></span>
                                    </label>
                                    <span className="form-label" style={{ margin: 0 }}>Featured on Homepage</span>
                                </label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                            <button type="submit" className="btn btn-primary">{editItem ? 'Update' : 'Create'}</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Delete Confirm */}
            <div className={`modal-overlay ${deleteId ? 'active' : ''}`} onClick={() => setDeleteId(null)}>
                <div className="modal" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
                    <div className="modal-body">
                        <div className="confirm-dialog">
                            <div className="confirm-dialog-icon">🗑️</div>
                            <h3>Delete Testimonial?</h3>
                            <p>This action cannot be undone.</p>
                            <div className="confirm-dialog-actions">
                                <button className="btn btn-secondary" onClick={() => setDeleteId(null)}>Cancel</button>
                                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
