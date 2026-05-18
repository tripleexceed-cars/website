import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Globe, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const [source, setSource] = useState<'USA' | 'China'>('USA');
  const [make, setMake] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/marketplace?source=${source}&brand=${make}`);
  };

  return (
    <div className="relative min-h-[90vh] w-full bg-brand-black flex flex-col lg:flex-row pt-24 overflow-hidden">
      {/* Visual Side */}
      <div className="relative flex-1 h-[50vh] lg:h-auto overflow-hidden">
        <motion.div 
          key={source}
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img 
            src={source === 'USA' 
              ? "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2000" 
              : "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=2000"} 
            alt="Luxury Automobile Sourcing" 
            className="w-full h-full object-cover grayscale-[0.2] brightness-[0.45]"
          />
        </motion.div>
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-transparent to-transparent" />
        <div className="absolute bottom-12 left-12 space-y-6 hidden lg:block">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-[1px] bg-brand-gold" />
            <span className="text-brand-gold uppercase tracking-[0.4em] text-[10px] font-bold">Protocol Active</span>
          </div>
          <div className="flex space-x-12">
            <div>
              <p className="text-brand-white text-2xl font-display font-medium">98%</p>
              <p className="text-brand-white/40 text-[9px] uppercase tracking-widest mt-1">Delivery Success</p>
            </div>
            <div>
              <p className="text-brand-white text-2xl font-display font-medium">10+</p>
              <p className="text-brand-white/40 text-[9px] uppercase tracking-widest mt-1">Global Partners</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Side */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-20 relative z-10">
        <div className="max-w-xl w-full space-y-12">
          <div className="space-y-6">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="inline-flex items-center space-x-3 px-4 py-1.5 bg-brand-gold/10 border border-brand-gold/20"
            >
              <Shield size={12} className="text-brand-gold" />
              <span className="text-brand-gold text-[9px] font-bold uppercase tracking-[0.3em]">Surgical Import Protocol v2.6</span>
            </motion.div>
            
            <h1 className="text-5xl lg:text-7xl font-display font-medium leading-[1.1] text-brand-white">
              Sourcing the <br />
              <span className="gold-gradient">Extraordinary</span>
            </h1>
            
            <p className="text-brand-silver text-lg leading-relaxed max-w-lg">
              Triple Exceed defines the pinnacle of automotive logistics. We source, verify, and deliver luxury assets with absolute precision.
            </p>
          </div>

          {/* Sourcing Engine UI */}
          <form onSubmit={handleSearch} className="luxury-glass p-8 space-y-8 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-gold">Global Origin</label>
                <div className="flex bg-brand-white/5 p-1 border border-brand-white/5">
                  <button 
                    type="button"
                    onClick={() => setSource('USA')}
                    className={`flex-1 py-2 text-[10px] uppercase tracking-widest transition-all ${source === 'USA' ? 'bg-brand-gold text-white font-bold shadow-md' : 'text-brand-white/40'}`}
                  >
                    USA
                  </button>
                  <button 
                    type="button"
                    onClick={() => setSource('China')}
                    className={`flex-1 py-2 text-[10px] uppercase tracking-widest transition-all ${source === 'China' ? 'bg-brand-gold text-white font-bold shadow-md' : 'text-brand-white/40'}`}
                  >
                    China
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-gold">Asset Class</label>
                <input 
                  type="text" 
                  placeholder="Brand (e.g. Tesla)"
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                  className="w-full bg-brand-white/5 border border-brand-white/5 py-2.5 px-4 text-[10px] uppercase tracking-widest focus:outline-none focus:border-brand-gold/50 text-brand-white placeholder:text-brand-white/30"
                />
              </div>
            </div>

            <button type="submit" className="w-full btn-premium-filled py-4 flex items-center justify-center space-x-3 group">
              <span>Initiate Discovery</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
