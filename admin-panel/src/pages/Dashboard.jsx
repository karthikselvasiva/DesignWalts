import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyticsService, contactsService, portfolioService, testimonialsService } from '../services/dataService';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Briefcase, MessageSquareQuote, Mail, Eye, Clock, Plus, ArrowUpRight, Users } from 'lucide-react';

const COLORS = ['#1864B2', '#3BD3E7', '#10b981', '#f59e0b', '#8b5cf6'];

export default function Dashboard() {
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [monthlyData, setMonthlyData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [ratingData, setRatingData] = useState([]);

    useEffect(() => {
        setStats(analyticsService.getDashboardStats());
        setMonthlyData(analyticsService.getMonthlyData());
        setCategoryData(analyticsService.getCategoryData());
        setRatingData(analyticsService.getRatingData());
    }, []);

    if (!stats) return null;

    const recentContacts = contactsService.getAll().slice(0, 4);

    const statCards = [
        { label: 'Total Projects', value: stats.totalProjects, icon: Briefcase, color: 'blue', change: '+3 this month' },
        { label: 'Testimonials', value: stats.totalTestimonials, icon: MessageSquareQuote, color: 'green', change: '+2 pending' },
        { label: 'New Inquiries', value: stats.newSubmissions, icon: Mail, color: 'orange', change: `${stats.totalSubmissions} total` },
        { label: 'Monthly Visitors', value: stats.monthlyVisitors.toLocaleString(), icon: Eye, color: 'purple', change: '+12% vs last month' },
    ];

    return (
        <div>
            {/* Stat Cards */}
            <div className="stats-grid">
                {statCards.map((card, i) => (
                    <div key={i} className={`stat-card ${card.color}`}>
                        <div className="stat-card-top">
                            <span className="stat-card-label">{card.label}</span>
                            <div className="stat-card-icon">
                                <card.icon size={20} />
                            </div>
                        </div>
                        <div className="stat-card-value">{card.value}</div>
                        <div className="stat-card-change positive">
                            <ArrowUpRight size={14} />
                            {card.change}
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div className="charts-grid">
                <div className="chart-card">
                    <h3>Monthly Submissions & Visitors</h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <LineChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey="month" fontSize={12} stroke="#94a3b8" />
                            <YAxis fontSize={12} stroke="#94a3b8" />
                            <Tooltip
                                contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }}
                            />
                            <Line type="monotone" dataKey="submissions" stroke="#1864B2" strokeWidth={2.5} dot={{ r: 4, fill: '#1864B2' }} name="Submissions" />
                            <Line type="monotone" dataKey="visitors" stroke="#3BD3E7" strokeWidth={2.5} dot={{ r: 4, fill: '#3BD3E7' }} name="Visitors" yAxisId={0} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-card">
                    <h3>Portfolio by Category</h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                            <Pie data={categoryData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value">
                                {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                            </Pie>
                            <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
                        {categoryData.map((item, i) => (
                            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', color: '#64748b' }}>
                                <span style={{ width: 8, height: 8, borderRadius: 2, background: COLORS[i % COLORS.length] }}></span>
                                {item.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="charts-grid">
                {/* Recent Activity */}
                <div className="chart-card">
                    <div className="card-header">
                        <h3>Recent Inquiries</h3>
                        <button className="btn btn-sm btn-secondary" onClick={() => navigate('/contacts')}>View All</button>
                    </div>
                    <div className="activity-list">
                        {recentContacts.map(contact => (
                            <div key={contact.id} className="activity-item">
                                <div className={`activity-icon ${contact.status === 'new' ? 'blue' : contact.status === 'contacted' ? 'orange' : 'green'}`}>
                                    <Mail size={16} />
                                </div>
                                <div className="activity-content">
                                    <div className="activity-text">
                                        <strong>{contact.name}</strong> — {contact.service?.replace('-', ' ')}
                                    </div>
                                    <div className="activity-time">
                                        <span className={`badge badge-${contact.status === 'new' ? 'info' : contact.status === 'contacted' ? 'warning' : 'success'}`} style={{ marginRight: 6 }}>
                                            {contact.status}
                                        </span>
                                        {new Date(contact.submittedAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="chart-card">
                    <h3 style={{ marginBottom: 16 }}>Quick Actions</h3>
                    <div className="quick-actions">
                        <button className="quick-action-btn" onClick={() => navigate('/portfolio')}>
                            <Plus size={18} /> Add Project
                        </button>
                        <button className="quick-action-btn" onClick={() => navigate('/testimonials')}>
                            <Plus size={18} /> Add Testimonial
                        </button>
                        <button className="quick-action-btn" onClick={() => navigate('/contacts')}>
                            <Mail size={18} /> View Inquiries
                        </button>
                        <button className="quick-action-btn" onClick={() => navigate('/settings')}>
                            <Users size={18} /> Site Settings
                        </button>
                    </div>

                    <div style={{ marginTop: 24 }}>
                        <h3 style={{ marginBottom: 12 }}>Rating Distribution</h3>
                        <ResponsiveContainer width="100%" height={140}>
                            <BarChart data={ratingData} layout="vertical">
                                <XAxis type="number" fontSize={11} stroke="#94a3b8" />
                                <YAxis dataKey="rating" type="category" fontSize={11} stroke="#94a3b8" width={60} />
                                <Bar dataKey="count" fill="#1864B2" radius={[0, 4, 4, 0]} barSize={16} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
