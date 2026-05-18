import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import VehicleDetail from './pages/VehicleDetail';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminInventory from './pages/admin/Inventory';
import Legal from './pages/Legal';
import About from './pages/About';
import HowItWorks from './pages/HowItWorks';
import Services from './pages/Services';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Track from './pages/Track';
import NetworkStatus from './components/common/NetworkStatus';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="relative min-h-screen">
          <NetworkStatus />
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/services" element={<Services />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/track" element={<Track />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/vehicle/:id" element={<VehicleDetail />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/client/login" element={<Login />} />
              <Route path="/admin/login" element={<Login />} />
              <Route path="/client/signup" element={<Signup />} />
              <Route path="/admin/inventory" element={<AdminInventory />} />
              <Route path="/privacy" element={<Legal />} />
              <Route path="/terms" element={<Legal />} />
              <Route path="/cookies" element={<Legal />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}
