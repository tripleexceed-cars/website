import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Shield, Clock, HelpCircle } from 'lucide-react';
import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { 
      q: 'How long does the import protocol take?', 
      a: 'The typical duration for our Surgical Import Protocol is 14-21 business days. This includes asset acquisition, 200-point inspection, global logistics, and Ghana port clearance.' 
    },
    { 
      q: 'Is the 200-point inspection mandatory?', 
      a: 'Yes. To maintain Triple Exceed quality standards, every vehicle must pass our internal verification protocol before it is cleared for shipment to Ghana.' 
    },
    { 
      q: 'Do you handle all customs and clearing paperwork?', 
      a: 'Absolutely. Our logistics team handles the entire clearing process at Tema or Takoradi ports, ensuring all duties are settled and the asset is ready for immediate registration.' 
    },
    { 
      q: 'Can I track my asset in real-time?', 
      a: 'Yes. Once your order is confirmed, you will receive a unique Tracking ID. You can enter this on our "Track" page to see satellite-verified location and progress updates.' 
    },
    { 
      q: 'What asset classes do you support?', 
      a: 'We specialize in luxury sedans, performance SUVs, and electric vehicles (EVs) from top-tier manufacturers in the USA, China, and Europe.' 
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-brand-black min-h-screen relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(197,160,89,0.05),transparent_50%)]" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="space-y-16">
          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center space-x-4">
              <span className="w-12 h-[1px] bg-brand-gold" />
              <span className="text-brand-gold uppercase tracking-[0.4em] text-xs font-bold font-display">
                Information Registry
              </span>
              <span className="w-12 h-[1px] bg-brand-gold" />
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-medium">Protocol FAQs</h1>
          </div>

          <div className="space-y-4">
            {faqs.map((item, i) => (
              <div key={i} className="luxury-glass border-brand-gold/10 overflow-hidden transition-all duration-500 hover:border-brand-gold/30">
                <button 
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full p-8 flex justify-between items-center text-left"
                >
                  <span className="text-lg md:text-xl font-display font-medium text-brand-white uppercase tracking-widest">{item.q}</span>
                  <ChevronDown 
                    size={20} 
                    className={`text-brand-gold transition-transform duration-500 ${openIndex === i ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="px-8 pb-8">
                        <div className="h-[1px] bg-brand-white/5 mb-6" />
                        <p className="text-brand-silver/60 text-lg leading-relaxed max-w-3xl">
                          {item.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="luxury-glass p-12 text-center space-y-8 bg-brand-gold/5 border-brand-gold/20">
            <div className="w-16 h-16 bg-brand-gold/10 flex items-center justify-center mx-auto text-brand-gold">
              <HelpCircle size={32} />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-display font-medium uppercase tracking-widest">Still have questions?</h3>
              <p className="text-brand-white/40 text-sm max-w-md mx-auto">Our logistics consultants are available 24/7 to discuss your specific import requirements.</p>
            </div>
            <a href="/contact" className="btn-premium inline-block">Consult a Specialist</a>
          </div>
        </div>
      </div>
    </div>
  );
}
