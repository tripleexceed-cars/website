import { motion } from 'framer-motion';
import Hero from '../components/home/Hero';
import VehicleCard from '../components/marketplace/VehicleCard';
import FloatingWhatsApp from '../components/common/FloatingWhatsApp';
import { MOCK_VEHICLES } from '../data/mockVehicles';
import { Shield, Globe, Anchor, Truck, ArrowRight, Zap } from 'lucide-react';

export default function Home() {
  const featuredVehicles = MOCK_VEHICLES.slice(0, 3);

  return (
    <div className="bg-brand-black min-h-screen">
      <Hero />
      
      {/* Brand Strips - High Fidelity Social Proof */}
      <section className="py-20 border-b border-brand-white/5 bg-brand-matte/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-12 opacity-20">
            {['TESLA', 'BYD', 'MERCEDES', 'TOYOTA', 'FORD', 'ZEEKR'].map(brand => (
              <span key={brand} className="text-2xl font-display font-medium tracking-[0.3em] hover:opacity-100 transition-opacity cursor-default">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Fleet */}
      <section className="py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="w-12 h-[1px] bg-brand-gold" />
                <span className="text-brand-gold uppercase tracking-[0.4em] text-xs font-bold font-display">
                  Featured Fleet
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-medium">Curated Excellence</h2>
            </div>
            <a href="/marketplace" className="group flex items-center gap-3 text-brand-gold text-xs uppercase tracking-widest border-b border-brand-gold/30 pb-1 hover:border-brand-gold transition-all">
              View Entire Inventory
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {featuredVehicles.map((vehicle, idx) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <VehicleCard vehicle={vehicle} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Protocol - Intense Logistics Section */}
      <section className="py-32 bg-brand-matte border-y border-brand-white/5 relative overflow-hidden">
        {/* Background Ambient Light */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <div className="space-y-4">
                <span className="text-brand-gold font-bold uppercase tracking-[0.4em] text-xs">The Surgical Method</span>
                <h2 className="text-4xl md:text-5xl font-display font-medium leading-tight">A Protocol of <br />Absolute Precision</h2>
              </div>
              
              <div className="space-y-10">
                {[
                  { step: '01', icon: <Shield className="text-brand-gold" size={24} />, title: 'Asset Verification', desc: 'Every vehicle undergoes a 200-point surgical inspection before acquisition to ensure tier-one quality.' },
                  { step: '02', icon: <Globe className="text-brand-gold" size={24} />, title: 'Global Logistics', desc: 'Secure transportation from USA, China, or Dubai with real-time satellite tracking and secure handling.' },
                  { step: '03', icon: <Anchor className="text-brand-gold" size={24} />, title: 'Customs Clearance', desc: 'Expert navigation of clearing protocols to ensure rapid, stress-free delivery at Ghana ports.' },
                  { step: '04', icon: <Zap className="text-brand-gold" size={24} />, title: 'Final Handover', desc: 'Detailed detailing and multi-point check before delivery to your doorstep in Accra or Kumasi.' }
                ].map((item) => (
                  <div key={item.step} className="flex gap-8 group">
                    <div className="flex-shrink-0 w-12 h-12 luxury-glass flex items-center justify-center border-brand-gold/20 group-hover:border-brand-gold transition-colors">
                      {item.icon}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-display font-bold text-brand-gold/40">{item.step}</span>
                        <h4 className="text-lg font-display font-medium uppercase tracking-widest text-brand-white">{item.title}</h4>
                      </div>
                      <p className="text-brand-silver/60 text-sm leading-relaxed max-w-md">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8">
                <a href="/how-it-works" className="btn-premium">Explore our Process</a>
              </div>
            </div>

            <div className="relative aspect-[4/5] luxury-glass p-4 group">
              <img
                src="/images/process.png"
                alt="Import Process"
                className="w-full h-full object-cover grayscale brightness-75 transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-12 left-12 right-12">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-[1px] bg-brand-gold" />
                    <span className="text-brand-gold font-bold uppercase tracking-[0.5em] text-[10px]">Protocol Stage 01</span>
                  </div>
                  <h3 className="text-3xl text-brand-white font-display font-medium uppercase tracking-widest">Global Asset Sourcing</h3>
                  <p className="text-white/40 text-[10px] leading-relaxed uppercase tracking-widest">Identifying the world's most exceptional automobiles for the Ghanaian elite.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Impact Section */}
      <section className="py-32 bg-brand-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {[
              { label: 'Vehicles Delivered', val: '450+' },
              { label: 'Client Satisfaction', val: '100%' },
              { label: 'Global Hubs', val: '04' }
            ].map(stat => (
              <div key={stat.label} className="text-center space-y-4">
                <p className="text-6xl md:text-8xl font-display font-medium gold-gradient">{stat.val}</p>
                <p className="text-brand-gold uppercase tracking-[0.5em] text-[10px] font-bold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FloatingWhatsApp />
    </div>
  );
}
