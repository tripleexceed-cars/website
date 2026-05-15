import { motion } from 'framer-motion';

export default function Legal() {
  return (
    <div className="pt-32 pb-24 bg-brand-black min-h-screen px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <h1 className="text-5xl font-display font-medium text-brand-white">Legal Information</h1>
        <div className="luxury-glass p-12 prose prose-invert max-w-none">
          <h2 className="text-brand-gold uppercase tracking-widest text-sm font-bold mb-8">Privacy Protocol</h2>
          <p className="text-brand-silver/60">Triple Exceed is committed to protecting your personal data and ensuring transparency in all our operations.</p>
          <p className="text-brand-silver/60">Our privacy protocols are designed to meet global standards of data protection and security.</p>
        </div>
      </div>
    </div>
  );
}
