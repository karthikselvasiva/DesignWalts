import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import Testimonials from './pages/Testimonials';
import Services from './pages/Services';
import Team from './pages/Team';
import ContactSubmissions from './pages/ContactSubmissions';
import Settings from './pages/Settings';
import './styles/globals.css';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="testimonials" element={<Testimonials />} />
            <Route path="services" element={<Services />} />
            <Route path="team" element={<Team />} />
            <Route path="contacts" element={<ContactSubmissions />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
