import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href="https://wa.me/233243145384"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-10 right-10 z-[80] w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl text-white hover:bg-green-600 transition-colors shadow-green-500/20"
    >
      <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20" />
      <MessageCircle size={32} />
    </motion.a>
  );
}
