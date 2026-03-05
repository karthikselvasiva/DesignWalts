/* ============================================
   DesignWalts Admin - LocalStorage Data Service
   ============================================ */

const STORAGE_PREFIX = 'dw_admin_';

// --- Seed / Demo Data ---
const DEMO_DATA = {
    portfolio: [
        {
            id: 'proj_001',
            title: 'Modern E-Commerce Platform',
            category: 'web-design',
            description: 'A sleek, responsive e-commerce website with intuitive UX, advanced filtering, and seamless checkout experience.',
            images: [],
            client: 'Tech Store',
            testimonial: 'Excellent work! The site looks amazing and converts well.',
            tools: ['Figma', 'React', 'Node.js'],
            year: 2024,
            featured: true,
            createdAt: '2024-01-15T10:00:00Z',
            updatedAt: '2024-01-15T10:00:00Z',
        },
        {
            id: 'proj_002',
            title: 'Premium Brand Identity',
            category: 'branding',
            description: 'Complete brand identity package including logo, color palette, typography, and brand guidelines.',
            images: [],
            client: 'Luxe Living',
            testimonial: 'They captured our vision perfectly.',
            tools: ['Adobe Illustrator', 'Photoshop'],
            year: 2024,
            featured: true,
            createdAt: '2024-02-10T10:00:00Z',
            updatedAt: '2024-02-10T10:00:00Z',
        },
        {
            id: 'proj_003',
            title: 'Social Media Campaign',
            category: 'social-media',
            description: 'Eye-catching social media graphics for a product launch campaign across Instagram and Facebook.',
            images: [],
            client: 'FreshBite Foods',
            testimonial: 'Our engagement increased by 300%!',
            tools: ['Canva', 'Photoshop'],
            year: 2024,
            featured: false,
            createdAt: '2024-03-05T10:00:00Z',
            updatedAt: '2024-03-05T10:00:00Z',
        },
        {
            id: 'proj_004',
            title: 'Corporate Logo Redesign',
            category: 'logo-design',
            description: 'Modern logo redesign for an established consulting firm, balancing tradition with contemporary aesthetics.',
            images: [],
            client: 'Apex Consulting',
            testimonial: 'The new logo perfectly represents our evolution.',
            tools: ['Adobe Illustrator', 'Figma'],
            year: 2023,
            featured: true,
            createdAt: '2023-11-20T10:00:00Z',
            updatedAt: '2023-11-20T10:00:00Z',
        },
        {
            id: 'proj_005',
            title: 'Restaurant Menu Design',
            category: 'poster-design',
            description: 'Elegant menu design for a fine dining restaurant, featuring food photography integration and premium typography.',
            images: [],
            client: 'Spice Garden',
            testimonial: 'Our customers love the new menu design!',
            tools: ['InDesign', 'Photoshop'],
            year: 2024,
            featured: false,
            createdAt: '2024-04-12T10:00:00Z',
            updatedAt: '2024-04-12T10:00:00Z',
        },
    ],
    testimonials: [
        {
            id: 'test_001',
            name: 'John Smith',
            company: 'Tech Startup',
            role: 'CEO',
            quote: 'Professional, creative, and highly responsive. The designs exceeded our expectations. DesignWalts is our go-to design partner.',
            rating: 5,
            photo: '',
            featured: true,
            approvalStatus: 'approved',
            createdAt: '2024-01-10T10:00:00Z',
        },
        {
            id: 'test_002',
            name: 'Sarah Johnson',
            company: 'E-Commerce Co.',
            role: 'Marketing Director',
            quote: 'DesignWalts delivered our brand identity perfectly. The entire process was smooth and collaborative. Highly recommended!',
            rating: 5,
            photo: '',
            featured: true,
            approvalStatus: 'approved',
            createdAt: '2024-01-15T10:00:00Z',
        },
        {
            id: 'test_003',
            name: 'Rajesh Patel',
            company: 'Consulting Firm',
            role: 'Founder',
            quote: 'Fast delivery and premium quality. Will definitely work again. Their attention to detail is remarkable.',
            rating: 5,
            photo: '',
            featured: true,
            approvalStatus: 'approved',
            createdAt: '2024-02-01T10:00:00Z',
        },
        {
            id: 'test_004',
            name: 'Priya Sharma',
            company: 'Fashion Boutique',
            role: 'Business Owner',
            quote: 'They understood our vision immediately and brought it to life with stunning designs. Excellent work!',
            rating: 4,
            photo: '',
            featured: false,
            approvalStatus: 'pending',
            createdAt: '2024-03-10T10:00:00Z',
        },
    ],
    services: [
        { id: 'serv_001', name: 'Web Designing', description: 'Professional, responsive, conversion-focused websites designed to showcase your brand and drive real business results.', icon: '🌐', category: 'digital', features: ['Responsive Design', 'SEO Optimized', 'Fast Loading', 'Custom CMS'], pricing: { starter: 5000, professional: 15000, premium: 30000 }, featured: true, order: 1 },
        { id: 'serv_002', name: 'Logo Design', description: 'Unique and memorable logos that define your brand identity and leave a lasting impression on your audience.', icon: '✦', category: 'branding', features: ['Multiple Concepts', 'Unlimited Revisions', 'All File Formats', 'Brand Guidelines'], pricing: { starter: 3000, professional: 8000, premium: 15000 }, featured: true, order: 2 },
        { id: 'serv_003', name: 'Poster Designing', description: 'Creative marketing posters for events, campaigns, and promotions that capture attention and communicate clearly.', icon: '🎨', category: 'print', features: ['Print Ready', 'Digital Versions', 'Multiple Sizes'], pricing: { starter: 2000, professional: 5000, premium: 10000 }, featured: true, order: 3 },
        { id: 'serv_004', name: 'Visiting Card Design', description: 'Modern, elegant business card designs that make lasting first impressions.', icon: '💳', category: 'print', features: ['Double Sided', 'Print Ready', 'Premium Finish Options'], pricing: { starter: 1500, professional: 3000, premium: 5000 }, featured: true, order: 4 },
        { id: 'serv_005', name: 'Social Media Creatives', description: 'Eye-catching social media graphics, banners, and campaign visuals designed to boost engagement.', icon: '📱', category: 'digital', features: ['All Platform Sizes', 'Brand Consistent', 'Engagement Focused'], pricing: { starter: 2500, professional: 6000, premium: 12000 }, featured: true, order: 5 },
    ],
    team: [
        { id: 'team_001', name: 'Karthik S', role: 'Creative Director & Founder', bio: 'Passionate designer with 5+ years of experience in brand identity, web design, and creative direction. Leads the DesignWalts vision.', photo: '', specialties: ['Brand Strategy', 'Web Design', 'Creative Direction'], social: { linkedin: '', twitter: '', instagram: '' }, featured: true, order: 1 },
        { id: 'team_002', name: 'Priya M', role: 'Senior UI/UX Designer', bio: 'Specializes in user experience design and creating intuitive, beautiful interfaces that users love.', photo: '', specialties: ['UI/UX Design', 'Prototyping', 'User Research'], social: { linkedin: '', twitter: '', instagram: '' }, featured: true, order: 2 },
    ],
    contacts: [
        { id: 'form_001', name: 'Amit Kumar', business: 'TechVenture', email: 'amit@techventure.com', phone: '9876543210', service: 'web-design', budget: '25-50k', message: 'Looking for a complete website redesign for our SaaS platform. Need modern UI with dashboard.', status: 'new', notes: '', submittedAt: '2024-03-01T14:30:00Z', respondedAt: null },
        { id: 'form_002', name: 'Sneha Reddy', business: 'Bloom Boutique', email: 'sneha@bloom.in', phone: '8765432109', service: 'branding', budget: '10-25k', message: 'Need complete branding for our new fashion boutique - logo, business cards, packaging, and social media templates.', status: 'contacted', notes: 'Sent proposal on March 3rd. Awaiting response.', submittedAt: '2024-02-28T09:15:00Z', respondedAt: '2024-03-03T11:00:00Z' },
        { id: 'form_003', name: 'David Lee', business: 'FoodieApp', email: 'david@foodieapp.co', phone: '', service: 'logo-design', budget: '5-10k', message: 'Need a modern, playful logo for our food delivery app. Think vibrant colors and friendly vibes.', status: 'completed', notes: 'Delivered final logo files. Client is happy!', submittedAt: '2024-02-15T16:45:00Z', respondedAt: '2024-02-16T10:00:00Z' },
        { id: 'form_004', name: 'Meera Nair', business: '', email: 'meera.n@gmail.com', phone: '7654321098', service: 'social-media', budget: '5-10k', message: 'Need social media posts for my bakery business for the next 3 months.', status: 'new', notes: '', submittedAt: '2024-03-04T08:20:00Z', respondedAt: null },
    ],
    settings: {
        siteName: 'DesignWalts',
        tagline: 'Premium Digital Design Studio',
        description: 'DesignWalts delivers premium web design, logo design, and branding solutions.',
        email: 'designwalts@gmail.com',
        phone: '+91 8124393132',
        address: 'Chennai, Tamil Nadu, India',
        logo: '',
        favicon: '',
        socialLinks: { facebook: 'https://facebook.com/designwalts', instagram: 'https://instagram.com/designwalts', linkedin: 'https://linkedin.com/company/designwalts', twitter: '' },
        seo: { homeTitle: 'Premium Digital Design Agency | DesignWalts', homeDescription: 'DesignWalts delivers premium web design, logo design, and branding solutions. Trusted by 50+ brands.', googleAnalyticsId: '' },
    },
    users: [
        { id: 'user_001', email: 'admin@designwalts.com', name: 'Admin', role: 'admin', lastLogin: new Date().toISOString() },
    ],
};

// Initialize localStorage with demo data if empty
function initializeData() {
    Object.keys(DEMO_DATA).forEach((key) => {
        const storageKey = STORAGE_PREFIX + key;
        if (!localStorage.getItem(storageKey)) {
            localStorage.setItem(storageKey, JSON.stringify(DEMO_DATA[key]));
        }
    });
}

// Generic CRUD helpers
function getCollection(name) {
    initializeData();
    const data = localStorage.getItem(STORAGE_PREFIX + name);
    return data ? JSON.parse(data) : [];
}

function setCollection(name, data) {
    localStorage.setItem(STORAGE_PREFIX + name, JSON.stringify(data));
}

function getDocument(name) {
    initializeData();
    const data = localStorage.getItem(STORAGE_PREFIX + name);
    return data ? JSON.parse(data) : {};
}

function setDocument(name, data) {
    localStorage.setItem(STORAGE_PREFIX + name, JSON.stringify(data));
}

function generateId(prefix = 'item') {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
}

// --- Portfolio ---
export const portfolioService = {
    getAll: () => getCollection('portfolio'),
    getById: (id) => getCollection('portfolio').find((p) => p.id === id),
    create: (data) => {
        const items = getCollection('portfolio');
        const newItem = { ...data, id: generateId('proj'), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
        items.unshift(newItem);
        setCollection('portfolio', items);
        return newItem;
    },
    update: (id, data) => {
        const items = getCollection('portfolio');
        const idx = items.findIndex((p) => p.id === id);
        if (idx === -1) return null;
        items[idx] = { ...items[idx], ...data, updatedAt: new Date().toISOString() };
        setCollection('portfolio', items);
        return items[idx];
    },
    delete: (id) => {
        const items = getCollection('portfolio').filter((p) => p.id !== id);
        setCollection('portfolio', items);
    },
};

// --- Testimonials ---
export const testimonialsService = {
    getAll: () => getCollection('testimonials'),
    getById: (id) => getCollection('testimonials').find((t) => t.id === id),
    create: (data) => {
        const items = getCollection('testimonials');
        const newItem = { ...data, id: generateId('test'), createdAt: new Date().toISOString(), approvalStatus: data.approvalStatus || 'pending' };
        items.unshift(newItem);
        setCollection('testimonials', items);
        return newItem;
    },
    update: (id, data) => {
        const items = getCollection('testimonials');
        const idx = items.findIndex((t) => t.id === id);
        if (idx === -1) return null;
        items[idx] = { ...items[idx], ...data };
        setCollection('testimonials', items);
        return items[idx];
    },
    delete: (id) => {
        const items = getCollection('testimonials').filter((t) => t.id !== id);
        setCollection('testimonials', items);
    },
};

// --- Services ---
export const servicesService = {
    getAll: () => getCollection('services').sort((a, b) => a.order - b.order),
    getById: (id) => getCollection('services').find((s) => s.id === id),
    create: (data) => {
        const items = getCollection('services');
        const newItem = { ...data, id: generateId('serv'), order: items.length + 1 };
        items.push(newItem);
        setCollection('services', items);
        return newItem;
    },
    update: (id, data) => {
        const items = getCollection('services');
        const idx = items.findIndex((s) => s.id === id);
        if (idx === -1) return null;
        items[idx] = { ...items[idx], ...data };
        setCollection('services', items);
        return items[idx];
    },
    delete: (id) => {
        const items = getCollection('services').filter((s) => s.id !== id);
        setCollection('services', items);
    },
};

// --- Team ---
export const teamService = {
    getAll: () => getCollection('team').sort((a, b) => a.order - b.order),
    getById: (id) => getCollection('team').find((t) => t.id === id),
    create: (data) => {
        const items = getCollection('team');
        const newItem = { ...data, id: generateId('team'), order: items.length + 1 };
        items.push(newItem);
        setCollection('team', items);
        return newItem;
    },
    update: (id, data) => {
        const items = getCollection('team');
        const idx = items.findIndex((t) => t.id === id);
        if (idx === -1) return null;
        items[idx] = { ...items[idx], ...data };
        setCollection('team', items);
        return items[idx];
    },
    delete: (id) => {
        const items = getCollection('team').filter((t) => t.id !== id);
        setCollection('team', items);
    },
};

// --- Contacts ---
export const contactsService = {
    getAll: () => getCollection('contacts'),
    getById: (id) => getCollection('contacts').find((c) => c.id === id),
    update: (id, data) => {
        const items = getCollection('contacts');
        const idx = items.findIndex((c) => c.id === id);
        if (idx === -1) return null;
        items[idx] = { ...items[idx], ...data };
        setCollection('contacts', items);
        return items[idx];
    },
    delete: (id) => {
        const items = getCollection('contacts').filter((c) => c.id !== id);
        setCollection('contacts', items);
    },
};

// --- Settings ---
export const settingsService = {
    get: () => getDocument('settings'),
    update: (data) => {
        const current = getDocument('settings');
        const updated = { ...current, ...data };
        setDocument('settings', updated);
        return updated;
    },
};

// --- Analytics (Mock) ---
export const analyticsService = {
    getDashboardStats: () => {
        const portfolio = getCollection('portfolio');
        const testimonials = getCollection('testimonials');
        const contacts = getCollection('contacts');
        const newContacts = contacts.filter((c) => c.status === 'new');
        return {
            totalProjects: portfolio.length,
            totalTestimonials: testimonials.length,
            totalSubmissions: contacts.length,
            newSubmissions: newContacts.length,
            monthlyVisitors: 2450,
            pageLoadTime: '0.8s',
        };
    },
    getMonthlyData: () => [
        { month: 'Sep', submissions: 3, visitors: 1800 },
        { month: 'Oct', submissions: 5, visitors: 2100 },
        { month: 'Nov', submissions: 4, visitors: 1950 },
        { month: 'Dec', submissions: 6, visitors: 2300 },
        { month: 'Jan', submissions: 7, visitors: 2600 },
        { month: 'Feb', submissions: 8, visitors: 2450 },
    ],
    getCategoryData: () => [
        { name: 'Web Design', value: 35 },
        { name: 'Logo Design', value: 25 },
        { name: 'Branding', value: 20 },
        { name: 'Social Media', value: 12 },
        { name: 'Print Design', value: 8 },
    ],
    getRatingData: () => [
        { rating: '5 Stars', count: 12 },
        { rating: '4 Stars', count: 5 },
        { rating: '3 Stars', count: 2 },
        { rating: '2 Stars', count: 0 },
        { rating: '1 Star', count: 0 },
    ],
};

// --- Auth (Mock) ---
export const authService = {
    login: (email, password) => {
        // Demo login: any email with password "admin123" works
        if (password === 'admin123') {
            const user = { id: 'user_001', email, name: email.split('@')[0], role: 'admin' };
            localStorage.setItem(STORAGE_PREFIX + 'currentUser', JSON.stringify(user));
            return { success: true, user };
        }
        return { success: false, error: 'Invalid email or password' };
    },
    logout: () => {
        localStorage.removeItem(STORAGE_PREFIX + 'currentUser');
    },
    getCurrentUser: () => {
        const data = localStorage.getItem(STORAGE_PREFIX + 'currentUser');
        return data ? JSON.parse(data) : null;
    },
};

export { initializeData };
