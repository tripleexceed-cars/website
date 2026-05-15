import { motion } from 'framer-motion';

export default function HowItWorks() {
  return (
    <div className="pt-32 pb-24 bg-brand-black min-h-screen px-6">
      <div className="max-w-4xl mx-auto space-y-12 text-center">
        <h1 className="text-5xl font-display font-medium text-brand-white">The Import Protocol</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12">
          {[
            { step: '01', title: 'Consultation', desc: 'Define your requirements and budget with our expert sourcing team.' },
            { step: '02', title: 'Asset Sourcing', desc: 'We locate and verify the perfect vehicle from our global network.' },
            { step: '03', title: 'Logistics', desc: 'Secure transportation and clearing protocols managed by our team.' }
          ].map((item) => (
            <div key={item.step} className="luxury-glass p-8 space-y-4">
              <span className="text-brand-gold font-display font-bold text-3xl opacity-20">{item.step}</span>
              <h3 className="text-brand-white uppercase tracking-widest text-sm font-bold">{item.title}</h3>
              <p className="text-brand-silver/40 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
