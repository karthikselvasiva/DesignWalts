import { useState, useEffect } from 'react';
import { portfolioService } from '../services/dataService';
import { Plus, Search, Edit2, Trash2, Star, X, Image as ImageIcon } from 'lucide-react';

const CATEGORIES = [
    { value: 'web-design', label: 'Web Design' },
    { value: 'logo-design', label: 'Logo Design' },
    { value: 'branding', label: 'Branding' },
    { value: 'poster-design', label: 'Poster Design' },
    { value: 'social-media', label: 'Social Media' },
    { value: 'print', label: 'Print Design' },
    { value: 'other', label: 'Other' },
];

const TOOLS = ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'InDesign', 'Canva', 'Sketch', 'After Effects', 'React', 'Node.js', 'WordPress'];

const emptyForm = {
    title: '', category: 'web-design', description: '', client: '', testimonial: '',
    tools: [], year: new Date().getFullYear(), featured: false, images: [],
};

export default function Portfolio() {
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState('');
    const [filterCat, setFilterCat] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [form, setForm] = useState({ ...emptyForm });
    const [deleteId, setDeleteId] = useState(null);
    const [toast, setToast] = useState(null);

    const load = () => setItems(portfolioService.getAll());
    useEffect(() => { load(); }, []);

    const filtered = items.filter(item => {
        const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.client?.toLowerCase().includes(search.toLowerCase());
        const matchCat = filterCat === 'all' || item.category === filterCat;
        return matchSearch && matchCat;
    });

    const openAdd = () => { setEditItem(null); setForm({ ...emptyForm }); setShowModal(true); };
    const openEdit = (item) => { setEditItem(item); setForm({ ...item }); setShowModal(true); };

    const handleSave = (e) => {
        e.preventDefault();
        if (editItem) {
            portfolioService.update(editItem.id, form);
            showToast('Project updated successfully!');
        } else {
            portfolioService.create(form);
            showToast('Project created successfully!');
        }
        setShowModal(false);
        load();
    };

    const handleDelete = () => {
        portfolioService.delete(deleteId);
        setDeleteId(null);
        showToast('Project deleted.');
        load();
    };

    const toggleTool = (tool) => {
        setForm(f => ({
            ...f,
            tools: f.tools.includes(tool) ? f.tools.filter(t => t !== tool) : [...f.tools, tool],
        }));
    };

    const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

    const getCategoryLabel = (val) => CATEGORIES.find(c => c.value === val)?.label || val;

    return (
        <div>
            {toast && <div className="toast-container"><div className="toast success">✓ {toast}</div></div>}

            {/* Toolbar */}
            <div className="toolbar">
                <div className="toolbar-left">
                    <div className="search-input">
                        <Search size={16} />
                        <input placeholder="Search projects..." value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                    <select className="filter-select" value={filterCat} onChange={e => setFilterCat(e.target.value)}>
                        <option value="all">All Categories</option>
                        {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                </div>
                <div className="toolbar-right">
                    <button className="btn btn-primary" onClick={openAdd}><Plus size={18} /> Add Project</button>
                </div>
            </div>

            {/* Table */}
            <div className="card">
                <div className="data-table-wrapper">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Project</th>
                                <th>Category</th>
                                <th>Client</th>
                                <th>Year</th>
                                <th>Featured</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr><td colSpan={6}><div className="empty-state">
                                    <div className="empty-state-icon">📁</div>
                                    <h3>No projects found</h3>
                                    <p>Add your first portfolio project to get started.</p>
                                    <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> Add Project</button>
                                </div></td></tr>
                            ) : filtered.map(item => (
                                <tr key={item.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <div className="img-thumb"><ImageIcon size={20} /></div>
                                            <div>
                                                <div style={{ fontWeight: 600 }}>{item.title}</div>
                                                <div className="text-sm text-muted">{item.tools?.slice(0, 3).join(', ')}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td><span className="badge badge-info">{getCategoryLabel(item.category)}</span></td>
                                    <td>{item.client || '—'}</td>
                                    <td>{item.year}</td>
                                    <td>{item.featured ? <Star size={16} fill="#f59e0b" color="#f59e0b" /> : <Star size={16} color="#e2e8f0" />}</td>
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

            {/* Add/Edit Modal */}
            <div className={`modal-overlay ${showModal ? 'active' : ''}`} onClick={() => setShowModal(false)}>
                <div className="modal modal-lg" onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                        <h3>{editItem ? 'Edit Project' : 'Add New Project'}</h3>
                        <button className="modal-close" onClick={() => setShowModal(false)}><X size={18} /></button>
                    </div>
                    <form onSubmit={handleSave}>
                        <div className="modal-body">
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Project Title <span className="required">*</span></label>
                                    <input className="form-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Category <span className="required">*</span></label>
                                    <select className="form-input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                                        {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Description</label>
                                <textarea className="form-input" rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Client Name</label>
                                    <input className="form-input" value={form.client} onChange={e => setForm({ ...form, client: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Year</label>
                                    <input type="number" className="form-input" value={form.year} onChange={e => setForm({ ...form, year: parseInt(e.target.value) })} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Client Testimonial</label>
                                <textarea className="form-input" rows={2} value={form.testimonial} onChange={e => setForm({ ...form, testimonial: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Tools Used</label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                    {TOOLS.map(tool => (
                                        <button key={tool} type="button" onClick={() => toggleTool(tool)}
                                            className={`btn btn-sm ${form.tools.includes(tool) ? 'btn-primary' : 'btn-secondary'}`}
                                        >{tool}</button>
                                    ))}
                                </div>
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                                    <label className="toggle-switch">
                                        <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} />
                                        <span className="toggle-slider"></span>
                                    </label>
                                    <span className="form-label" style={{ margin: 0 }}>Featured Project</span>
                                </label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                            <button type="submit" className="btn btn-primary">{editItem ? 'Update Project' : 'Create Project'}</button>
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
                            <h3>Delete Project?</h3>
                            <p>This action cannot be undone. The project will be permanently removed.</p>
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
