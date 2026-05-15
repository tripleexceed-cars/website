import { motion } from 'framer-motion';
import { Ship, Truck, ShieldCheck, Globe2, Anchor, ArrowRight } from 'lucide-react';

export default function Logistics() {
  return (
    <div className="pt-32 bg-brand-black">
      {/* Hero Section */}
      <section className="px-6 md:px-10 pb-24 border-b border-brand-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <span className="w-12 h-[1px] bg-brand-gold" />
                <span className="text-brand-gold uppercase tracking-[0.4em] text-xs font-bold font-display">
                  Global Supply Chain
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-medium leading-[1.1] text-brand-white">
                Surgical <br />
                <span className="gold-gradient">Logistics</span>
              </h1>
              <p className="text-brand-silver/60 text-lg leading-relaxed max-w-lg">
                We handle the entire journey—from the showroom floor in Los Angeles or Shanghai to your driveway in Accra. Zero friction. Absolute transparency.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <p className="text-3xl font-display font-medium text-brand-white">14 Days</p>
                <p className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Avg. Transit Time</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-display font-medium text-brand-white">100%</p>
                <p className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Insurance Coverage</p>
              </div>
            </div>
          </div>

          <div className="relative aspect-square lg:aspect-[4/5] overflow-hidden luxury-glass group">
            <img 
              src="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&q=80&w=1200" 
              alt="Shipment" 
              className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-brand-black/40" />
            <div className="absolute bottom-10 left-10 right-10 p-8 bg-brand-black/80 backdrop-blur-md border border-brand-white/10">
              <div className="flex items-center gap-4 text-brand-gold mb-2">
                <Globe2 size={20} />
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Active Route: Port of Long Beach → Tema</span>
              </div>
              <p className="text-sm text-brand-white/60">Live satellite tracking enabled for all premium assets.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 px-6 md:px-10 bg-brand-matte">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-display font-medium">The Protocol</h2>
            <p className="text-brand-silver/40 uppercase tracking-widest text-[10px] font-bold">Tier 1 Logistics Management</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Ship,
                title: 'Ocean Freight',
                desc: 'Specialized container shipping with climate control and high-security protocols for luxury vehicles.'
              },
              {
                icon: Truck,
                title: 'Ground Transport',
                desc: 'Enclosed trailer transportation from port to destination, ensuring zero exposure to elements.'
              },
              {
                icon: ShieldCheck,
                title: 'Customs Mastery',
                desc: 'Expert handling of clearing and duties, navigating complex regulatory environments seamlessly.'
              }
            ].map((service, idx) => (
              <div key={idx} className="luxury-glass p-10 space-y-6 group hover:border-brand-gold/30 transition-all">
                <div className="w-16 h-16 bg-brand-gold/10 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-black transition-all">
                  <service.icon size={32} />
                </div>
                <h3 className="text-2xl font-display font-medium uppercase tracking-widest text-brand-white">{service.title}</h3>
                <p className="text-brand-silver/60 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
