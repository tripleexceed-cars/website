import { motion } from 'framer-motion';
import { Search, Globe, Shield, Anchor, Briefcase, Key, Star, Zap, ArrowRight, MessageSquare, MapPin } from 'lucide-react';

export default function Services() {
  const services = [
    {
      title: 'Custom Vehicle Sourcing',
      desc: 'Access our exclusive global inventory. We locate rare luxury assets and performance vehicles that match your exact specifications.',
      icon: <Search size={24} />,
      tag: 'Global Discovery'
    },
    {
      title: 'Global Logistics Management',
      desc: 'Seamless door-to-port transportation using containerized shipping protocols and real-time satellite tracking.',
      icon: <Globe size={24} />,
      tag: 'Secure Transit'
    },
    {
      title: 'Surgical Inspection Protocol',
      desc: 'A comprehensive 200-point technical and aesthetic verification performed by certified master technicians at the source.',
      icon: <Shield size={24} />,
      tag: 'Mandatory Audit'
    },
    {
      title: 'Customs Clearing Mastery',
      desc: 'Expert navigation of Ghana port protocols. We handle all documentation and duty settlements for rapid clearance.',
      icon: <Anchor size={24} />,
      tag: 'Rapid Port Entry'
    },
    {
      title: 'VIP Fleet Governance',
      desc: 'End-to-end management for corporate and private collections, including registration, licensing, and comprehensive insurance.',
      icon: <Briefcase size={24} />,
      tag: 'Exclusive Asset'
    },
    {
      title: 'White-Glove Delivery',
      desc: 'Final detailing and pristine enclosed delivery directly to your estate in Accra, Kumasi, or any location across Ghana.',
      icon: <Key size={24} />,
      tag: 'Premium Concierge'
    }
  ];

  const handleWhatsAppConsultation = () => {
    window.open('https://wa.me/233243145384?text=VIP%20Service%20Inquiry:%20I%20would%20like%20to%20request%20a%20specialized%20importation%20protocol.', '_blank');
  };

  return (
    <div className="pt-32 pb-24 bg-brand-black min-h-screen relative overflow-hidden">
      {/* Dynamic Background Matrix */}
      <div className="absolute inset-0 bg-[radial-gradient(#252525_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[150px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-950/20 rounded-full blur-[150px] pointer-events-none translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="space-y-24">
          {/* Header */}
          <div className="space-y-6 text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center space-x-4 px-4 py-1.5 bg-red-600/10 border border-red-500/20 shadow-lg shadow-red-600/10 rounded-full"
            >
              <Shield size={14} className="text-brand-gold animate-pulse" />
              <span className="text-brand-gold uppercase tracking-[0.4em] text-[10px] font-extrabold">
                Service Portfolio v2.6
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-display font-medium text-brand-white leading-tight">
              Elite Logistics <br />
              <span className="gold-gradient">Mastery</span>
            </h1>

            <p className="text-brand-silver text-lg leading-relaxed max-w-2xl mx-auto">
              Defining the absolute pinnacle of luxury automotive acquisition and secure international freight for discerning VIP collectors.
            </p>
          </div>

          {/* Interactive Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="luxury-glass p-10 space-y-8 group hover:border-red-600/50 hover:bg-[#121212] transition-all duration-500 rounded-xl hover:scale-[1.02] shadow-2xl hover:shadow-[0_20px_50px_rgba(220,38,38,0.25)]"
              >
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all duration-500 shadow-lg group-hover:shadow-red-600/50">
                    {service.icon}
                  </div>
                  <span className="text-[9px] font-extrabold uppercase tracking-[0.3em] text-brand-gold border border-brand-gold/20 px-3 py-1 rounded-md bg-brand-gold/5 shadow-sm">
                    {service.tag}
                  </span>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-display font-medium text-brand-white group-hover:text-brand-gold transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-brand-silver text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </div>

                <div
                  onClick={handleWhatsAppConsultation}
                  className="pt-4 flex items-center gap-2 cursor-pointer text-brand-silver hover:text-brand-gold transition-all duration-300 group/link"
                >
                  <Zap size={14} className="text-brand-gold animate-bounce" />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-white group-hover/link:text-brand-gold transition-colors">
                    Inquire for Protocol
                  </span>
                  <ArrowRight size={14} className="text-brand-gold group-hover/link:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Spectacular Tailored Acquisition Showcase */}
          <section className="py-24 border-t border-brand-white/10 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <span className="text-brand-gold font-extrabold uppercase tracking-[0.5em] text-[10px]">Bespoke Division</span>
                <h2 className="text-4xl md:text-5xl font-display font-medium leading-tight text-brand-white">
                  Tailored Acquisition <br />
                  <span className="gold-gradient">Special Operations</span>
                </h2>
                <p className="text-brand-silver text-lg leading-relaxed">
                  Beyond standard luxury vehicles, our Special Operations division executes bespoke international procurement for armored security fleets, rare hypercars, and unlisted private auctions.
                </p>

                <div className="space-y-6 pt-4">
                  {[
                    'Armored Security Fleet Procurement (B6/B7 Level Ballistics)',
                    'Exclusive Private Auction Representation (Manheim VIP, Barrett-Jackson)',
                    'Hypercar Custom Sourcing & Factory Allocation Escrow'
                  ].map((spec, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-brand-white/5 border border-brand-white/10 rounded-xl hover:border-brand-gold/40 transition-all duration-300">
                      <div className="w-10 h-10 rounded-lg bg-red-600/10 border border-red-500/20 flex items-center justify-center text-brand-gold shadow-md flex-shrink-0">
                        <Star size={18} className="animate-spin-slow" />
                      </div>
                      <span className="text-brand-white text-xs uppercase tracking-widest font-extrabold">{spec}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleWhatsAppConsultation}
                  className="btn-premium-filled py-4 px-10 flex items-center gap-4 text-xs font-extrabold shadow-xl shadow-red-600/30 group"
                >
                  <MessageSquare size={18} className="group-hover:scale-110 transition-transform" />
                  <span>Initiate Special Operations Protocol</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* High-Fidelity Custom Image Showroom Card */}
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-red-600 to-rose-900 rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200" />
                <div className="relative luxury-glass p-8 space-y-8 rounded-2xl overflow-hidden bg-[#111111]">
                  <div className="aspect-[16/10] rounded-xl overflow-hidden relative shadow-2xl border border-white/10">
                    <img
                      src="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=1600"
                      alt="Specialized Acquisition Showroom"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                      <div className="space-y-1">
                        <span className="px-3 py-1 bg-brand-gold text-white text-[9px] font-bold uppercase tracking-widest shadow-lg rounded">
                          Division Alpha
                        </span>
                        <h4 className="text-xl font-display font-medium text-white pt-2">Range Rover SV 2026</h4>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-black/80 backdrop-blur-md text-brand-gold border border-brand-gold/30 rounded text-[9px] font-extrabold uppercase tracking-widest">
                        <MapPin size={10} /> Sourced via Houston Hub
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8 pt-4 border-t border-brand-white/10">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-brand-gold font-extrabold text-xs uppercase tracking-widest">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        USA Operational Hub
                      </div>
                      <p className="text-brand-silver text-xs">Houston, Texas — Direct Port Terminal</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-brand-gold font-extrabold text-xs uppercase tracking-widest">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        China Operational Hub
                      </div>
                      <p className="text-brand-silver text-xs">Shenzhen, Guangdong — Global Export</p>
                    </div>
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
