import { useState, useEffect } from 'react';
import { contactsService } from '../services/dataService';
import { Search, Mail, Phone, Building2, Calendar, MessageSquare, X, Eye } from 'lucide-react';

export default function ContactSubmissions() {
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selected, setSelected] = useState(null);
    const [toast, setToast] = useState(null);

    const load = () => setItems(contactsService.getAll());
    useEffect(() => { load(); }, []);

    const filtered = items.filter(item => {
        const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.email?.toLowerCase().includes(search.toLowerCase()) ||
            item.business?.toLowerCase().includes(search.toLowerCase());
        const matchStatus = filterStatus === 'all' || item.status === filterStatus;
        return matchSearch && matchStatus;
    });

    const updateStatus = (id, status) => {
        const respondedAt = status === 'contacted' ? new Date().toISOString() : undefined;
        contactsService.update(id, { status, ...(respondedAt ? { respondedAt } : {}) });
        if (selected?.id === id) setSelected({ ...selected, status, respondedAt: respondedAt || selected.respondedAt });
        showToast(`Status updated to "${status}"`);
        load();
    };

    const updateNotes = (id, notes) => {
        contactsService.update(id, { notes });
        if (selected?.id === id) setSelected({ ...selected, notes });
    };

    const deleteContact = (id) => {
        contactsService.delete(id);
        setSelected(null);
        showToast('Submission deleted.');
        load();
    };

    const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

    const statusColors = { new: 'info', contacted: 'warning', completed: 'success', archived: 'default' };
    const serviceLabel = (val) => val?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || '—';

    const counts = {
        all: items.length,
        new: items.filter(c => c.status === 'new').length,
        contacted: items.filter(c => c.status === 'contacted').length,
        completed: items.filter(c => c.status === 'completed').length,
        archived: items.filter(c => c.status === 'archived').length,
    };

    return (
        <div>
            {toast && <div className="toast-container"><div className="toast success">✓ {toast}</div></div>}

            {/* Status Tabs */}
            <div className="tabs">
                {['all', 'new', 'contacted', 'completed', 'archived'].map(status => (
                    <button key={status} className={`tab ${filterStatus === status ? 'active' : ''}`} onClick={() => setFilterStatus(status)}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                        {counts[status] > 0 && <span style={{ marginLeft: 6, fontSize: '0.75rem', opacity: 0.7 }}>({counts[status]})</span>}
                    </button>
                ))}
            </div>

            <div className="toolbar">
                <div className="toolbar-left">
                    <div className="search-input">
                        <Search size={16} />
                        <input placeholder="Search by name, email, or business..." value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="data-table-wrapper">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Contact</th>
                                <th>Service</th>
                                <th>Budget</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr><td colSpan={6}><div className="empty-state">
                                    <div className="empty-state-icon">📥</div>
                                    <h3>No submissions found</h3>
                                    <p>Contact form submissions will appear here.</p>
                                </div></td></tr>
                            ) : filtered.map(item => (
                                <tr key={item.id} style={{ cursor: 'pointer' }} onClick={() => setSelected(item)}>
                                    <td>
                                        <div style={{ fontWeight: 600 }}>{item.name}</div>
                                        <div className="text-sm text-muted">{item.email}</div>
                                    </td>
                                    <td>{serviceLabel(item.service)}</td>
                                    <td>{item.budget || '—'}</td>
                                    <td><span className={`badge badge-${statusColors[item.status]}`}>{item.status}</span></td>
                                    <td className="text-sm text-muted">{new Date(item.submittedAt).toLocaleDateString()}</td>
                                    <td>
                                        <button className="btn btn-ghost btn-icon" onClick={(e) => { e.stopPropagation(); setSelected(item); }}>
                                            <Eye size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Detail Modal */}
            <div className={`modal-overlay ${selected ? 'active' : ''}`} onClick={() => setSelected(null)}>
                <div className="modal modal-lg" onClick={e => e.stopPropagation()}>
                    {selected && (
                        <>
                            <div className="modal-header">
                                <h3>Inquiry from {selected.name}</h3>
                                <button className="modal-close" onClick={() => setSelected(null)}><X size={18} /></button>
                            </div>
                            <div className="modal-body">
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <Mail size={16} className="text-muted" />
                                        <div>
                                            <div className="text-sm text-muted">Email</div>
                                            <a href={`mailto:${selected.email}`} style={{ color: 'var(--clr-primary)', fontWeight: 500 }}>{selected.email}</a>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <Phone size={16} className="text-muted" />
                                        <div>
                                            <div className="text-sm text-muted">Phone</div>
                                            <span>{selected.phone || 'Not provided'}</span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <Building2 size={16} className="text-muted" />
                                        <div>
                                            <div className="text-sm text-muted">Business</div>
                                            <span>{selected.business || 'Not provided'}</span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <Calendar size={16} className="text-muted" />
                                        <div>
                                            <div className="text-sm text-muted">Submitted</div>
                                            <span>{new Date(selected.submittedAt).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginBottom: 20 }}>
                                    <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
                                        <span className="badge badge-info">{serviceLabel(selected.service)}</span>
                                        <span className="badge badge-default">{selected.budget || 'No budget'}</span>
                                        <span className={`badge badge-${statusColors[selected.status]}`}>{selected.status}</span>
                                    </div>
                                </div>

                                <div style={{ background: 'var(--clr-surface-hover)', borderRadius: 8, padding: 16, marginBottom: 20 }}>
                                    <div className="text-sm text-muted" style={{ marginBottom: 6 }}>
                                        <MessageSquare size={14} style={{ display: 'inline', marginRight: 4 }} /> Message
                                    </div>
                                    <p style={{ lineHeight: 1.6 }}>{selected.message || 'No message provided.'}</p>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Admin Notes</label>
                                    <textarea
                                        className="form-input"
                                        rows={3}
                                        value={selected.notes || ''}
                                        onChange={e => {
                                            setSelected({ ...selected, notes: e.target.value });
                                            updateNotes(selected.id, e.target.value);
                                        }}
                                        placeholder="Add internal notes about this inquiry..."
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Update Status</label>
                                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                        {['new', 'contacted', 'completed', 'archived'].map(s => (
                                            <button key={s} className={`btn btn-sm ${selected.status === s ? 'btn-primary' : 'btn-secondary'}`}
                                                onClick={() => updateStatus(selected.id, s)}>
                                                {s.charAt(0).toUpperCase() + s.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-danger btn-sm" onClick={() => deleteContact(selected.id)}>Delete</button>
                                <button className="btn btn-secondary" onClick={() => setSelected(null)}>Close</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
