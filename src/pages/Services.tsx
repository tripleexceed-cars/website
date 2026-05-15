import { motion } from 'framer-motion';

export default function Services() {
  return (
    <div className="pt-32 pb-24 bg-brand-black min-h-screen px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <h1 className="text-5xl font-display font-medium text-brand-white">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            'Custom Vehicle Sourcing',
            'Global Logistics Management',
            'Customs Clearing & Duty Handling',
            'Pre-Purchase Inspection Protcols',
            'VIP Fleet Management',
            'Registration & Licensing Service'
          ].map((service) => (
            <div key={service} className="luxury-glass p-8 flex items-center justify-between group hover:border-brand-gold/30 transition-all">
              <span className="text-brand-white uppercase tracking-widest text-xs font-bold">{service}</span>
              <div className="w-2 h-2 bg-brand-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
