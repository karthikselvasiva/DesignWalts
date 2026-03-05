import { useState, useEffect } from 'react';
import { settingsService } from '../services/dataService';
import { Save, Globe, Mail, Phone, MapPin, Share2, Search as SearchIcon } from 'lucide-react';

export default function Settings() {
    const [settings, setSettings] = useState(null);
    const [toast, setToast] = useState(null);
    const [activeTab, setActiveTab] = useState('general');

    useEffect(() => {
        setSettings(settingsService.get());
    }, []);

    if (!settings) return null;

    const handleSave = () => {
        settingsService.update(settings);
        showToast('Settings saved successfully!');
    };

    const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

    const updateField = (field, value) => setSettings({ ...settings, [field]: value });
    const updateSocial = (field, value) => setSettings({ ...settings, socialLinks: { ...settings.socialLinks, [field]: value } });
    const updateSeo = (field, value) => setSettings({ ...settings, seo: { ...settings.seo, [field]: value } });

    return (
        <div>
            {toast && <div className="toast-container"><div className="toast success">✓ {toast}</div></div>}

            <div className="tabs">
                {[
                    { id: 'general', label: 'General', icon: Globe },
                    { id: 'social', label: 'Social Links', icon: Share2 },
                    { id: 'seo', label: 'SEO', icon: SearchIcon },
                ].map(tab => (
                    <button key={tab.id} className={`tab ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
                        <tab.icon size={14} style={{ marginRight: 6, display: 'inline' }} />
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="card">
                {/* General Settings */}
                {activeTab === 'general' && (
                    <div>
                        <div className="settings-section">
                            <h3>General Information</h3>
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Site Name</label>
                                    <input className="form-input" value={settings.siteName || ''} onChange={e => updateField('siteName', e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Tagline</label>
                                    <input className="form-input" value={settings.tagline || ''} onChange={e => updateField('tagline', e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Site Description</label>
                                <textarea className="form-input" rows={3} value={settings.description || ''} onChange={e => updateField('description', e.target.value)} />
                            </div>
                        </div>

                        <div className="settings-section">
                            <h3>Contact Information</h3>
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label"><Mail size={14} style={{ display: 'inline', marginRight: 4 }} /> Email Address</label>
                                    <input type="email" className="form-input" value={settings.email || ''} onChange={e => updateField('email', e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label"><Phone size={14} style={{ display: 'inline', marginRight: 4 }} /> Phone Number</label>
                                    <input className="form-input" value={settings.phone || ''} onChange={e => updateField('phone', e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label"><MapPin size={14} style={{ display: 'inline', marginRight: 4 }} /> Office Address</label>
                                <input className="form-input" value={settings.address || ''} onChange={e => updateField('address', e.target.value)} />
                            </div>
                        </div>
                    </div>
                )}

                {/* Social Links */}
                {activeTab === 'social' && (
                    <div className="settings-section">
                        <h3>Social Media Links</h3>
                        <div className="form-group">
                            <label className="form-label">Facebook URL</label>
                            <input className="form-input" placeholder="https://facebook.com/..." value={settings.socialLinks?.facebook || ''} onChange={e => updateSocial('facebook', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Instagram URL</label>
                            <input className="form-input" placeholder="https://instagram.com/..." value={settings.socialLinks?.instagram || ''} onChange={e => updateSocial('instagram', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">LinkedIn URL</label>
                            <input className="form-input" placeholder="https://linkedin.com/company/..." value={settings.socialLinks?.linkedin || ''} onChange={e => updateSocial('linkedin', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Twitter / X URL</label>
                            <input className="form-input" placeholder="https://x.com/..." value={settings.socialLinks?.twitter || ''} onChange={e => updateSocial('twitter', e.target.value)} />
                        </div>
                    </div>
                )}

                {/* SEO Settings */}
                {activeTab === 'seo' && (
                    <div className="settings-section">
                        <h3>SEO Configuration</h3>
                        <div className="form-group">
                            <label className="form-label">Home Page Title</label>
                            <input className="form-input" value={settings.seo?.homeTitle || ''} onChange={e => updateSeo('homeTitle', e.target.value)} />
                            <div className="form-hint">Recommended: under 60 characters</div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Home Page Meta Description</label>
                            <textarea className="form-input" rows={3} value={settings.seo?.homeDescription || ''} onChange={e => updateSeo('homeDescription', e.target.value)} />
                            <div className="form-hint">Recommended: under 160 characters</div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Google Analytics Measurement ID</label>
                            <input className="form-input" placeholder="G-XXXXXXXXXX" value={settings.seo?.googleAnalyticsId || ''} onChange={e => updateSeo('googleAnalyticsId', e.target.value)} />
                            <div className="form-hint">Your Google Analytics 4 measurement ID</div>
                        </div>
                    </div>
                )}

                {/* Save Button */}
                <div style={{ paddingTop: 16, borderTop: '1px solid var(--clr-border)', marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
                    <button className="btn btn-primary btn-lg" onClick={handleSave}>
                        <Save size={18} /> Save Settings
                    </button>
                </div>
            </div>
        </div>
    );
}
