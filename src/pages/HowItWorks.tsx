import { motion } from 'framer-motion';
import { Search, Shield, Ship, Anchor, CheckCircle, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      id: '01',
      title: 'Consultation & Discovery',
      desc: 'Our process begins with an elite consultation to define your automotive profile, budget, and origin preferences (USA, China, or Europe).',
      icon: <Search className="text-brand-gold" size={32} />,
      details: ['Asset Profile Definition', 'Budget Optimization', 'Origin Selection']
    },
    {
      id: '02',
      title: 'Surgical Acquisition',
      desc: 'We locate the asset through our global network. A 200-point physical inspection is performed by our agents before acquisition.',
      icon: <Shield className="text-brand-gold" size={32} />,
      details: ['200-Point Inspection', 'History Verification', 'Secure Acquisition']
    },
    {
      id: '03',
      title: 'Secure Logistics',
      desc: 'The vehicle is secured in a reinforced container and monitored via satellite as it traverses global trade routes.',
      icon: <Ship className="text-brand-gold" size={32} />,
      details: ['Containerized Shipping', 'Satellite Tracking', 'Full Cargo Insurance']
    },
    {
      id: '04',
      title: 'Port Clearance',
      desc: 'Our logistics team manages the complex clearing protocols at Ghana ports, ensuring rapid and accurate duty settlement.',
      icon: <Anchor className="text-brand-gold" size={32} />,
      details: ['Duty Assessment', 'Rapid Clearing', 'Documentation Control']
    },
    {
      id: '05',
      title: 'Elite Handover',
      desc: 'Following a final detailing and technical check, your asset is delivered to your preferred location in Ghana.',
      icon: <CheckCircle className="text-brand-gold" size={32} />,
      details: ['Professional Detailing', 'Technical Verification', 'White-Glove Delivery']
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-brand-black min-h-screen relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="space-y-24">
          <div className="space-y-6 text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-4">
              <span className="w-12 h-[1px] bg-brand-gold" />
              <span className="text-brand-gold uppercase tracking-[0.4em] text-xs font-bold font-display">
                The Triple Exceed Method
              </span>
              <span className="w-12 h-[1px] bg-brand-gold" />
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-medium">The Import Protocol</h1>
            <p className="text-brand-white/40 text-lg leading-relaxed">A systematic approach to global automotive logistics, defined by precision and absolute transparency.</p>
          </div>

          <div className="space-y-12">
            {steps.map((step, idx) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-24 items-center`}
              >
                <div className="flex-1 space-y-8">
                  <div className="flex items-center gap-6">
                    <span className="text-6xl md:text-8xl font-display font-medium text-brand-gold/10">{step.id}</span>
                    <h2 className="text-3xl md:text-4xl font-display font-medium uppercase tracking-widest text-brand-white">{step.title}</h2>
                  </div>
                  <p className="text-brand-silver/60 text-lg leading-relaxed">{step.desc}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {step.details.map(detail => (
                      <div key={detail} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-brand-gold rotate-45" />
                        <span className="text-[10px] uppercase tracking-widest font-bold text-brand-white/40">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full md:w-80 h-80 luxury-glass flex items-center justify-center relative group">
                  <div className="absolute inset-0 bg-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10 scale-125 md:scale-150 group-hover:scale-110 transition-transform duration-700">
                    {step.icon}
                  </div>
                  {/* Connectors for desktop */}
                  {idx < steps.length - 1 && (
                    <div className={`hidden md:block absolute top-full h-24 w-[1px] bg-gradient-to-b from-brand-gold/20 to-transparent left-1/2`} />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="pt-12 text-center">
            <div className="luxury-glass p-16 space-y-12 bg-brand-matte relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80')] bg-cover opacity-5 grayscale" />
              <div className="relative z-10 space-y-8">
                <h3 className="text-4xl font-display font-medium uppercase tracking-widest">Ready to initiate?</h3>
                <p className="text-brand-white/40 max-w-xl mx-auto">Start your discovery process today and experience the pinnacle of automotive logistics.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <a href="/marketplace" className="btn-premium-filled py-4 px-12">Browse Inventory</a>
                  <a href="/contact" className="btn-premium py-4 px-12">Talk to an Agent</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
