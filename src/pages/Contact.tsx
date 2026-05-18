import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, CheckCircle, Send } from 'lucide-react';
import { supabaseService } from '../lib/supabaseService';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+233');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('General Sourcing');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !message) {
      alert('Please complete all identification and inquiry fields.');
      return;
    }
    setLoading(true);
    try {
      const fullPhone = `${countryCode} ${phone}`;
      await supabaseService.createInquiry({
        name,
        email,
        phone: fullPhone,
        inquiryType,
        message
      });
      setSubmitted(true);
    } catch (err) {
      alert('Failed to transmit message protocol.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-brand-black min-h-screen px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="space-y-12">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-display font-medium text-brand-white leading-tight">
              Connect with <br /><span className="gold-gradient">The Hub</span>
            </h1>
            <p className="text-brand-silver/60 text-lg">
              Our team of luxury automotive experts is available 24/7 to assist with your custom sourcing and global acquisition requirements.
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-brand-white/30 font-bold">Email Protocol</p>
                <p className="text-brand-white">tripleexceed@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-brand-white/30 font-bold">Secure Line</p>
                <p className="text-brand-white">+233 243 145 384</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-brand-white/30 font-bold">Global Hub</p>
                <p className="text-brand-white">Tema Community 25, Accra. Ghana</p>
              </div>
            </div>
          </div>
        </div>

        {submitted ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="luxury-glass p-12 text-center space-y-6 flex flex-col items-center justify-center border border-brand-gold/30"
          >
            <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-3xl font-display font-medium text-brand-white">Protocol Transmitted</h3>
            <p className="text-xs text-brand-silver/80 max-w-md uppercase tracking-widest leading-relaxed">
              Your inquiry has been successfully logged directly into our administrative command core. A senior procurement specialist will contact you via your secure line shortly.
            </p>
            <button 
              onClick={() => {
                setSubmitted(false);
                setName('');
                setEmail('');
                setPhone('');
                setMessage('');
              }}
              className="mt-6 border border-brand-gold/30 hover:border-brand-gold py-3 px-8 text-xs text-brand-gold uppercase tracking-widest font-bold transition-all"
            >
              Submit Another Inquiry
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="luxury-glass p-10 space-y-6 relative border border-brand-white/10">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Identity (Full Name)</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-brand-white/5 border border-brand-white/10 py-4 px-4 text-xs font-medium focus:outline-none focus:border-brand-gold/50 text-brand-white placeholder:text-brand-white/20" 
                placeholder="Lord Osei Danquah" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Email Account</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-brand-white/5 border border-brand-white/10 py-4 px-4 text-xs font-mono focus:outline-none focus:border-brand-gold/50 text-brand-white placeholder:text-brand-white/20" 
                placeholder="identity@danquahgroup.com" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Phone Number (With Country Code)</label>
              <div className="flex gap-3">
                <select 
                  value={countryCode} 
                  onChange={e => setCountryCode(e.target.value)}
                  className="w-28 bg-[#151515] border border-brand-white/10 py-4 px-3 text-xs font-mono focus:outline-none focus:border-brand-gold/50 text-brand-gold font-bold"
                >
                  <option value="+233">+233 (GH)</option>
                  <option value="+1">+1 (US/CA)</option>
                  <option value="+44">+44 (UK)</option>
                  <option value="+49">+49 (DE)</option>
                  <option value="+971">+971 (UAE)</option>
                  <option value="+234">+234 (NG)</option>
                  <option value="+27">+27 (ZA)</option>
                </select>
                <input 
                  type="tel" 
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="flex-1 bg-brand-white/5 border border-brand-white/10 py-4 px-4 text-xs font-mono focus:outline-none focus:border-brand-gold/50 text-brand-white placeholder:text-brand-white/20" 
                  placeholder="24 458 1923" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Inquiry Classification</label>
              <select 
                value={inquiryType}
                onChange={e => setInquiryType(e.target.value)}
                className="w-full bg-[#151515] border border-brand-white/10 py-4 px-4 text-xs tracking-widest uppercase focus:outline-none focus:border-brand-gold/50 text-brand-white"
              >
                <option value="General Sourcing">General Sourcing</option>
                <option value="Logistics Inquiry">Logistics Inquiry</option>
                <option value="VIP Fleet Consultation">VIP Fleet Consultation</option>
                <option value="Armored & Bespoke Builds">Armored & Bespoke Builds</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Message Specification</label>
              <textarea 
                rows={5} 
                required
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="w-full bg-brand-white/5 border border-brand-white/10 py-4 px-4 text-xs font-medium focus:outline-none focus:border-brand-gold/50 text-brand-white placeholder:text-brand-white/20" 
                placeholder="Specify precise make, model year, or bespoke delivery preferences..."
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full btn-premium-filled py-4 flex items-center justify-center gap-3 font-bold text-xs uppercase tracking-widest"
            >
              <Send size={16} />
              {loading ? 'Transmitting...' : 'Transmit Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
