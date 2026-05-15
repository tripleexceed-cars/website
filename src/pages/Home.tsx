import { motion } from 'framer-motion';
import Hero from '../components/home/Hero';
import VehicleCard from '../components/marketplace/VehicleCard';
import FloatingWhatsApp from '../components/common/FloatingWhatsApp';
import { MOCK_VEHICLES } from '../data/mockVehicles';

export default function Home() {
  const featuredVehicles = MOCK_VEHICLES.slice(0, 3);

  return (
    <div className="bg-brand-black">
      <Hero />
      
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
            <a href="/marketplace" className="text-brand-gold text-xs uppercase tracking-widest border-b border-brand-gold/30 pb-1 hover:border-brand-gold transition-all">
              View Entire Inventory
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

      {/* Import Process */}
      <section className="py-32 bg-brand-matte border-y border-brand-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative aspect-[4/5] luxury-glass p-4 group">
              <img
                src="/images/process.png"
                alt="Import Process"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-12 left-12">
                <span className="text-brand-gold font-bold uppercase tracking-[0.5em] text-[10px] block mb-4">Protocol Stage 01</span>
                <h3 className="text-3xl text-brand-white font-display font-medium uppercase tracking-widest">Global Sourcing</h3>
              </div>
            </div>

            <div className="space-y-12">
              <div className="space-y-4">
                <span className="text-brand-gold font-bold uppercase tracking-[0.4em] text-xs">The Surgical Method</span>
                <h2 className="text-4xl md:text-5xl font-display font-medium leading-tight">A Protocol of Absolute Precision</h2>
              </div>
              
              <div className="space-y-10">
                {[
                  { step: '01', title: 'Asset Verification', desc: 'Every vehicle undergoes a 200-point surgical inspection before acquisition.' },
                  { step: '02', title: 'Global Logistics', desc: 'Secure transportation from USA, China, or Dubai with real-time satellite tracking.' },
                  { step: '03', title: 'Customs Clearance', desc: 'Expert navigation of clearing protocols to ensure rapid delivery in Ghana.' }
                ].map((item) => (
                  <div key={item.step} className="flex gap-8 group">
                    <span className="text-2xl font-display font-bold text-brand-gold/20 group-hover:text-brand-gold transition-colors">{item.step}</span>
                    <div className="space-y-2">
                      <h4 className="text-lg font-display font-medium uppercase tracking-widest text-brand-white">{item.title}</h4>
                      <p className="text-brand-silver/60 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="btn-premium">Explore our Process</button>
            </div>
          </div>
        </div>
      </section>

      <FloatingWhatsApp />
    </div>
  );
}
