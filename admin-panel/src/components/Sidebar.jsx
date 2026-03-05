import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { contactsService } from '../services/dataService';
import {
    LayoutDashboard,
    Briefcase,
    MessageSquareQuote,
    Wrench,
    Users,
    Mail,
    Settings,
    LogOut,
    X,
} from 'lucide-react';

const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/portfolio', icon: Briefcase, label: 'Portfolio' },
    { to: '/testimonials', icon: MessageSquareQuote, label: 'Testimonials' },
    { to: '/services', icon: Wrench, label: 'Services' },
    { to: '/team', icon: Users, label: 'Team' },
    { to: '/contacts', icon: Mail, label: 'Submissions', badge: true },
    { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar({ isOpen, onClose }) {
    const { user, logout } = useAuth();
    const location = useLocation();

    const newContacts = contactsService.getAll().filter(c => c.status === 'new').length;

    return (
        <>
            <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={onClose} />
            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <div className="sidebar-logo">
                        Design<span>Walts</span>
                    </div>
                    <button className="modal-close" onClick={onClose} style={{ display: isOpen ? 'flex' : 'none', marginLeft: 'auto' }}>
                        <X size={18} />
                    </button>
                </div>

                <nav className="sidebar-nav">
                    <div className="sidebar-section">
                        <div className="sidebar-section-title">Main Menu</div>
                        {navItems.map(item => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end={item.to === '/'}
                                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                                onClick={onClose}
                            >
                                <item.icon size={20} />
                                <span>{item.label}</span>
                                {item.badge && newContacts > 0 && (
                                    <span className="badge">{newContacts}</span>
                                )}
                            </NavLink>
                        ))}
                    </div>
                </nav>

                <div className="sidebar-footer">
                    <div className="sidebar-user" onClick={logout}>
                        <div className="sidebar-avatar">
                            {user?.name?.charAt(0).toUpperCase() || 'A'}
                        </div>
                        <div className="sidebar-user-info">
                            <div className="sidebar-user-name">{user?.name || 'Admin'}</div>
                            <div className="sidebar-user-role">Administrator</div>
                        </div>
                        <LogOut size={16} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                    </div>
                </div>
            </aside>
        </>
    );
}
