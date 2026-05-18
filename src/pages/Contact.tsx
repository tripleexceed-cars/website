import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-32 pb-24 bg-brand-black min-h-screen px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="space-y-12">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-display font-medium text-brand-white leading-tight">Connect with <br /><span className="gold-gradient">The Hub</span></h1>
            <p className="text-brand-silver/60 text-lg">Our team of logistics experts is available 24/7 to assist with your global acquisition requirements.</p>
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

        <form className="luxury-glass p-10 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Identity</label>
            <input type="text" className="w-full bg-brand-white/5 border border-brand-white/5 py-4 px-4 text-xs tracking-widest uppercase focus:outline-none focus:border-brand-gold/50 text-brand-white" placeholder="Name" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Inquiry Type</label>
            <select className="w-full bg-brand-white/5 border border-brand-white/5 py-4 px-4 text-xs tracking-widest uppercase focus:outline-none focus:border-brand-gold/50 text-brand-white">
              <option>General Sourcing</option>
              <option>Logistics Inquiry</option>
              <option>VIP Fleet Consultation</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Message</label>
            <textarea rows={6} className="w-full bg-brand-white/5 border border-brand-white/5 py-4 px-4 text-xs tracking-widest uppercase focus:outline-none focus:border-brand-gold/50 text-brand-white" placeholder="How can we assist?"></textarea>
          </div>
          <button className="w-full btn-premium-filled py-4">Transmit Message</button>
        </form>
      </div>
    </div>
  );
}
