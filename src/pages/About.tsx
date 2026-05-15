import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="pt-32 pb-24 bg-brand-black min-h-screen px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <h1 className="text-5xl font-display font-medium text-brand-white">About Triple Exceed</h1>
        <div className="luxury-glass p-12 space-y-8">
          <p className="text-brand-silver/60 text-lg leading-relaxed">Triple Exceed is the premier destination for luxury vehicle importation in Ghana. We bridge the gap between global automobile markets and the discerning Ghanaian collector.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-brand-white/5">
            <div>
              <h3 className="text-brand-gold uppercase tracking-widest text-xs font-bold mb-4">Our Mission</h3>
              <p className="text-brand-silver/40 text-sm">To provide a surgical approach to vehicle sourcing, ensuring every client receives an asset of absolute quality and provenance.</p>
            </div>
            <div>
              <h3 className="text-brand-gold uppercase tracking-widest text-xs font-bold mb-4">Our Vision</h3>
              <p className="text-brand-silver/40 text-sm">To redefine the automotive landscape in West Africa through transparency, logistics mastery, and unparalleled service.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
