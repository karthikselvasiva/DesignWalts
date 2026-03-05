import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu, Bell, Search } from 'lucide-react';

const pageTitles = {
    '/': { title: 'Dashboard', subtitle: 'Welcome back! Here\'s your overview.' },
    '/portfolio': { title: 'Portfolio', subtitle: 'Manage your projects and case studies.' },
    '/testimonials': { title: 'Testimonials', subtitle: 'Manage client reviews and feedback.' },
    '/services': { title: 'Services', subtitle: 'Manage your service offerings.' },
    '/team': { title: 'Team', subtitle: 'Manage team members and profiles.' },
    '/contacts': { title: 'Submissions', subtitle: 'View and manage contact form inquiries.' },
    '/settings': { title: 'Settings', subtitle: 'Configure your website settings.' },
};

export default function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const pageInfo = pageTitles[location.pathname] || { title: 'Admin', subtitle: '' };

    return (
        <div className="app-layout">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <main className="main-content">
                <header className="topbar">
                    <div className="topbar-left">
                        <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)}>
                            <Menu size={22} />
                        </button>
                        <div className="topbar-title">
                            <h2>{pageInfo.title}</h2>
                            <div className="topbar-subtitle">{pageInfo.subtitle}</div>
                        </div>
                    </div>
                    <div className="topbar-right">
                        <button className="topbar-btn">
                            <Search size={18} />
                        </button>
                        <button className="topbar-btn">
                            <Bell size={18} />
                            <span className="notification-dot"></span>
                        </button>
                    </div>
                </header>
                <div className="page-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
