import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Phone, Mail, MapPin, Plus, MessageCircle } from 'lucide-react';
import { SITE_NAME, NAVIGATION } from '../../constants';

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    details: ''
  });

  const openServiceModal = (service: string) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleWhatsAppInquiry = (e: FormEvent) => {
    e.preventDefault();
    const message = `*Website Inquiry*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Service:* ${selectedService}%0A*Details:* ${formData.details}`;
    window.open(`https://wa.me/233243145384?text=${message}`, '_blank');
    setIsModalOpen(false);
  };

  return (
    <footer className="bg-brand-black border-t border-brand-white/10 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-gold rotate-45 flex items-center justify-center">
                <span className="-rotate-45 font-bold text-black text-xs tracking-tighter">TX</span>
              </div>
              <span className="text-2xl font-bold tracking-tighter uppercase text-brand-white">
                Triple <span className="text-brand-gold">Exceed</span>
              </span>
            </Link>
            <p className="text-brand-silver/60 text-sm leading-relaxed max-w-xs">
              Defining the pinnacle of luxury vehicle importation. A surgical approach to global sourcing and logistics.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 border border-brand-white/10 flex items-center justify-center text-brand-silver hover:border-brand-gold hover:text-brand-gold transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className="text-xs uppercase tracking-[0.4em] font-bold text-brand-gold">Discovery</h4>
            <ul className="space-y-4">
              {NAVIGATION.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="text-sm text-brand-silver/60 hover:text-brand-white transition-colors">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-8">
            <h4 className="text-xs uppercase tracking-[0.4em] font-bold text-brand-gold">Global Hub</h4>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <MapPin size={18} className="text-brand-gold mt-1" />
                <span className="text-sm text-brand-silver/60 leading-relaxed">Accra Digital Centre, GH<br />Ring Road West, Accra</span>
              </li>
              <li className="flex items-center space-x-4">
                <Phone size={18} className="text-brand-gold" />
                <span className="text-sm text-brand-silver/60">+233 243 145 384</span>
              </li>
              <li className="flex items-center space-x-4">
                <Mail size={18} className="text-brand-gold" />
                <span className="text-sm text-brand-silver/60">logistics@tripleexceed.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter/Action */}
          <div className="space-y-8">
            <h4 className="text-xs uppercase tracking-[0.4em] font-bold text-brand-gold">Elevate Your Fleet</h4>
            <button 
              onClick={() => openServiceModal('General Inquiry')}
              className="w-full btn-premium-filled"
            >
              Request Consultation
            </button>
            <p className="text-[10px] uppercase tracking-widest text-brand-silver/30 text-center">
              Available 24/7 for VIP Clients
            </p>
          </div>
        </div>

        {/* Legal */}
        <div className="pt-12 border-t border-brand-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-brand-silver/40 text-[10px] uppercase tracking-[0.2em]">
          <div className="flex space-x-8">
            <Link to="/privacy" className="hover:text-brand-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-brand-white transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-brand-white transition-colors">Cookie Policy</Link>
          </div>
          <p>© 2026 {SITE_NAME}. All Rights Reserved.</p>
        </div>
      </div>

      {/* Micro Footer Bar */}
      <div className="bg-black py-6 px-6 md:px-10 flex flex-col md:flex-row justify-between items-center border-t border-brand-white/5 gap-4 mt-12">
        <div className="text-[10px] text-brand-silver uppercase tracking-widest text-center md:text-left flex flex-col md:flex-row gap-2 md:gap-4">
          <span>Triple Exceed Automobile Ltd. | Accra, Ghana</span>
          <span className="hidden md:inline text-brand-white/10">|</span>
          <span className="text-brand-gold font-bold">Surgically Crafted by Zerivon Tech</span>
        </div>
        <div className="flex items-center gap-6">
          <a 
            href="https://wa.me/233243145384" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group relative flex items-center gap-3 bg-green-500/10 border border-green-500/20 px-4 py-2 hover:bg-green-500/20 transition-all"
          >
            <div className="relative">
              <MessageCircle size={18} className="text-green-500" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
            <span className="text-[10px] text-green-500 uppercase tracking-widest font-bold">Live Support</span>
          </a>
        </div>
      </div>

      {/* Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-brand-matte border border-brand-white/10 p-10 animate-fade-in">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-brand-silver hover:text-brand-white">
              <X size={20} />
            </button>
            <div className="space-y-2 mb-8">
              <span className="text-brand-gold uppercase tracking-[0.3em] text-[10px] font-bold">Consultation</span>
              <h3 className="text-3xl font-display font-medium text-brand-white">{selectedService}</h3>
            </div>
            <form className="space-y-6" onSubmit={handleWhatsAppInquiry}>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Full Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-brand-white/5 border border-brand-white/5 py-4 px-4 text-xs tracking-widest uppercase focus:outline-none focus:border-brand-gold/50 transition-all"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Email Address</label>
                <input 
                  type="email" 
                  required
                  className="w-full bg-brand-white/5 border border-brand-white/5 py-4 px-4 text-xs tracking-widest uppercase focus:outline-none focus:border-brand-gold/50 transition-all"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Additional Details</label>
                <textarea 
                  rows={4}
                  className="w-full bg-brand-white/5 border border-brand-white/5 py-4 px-4 text-xs tracking-widest uppercase focus:outline-none focus:border-brand-gold/50 transition-all"
                  placeholder="How can we assist you?"
                  value={formData.details}
                  onChange={(e) => setFormData({...formData, details: e.target.value})}
                />
              </div>
              <button type="submit" className="w-full btn-premium-filled py-4 flex items-center justify-center gap-3">
                <MessageCircle size={18} />
                Send Inquiry via WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}
    </footer>
  );
}

// Helper to avoid build error
function X({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}
