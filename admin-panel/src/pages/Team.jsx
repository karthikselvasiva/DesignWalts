import { useState, useEffect } from 'react';
import { teamService } from '../services/dataService';
import { Plus, Edit2, Trash2, X, User as UserIcon } from 'lucide-react';

const emptyForm = {
    name: '', role: '', bio: '', photo: '',
    specialties: [''], social: { linkedin: '', twitter: '', instagram: '' },
    featured: true, order: 1,
};

export default function Team() {
    const [items, setItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [form, setForm] = useState({ ...emptyForm });
    const [deleteId, setDeleteId] = useState(null);
    const [toast, setToast] = useState(null);

    const load = () => setItems(teamService.getAll());
    useEffect(() => { load(); }, []);

    const openAdd = () => { setEditItem(null); setForm({ ...emptyForm, specialties: [''], order: items.length + 1 }); setShowModal(true); };
    const openEdit = (item) => {
        setEditItem(item);
        setForm({
            ...item,
            specialties: item.specialties?.length ? item.specialties : [''],
            social: { linkedin: '', twitter: '', instagram: '', ...item.social },
        });
        setShowModal(true);
    };

    const handleSave = (e) => {
        e.preventDefault();
        const cleanSpecialties = form.specialties.filter(s => s.trim());
        const data = { ...form, specialties: cleanSpecialties };
        if (editItem) { teamService.update(editItem.id, data); showToast('Member updated!'); }
        else { teamService.create(data); showToast('Member added!'); }
        setShowModal(false);
        load();
    };

    const handleDelete = () => { teamService.delete(deleteId); setDeleteId(null); showToast('Member removed.'); load(); };

    const addSpecialty = () => setForm({ ...form, specialties: [...form.specialties, ''] });
    const updateSpecialty = (i, val) => { const s = [...form.specialties]; s[i] = val; setForm({ ...form, specialties: s }); };
    const removeSpecialty = (i) => { const s = form.specialties.filter((_, idx) => idx !== i); setForm({ ...form, specialties: s.length ? s : [''] }); };

    const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

    return (
        <div>
            {toast && <div className="toast-container"><div className="toast success">✓ {toast}</div></div>}

            <div className="toolbar">
                <div className="toolbar-left"><span className="text-muted">{items.length} members</span></div>
                <div className="toolbar-right">
                    <button className="btn btn-primary" onClick={openAdd}><Plus size={18} /> Add Member</button>
                </div>
            </div>

            {/* Team Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
                {items.length === 0 ? (
                    <div className="card" style={{ gridColumn: '1/-1' }}>
                        <div className="empty-state">
                            <div className="empty-state-icon">👥</div>
                            <h3>No team members</h3>
                            <p>Add your team members to showcase your creative talent.</p>
                            <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> Add Member</button>
                        </div>
                    </div>
                ) : items.map(member => (
                    <div key={member.id} className="card" style={{ textAlign: 'center', padding: 28 }}>
                        <div style={{
                            width: 80, height: 80, borderRadius: '50%', margin: '0 auto 16px',
                            background: 'linear-gradient(135deg, #1864B2, #3BD3E7)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#fff', fontSize: '1.8rem', fontWeight: 700,
                        }}>
                            {member.name?.charAt(0).toUpperCase()}
                        </div>
                        <h4 style={{ marginBottom: 4 }}>{member.name}</h4>
                        <p className="text-sm text-muted" style={{ marginBottom: 12 }}>{member.role}</p>
                        {member.specialties?.length > 0 && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center', marginBottom: 12 }}>
                                {member.specialties.map((s, i) => (
                                    <span key={i} className="badge badge-info">{s}</span>
                                ))}
                            </div>
                        )}
                        <p className="text-sm text-muted" style={{ marginBottom: 16, lineHeight: 1.5 }}>
                            {member.bio?.length > 100 ? member.bio.substring(0, 100) + '...' : member.bio}
                        </p>
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                            <button className="btn btn-sm btn-secondary" onClick={() => openEdit(member)}><Edit2 size={14} /> Edit</button>
                            <button className="btn btn-sm btn-secondary" onClick={() => setDeleteId(member.id)} style={{ color: '#ef4444' }}><Trash2 size={14} /></button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            <div className={`modal-overlay ${showModal ? 'active' : ''}`} onClick={() => setShowModal(false)}>
                <div className="modal" onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                        <h3>{editItem ? 'Edit Member' : 'Add Team Member'}</h3>
                        <button className="modal-close" onClick={() => setShowModal(false)}><X size={18} /></button>
                    </div>
                    <form onSubmit={handleSave}>
                        <div className="modal-body">
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Full Name <span className="required">*</span></label>
                                    <input className="form-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Job Title / Role <span className="required">*</span></label>
                                    <input className="form-input" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Bio</label>
                                <textarea className="form-input" rows={3} value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Specialties</label>
                                {form.specialties.map((s, i) => (
                                    <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                                        <input className="form-input" value={s} onChange={e => updateSpecialty(i, e.target.value)} placeholder={`Specialty ${i + 1}`} />
                                        <button type="button" className="btn btn-ghost btn-icon" onClick={() => removeSpecialty(i)}><X size={16} /></button>
                                    </div>
                                ))}
                                <button type="button" className="btn btn-sm btn-secondary" onClick={addSpecialty}><Plus size={14} /> Add</button>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Social Links</label>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    <input className="form-input" placeholder="LinkedIn URL" value={form.social?.linkedin || ''} onChange={e => setForm({ ...form, social: { ...form.social, linkedin: e.target.value } })} />
                                    <input className="form-input" placeholder="Twitter URL" value={form.social?.twitter || ''} onChange={e => setForm({ ...form, social: { ...form.social, twitter: e.target.value } })} />
                                    <input className="form-input" placeholder="Instagram URL" value={form.social?.instagram || ''} onChange={e => setForm({ ...form, social: { ...form.social, instagram: e.target.value } })} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                                    <label className="toggle-switch">
                                        <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} />
                                        <span className="toggle-slider"></span>
                                    </label>
                                    <span className="form-label" style={{ margin: 0 }}>Featured Member</span>
                                </label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                            <button type="submit" className="btn btn-primary">{editItem ? 'Update' : 'Add Member'}</button>
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
                            <h3>Remove Team Member?</h3>
                            <p>This action cannot be undone.</p>
                            <div className="confirm-dialog-actions">
                                <button className="btn btn-secondary" onClick={() => setDeleteId(null)}>Cancel</button>
                                <button className="btn btn-danger" onClick={handleDelete}>Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
