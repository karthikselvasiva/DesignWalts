import { useState, useEffect } from 'react';
import { servicesService } from '../services/dataService';
import { Plus, Edit2, Trash2, X, GripVertical } from 'lucide-react';

const CATEGORIES = [
    { value: 'digital', label: 'Digital' },
    { value: 'branding', label: 'Branding' },
    { value: 'print', label: 'Print' },
    { value: 'other', label: 'Other' },
];

const emptyForm = {
    name: '', description: '', icon: '🎨', category: 'digital',
    features: [''], pricing: { starter: 0, professional: 0, premium: 0 },
    featured: true, order: 1,
};

export default function Services() {
    const [items, setItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [form, setForm] = useState({ ...emptyForm });
    const [deleteId, setDeleteId] = useState(null);
    const [toast, setToast] = useState(null);

    const load = () => setItems(servicesService.getAll());
    useEffect(() => { load(); }, []);

    const openAdd = () => { setEditItem(null); setForm({ ...emptyForm, features: [''], order: items.length + 1 }); setShowModal(true); };
    const openEdit = (item) => { setEditItem(item); setForm({ ...item, features: item.features?.length ? item.features : [''] }); setShowModal(true); };

    const handleSave = (e) => {
        e.preventDefault();
        const cleanFeatures = form.features.filter(f => f.trim());
        const data = { ...form, features: cleanFeatures };
        if (editItem) {
            servicesService.update(editItem.id, data);
            showToast('Service updated!');
        } else {
            servicesService.create(data);
            showToast('Service created!');
        }
        setShowModal(false);
        load();
    };

    const handleDelete = () => {
        servicesService.delete(deleteId);
        setDeleteId(null);
        showToast('Service deleted.');
        load();
    };

    const addFeature = () => setForm({ ...form, features: [...form.features, ''] });
    const updateFeature = (i, val) => {
        const features = [...form.features];
        features[i] = val;
        setForm({ ...form, features });
    };
    const removeFeature = (i) => {
        const features = form.features.filter((_, idx) => idx !== i);
        setForm({ ...form, features: features.length ? features : [''] });
    };

    const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

    const formatPrice = (p) => p ? `₹${p.toLocaleString()}` : '—';

    return (
        <div>
            {toast && <div className="toast-container"><div className="toast success">✓ {toast}</div></div>}

            <div className="toolbar">
                <div className="toolbar-left">
                    <span className="text-muted">{items.length} services</span>
                </div>
                <div className="toolbar-right">
                    <button className="btn btn-primary" onClick={openAdd}><Plus size={18} /> Add Service</button>
                </div>
            </div>

            <div className="card">
                <div className="data-table-wrapper">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th style={{ width: 40 }}>#</th>
                                <th>Service</th>
                                <th>Category</th>
                                <th>Starter</th>
                                <th>Professional</th>
                                <th>Premium</th>
                                <th>Featured</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.length === 0 ? (
                                <tr><td colSpan={8}><div className="empty-state">
                                    <div className="empty-state-icon">🛠️</div>
                                    <h3>No services yet</h3>
                                    <p>Add your service offerings.</p>
                                    <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> Add Service</button>
                                </div></td></tr>
                            ) : items.map((item, i) => (
                                <tr key={item.id}>
                                    <td><span className="text-muted">{i + 1}</span></td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <span style={{ fontSize: '1.3rem' }}>{item.icon}</span>
                                            <div>
                                                <div style={{ fontWeight: 600 }}>{item.name}</div>
                                                <div className="text-sm text-muted truncate" style={{ maxWidth: 200 }}>{item.description}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td><span className="badge badge-default">{item.category}</span></td>
                                    <td>{formatPrice(item.pricing?.starter)}</td>
                                    <td>{formatPrice(item.pricing?.professional)}</td>
                                    <td>{formatPrice(item.pricing?.premium)}</td>
                                    <td>{item.featured ? '✅' : '—'}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 4 }}>
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

            {/* Modal */}
            <div className={`modal-overlay ${showModal ? 'active' : ''}`} onClick={() => setShowModal(false)}>
                <div className="modal modal-lg" onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                        <h3>{editItem ? 'Edit Service' : 'Add New Service'}</h3>
                        <button className="modal-close" onClick={() => setShowModal(false)}><X size={18} /></button>
                    </div>
                    <form onSubmit={handleSave}>
                        <div className="modal-body">
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Service Name <span className="required">*</span></label>
                                    <input className="form-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Icon (emoji)</label>
                                    <input className="form-input" value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} style={{ width: 80 }} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Description</label>
                                <textarea className="form-input" rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Category</label>
                                <select className="form-input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                                    {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Features</label>
                                {form.features.map((f, i) => (
                                    <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                                        <input className="form-input" value={f} onChange={e => updateFeature(i, e.target.value)} placeholder={`Feature ${i + 1}`} />
                                        <button type="button" className="btn btn-ghost btn-icon" onClick={() => removeFeature(i)}><X size={16} /></button>
                                    </div>
                                ))}
                                <button type="button" className="btn btn-sm btn-secondary" onClick={addFeature}><Plus size={14} /> Add Feature</button>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Pricing Tiers (₹)</label>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                                    <div>
                                        <label className="text-sm text-muted" style={{ display: 'block', marginBottom: 4 }}>Starter</label>
                                        <input type="number" className="form-input" value={form.pricing?.starter || 0} onChange={e => setForm({ ...form, pricing: { ...form.pricing, starter: parseInt(e.target.value) || 0 } })} />
                                    </div>
                                    <div>
                                        <label className="text-sm text-muted" style={{ display: 'block', marginBottom: 4 }}>Professional</label>
                                        <input type="number" className="form-input" value={form.pricing?.professional || 0} onChange={e => setForm({ ...form, pricing: { ...form.pricing, professional: parseInt(e.target.value) || 0 } })} />
                                    </div>
                                    <div>
                                        <label className="text-sm text-muted" style={{ display: 'block', marginBottom: 4 }}>Premium</label>
                                        <input type="number" className="form-input" value={form.pricing?.premium || 0} onChange={e => setForm({ ...form, pricing: { ...form.pricing, premium: parseInt(e.target.value) || 0 } })} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                                    <label className="toggle-switch">
                                        <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} />
                                        <span className="toggle-slider"></span>
                                    </label>
                                    <span className="form-label" style={{ margin: 0 }}>Featured Service</span>
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

            {/* Delete */}
            <div className={`modal-overlay ${deleteId ? 'active' : ''}`} onClick={() => setDeleteId(null)}>
                <div className="modal" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
                    <div className="modal-body">
                        <div className="confirm-dialog">
                            <div className="confirm-dialog-icon">🗑️</div>
                            <h3>Delete Service?</h3>
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
