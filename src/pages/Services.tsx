import { motion } from 'framer-motion';
import { Search, Globe, Shield, Anchor, Briefcase, Key, Star, Zap } from 'lucide-react';

export default function Services() {
  const services = [
    {
      title: 'Custom Vehicle Sourcing',
      desc: 'Access our exclusive global inventory. We locate rare luxury assets and performance vehicles that match your exact specifications.',
      icon: <Search size={24} />,
      tag: 'Global'
    },
    {
      title: 'Global Logistics Management',
      desc: 'Seamless door-to-port transportation using containerized shipping protocols and real-time satellite tracking.',
      icon: <Globe size={24} />,
      tag: 'Secure'
    },
    {
      title: 'Surgical Inspection',
      desc: 'A comprehensive 200-point technical and aesthetic verification performed by certified agents at the source.',
      icon: <Shield size={24} />,
      tag: 'Mandatory'
    },
    {
      title: 'Customs Clearing',
      desc: 'Expert navigation of Ghana port protocols. We handle all documentation and duty settlements for rapid clearance.',
      icon: <Anchor size={24} />,
      tag: 'Rapid'
    },
    {
      title: 'VIP Fleet Governance',
      desc: 'End-to-end management for corporate and private collections, including registration, licensing, and insurance.',
      icon: <Briefcase size={24} />,
      tag: 'Exclusive'
    },
    {
      title: 'Concierge Delivery',
      desc: 'Final detailing and white-glove delivery to your doorstep in Accra, Kumasi, or any location across Ghana.',
      icon: <Key size={24} />,
      tag: 'Premium'
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-brand-black min-h-screen relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="space-y-24">
          <div className="space-y-6 text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-4">
              <span className="w-12 h-[1px] bg-brand-gold" />
              <span className="text-brand-gold uppercase tracking-[0.4em] text-xs font-bold font-display">
                Service Portfolio
              </span>
              <span className="w-12 h-[1px] bg-brand-gold" />
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-medium">Elite Solutions</h1>
            <p className="text-brand-white/40 text-lg leading-relaxed">Defining the pinnacle of automotive logistics and acquisition for the West African elite.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="luxury-glass p-10 space-y-8 group hover:border-brand-gold/40 transition-all duration-500"
              >
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 bg-brand-gold/10 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-black transition-all duration-500">
                    {service.icon}
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-gold/40 border border-brand-gold/20 px-3 py-1">
                    {service.tag}
                  </span>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-display font-medium text-brand-white group-hover:text-brand-gold transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-brand-silver/60 text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </div>

                <div className="pt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Zap size={14} className="text-brand-gold" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Inquire for Protocol</span>
                </div>
              </motion.div>
            ))}
          </div>

          <section className="py-24 border-t border-brand-white/5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl font-display font-medium leading-tight">Tailored Acquisition <br />for Specialized Needs</h2>
                <p className="text-brand-white/40 text-lg">Beyond our standard portfolio, we offer bespoke sourcing for bulletproof vehicles, rare collectibles, and industrial fleet assets.</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-brand-gold/10 flex items-center justify-center text-brand-gold rounded-full"><Star size={16} /></div>
                    <span className="text-brand-white text-sm uppercase tracking-widest font-bold">Armored Vehicle Procurement</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-brand-gold/10 flex items-center justify-center text-brand-gold rounded-full"><Star size={16} /></div>
                    <span className="text-brand-white text-sm uppercase tracking-widest font-bold">Auction Representation (Manheim, Copart)</span>
                  </div>
                </div>
              </div>
              <div className="luxury-glass p-12 space-y-8 bg-brand-gold/5">
                <h3 className="text-2xl font-display font-medium uppercase tracking-widest">Global Hub Access</h3>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-brand-gold font-bold text-xs uppercase tracking-widest mb-2">USA Hub</p>
                    <p className="text-brand-white/40 text-xs">Houston, Texas</p>
                  </div>
                  <div>
                    <p className="text-brand-gold font-bold text-xs uppercase tracking-widest mb-2">China Hub</p>
                    <p className="text-brand-white/40 text-xs">Shenzhen, Guangdong</p>
                  </div>
                  <div>
                    <p className="text-brand-gold font-bold text-xs uppercase tracking-widest mb-2">UAE Hub</p>
                    <p className="text-brand-white/40 text-xs">Jebel Ali, Dubai</p>
                  </div>
                  <div>
                    <p className="text-brand-gold font-bold text-xs uppercase tracking-widest mb-2">Europe Hub</p>
                    <p className="text-brand-white/40 text-xs">Bremerhaven, Germany</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
