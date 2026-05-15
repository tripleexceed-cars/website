import { motion } from 'framer-motion';

export default function FAQ() {
  return (
    <div className="pt-32 pb-24 bg-brand-black min-h-screen px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <h1 className="text-5xl font-display font-medium text-brand-white">Protocol FAQs</h1>
        <div className="space-y-6">
          {[
            { q: 'How long does the import process take?', a: 'Typically 14-21 days depending on the vehicle origin and shipping schedule.' },
            { q: 'Are all vehicles inspected?', a: 'Yes, every asset undergoes a 200-point surgical inspection before acquisition.' },
            { q: 'What payment methods do you accept?', a: 'We accept bank transfers and certified mobile money payments for all transactions.' }
          ].map((item, i) => (
            <div key={i} className="luxury-glass p-8 space-y-4">
              <h3 className="text-brand-gold uppercase tracking-widest text-xs font-bold">{item.q}</h3>
              <p className="text-brand-silver/60 text-sm">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
