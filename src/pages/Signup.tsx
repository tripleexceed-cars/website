import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, ArrowRight, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Simulate account creation
      await login(email, 'client');
      navigate('/dashboard');
    } catch (err) {
      alert('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center p-6 pt-32 pb-12">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10 space-y-8"
      >
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-gold/10 border border-brand-gold/20 rotate-45 mb-4">
            <UserPlus size={24} className="text-brand-gold -rotate-45" />
          </div>
          <div className="space-y-2">
            <span className="text-brand-gold font-bold uppercase tracking-[0.4em] text-[10px]">Membership Registry</span>
            <h1 className="text-4xl font-display font-medium text-brand-white">Join the Elite</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="luxury-glass p-10 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-white/20" size={16} />
              <input 
                type="text" 
                required
                className="w-full bg-brand-white/5 border border-brand-white/5 py-4 pl-12 pr-4 text-xs tracking-widest uppercase focus:outline-none focus:border-brand-gold/50 transition-all text-brand-white"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-white/20" size={16} />
              <input 
                type="email" 
                required
                className="w-full bg-brand-white/5 border border-brand-white/5 py-4 pl-12 pr-4 text-xs tracking-widest uppercase focus:outline-none focus:border-brand-gold/50 transition-all text-brand-white"
                placeholder="identity@protocol.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Create Access Key</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-white/20" size={16} />
              <input 
                type="password" 
                required
                className="w-full bg-brand-white/5 border border-brand-white/5 py-4 pl-12 pr-4 text-xs tracking-widest focus:outline-none focus:border-brand-gold/50 transition-all text-brand-white"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full btn-premium-filled py-4 flex items-center justify-center gap-3 group"
          >
            {loading ? 'Processing...' : (
              <>
                <span>Register Protocol</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <p className="text-center text-[10px] uppercase tracking-widest text-brand-silver/40">
            Already have access? <Link to="/client/login" className="text-brand-gold hover:underline">Connect</Link>
          </p>
        </form>

        <p className="text-center text-[10px] uppercase tracking-widest text-brand-silver/40">
          Triple Exceed Automobile Ltd. | Secured Registry
        </p>
      </motion.div>
    </div>
  );
}
