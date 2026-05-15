import { useState } from 'react';
import { motion } from 'framer-motion';
import { Crosshair, Ship, Anchor, Search, ArrowRight } from 'lucide-react';

export default function Track() {
  const [trackingId, setTrackingId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId) return;
    setIsSearching(true);
    // Simulate API search
    setTimeout(() => {
      setIsSearching(false);
      setResult(true);
    }, 1500);
  };

  return (
    <div className="pt-32 pb-24 bg-brand-black min-h-screen relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="space-y-16 text-center">
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-4">
              <span className="w-12 h-[1px] bg-brand-gold" />
              <span className="text-brand-gold uppercase tracking-[0.4em] text-xs font-bold font-display">
                Global Logistics
              </span>
              <span className="w-12 h-[1px] bg-brand-gold" />
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-medium">Track your Asset</h1>
          </div>

          <form onSubmit={handleSearch} className="luxury-glass p-8 md:p-12 space-y-8 max-w-2xl mx-auto border-brand-gold/20">
            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-[0.5em] text-brand-gold font-bold block">
                Enter Tracking ID or VIN
              </label>
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="e.g. TE-492817"
                  className="w-full bg-brand-white/5 border-b border-brand-white/10 py-6 text-2xl md:text-3xl font-display text-brand-white focus:outline-none focus:border-brand-gold transition-all uppercase"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                />
                <Search className="absolute right-0 top-1/2 -translate-y-1/2 text-brand-white/20 group-focus-within:text-brand-gold transition-colors" size={24} />
              </div>
            </div>

            <button type="submit" className="w-full btn-premium-filled py-5 flex items-center justify-center space-x-4 group">
              {isSearching ? (
                <div className="w-5 h-5 border-2 border-brand-black border-t-transparent animate-spin rounded-full" />
              ) : (
                <>
                  <span>Initiate Satellite Lookup</span>
                  <Crosshair size={18} className="group-hover:rotate-45 transition-transform" />
                </>
              )}
            </button>
          </form>

          {result && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-brand-matte border border-brand-gold/30 p-8 md:p-12 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Ship size={120} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left relative z-10">
                <div className="space-y-8">
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Protocol Status</p>
                    <h3 className="text-3xl font-display font-medium text-brand-white flex items-center gap-3">
                      In Transit
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    </h3>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-widest text-brand-white/30 font-bold">Current Location</p>
                    <p className="text-xl text-brand-white flex items-center gap-2">
                      <Anchor size={18} className="text-brand-gold" />
                      Atlantic Crossing - Area 5
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-widest text-brand-white/30 font-bold">Asset Type</p>
                    <p className="text-xl text-brand-white">Tesla Model S Plaid (2024)</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold">
                      <span className="text-brand-gold">Logistics Progress</span>
                      <span className="text-brand-white">68%</span>
                    </div>
                    <div className="w-full h-1 bg-brand-white/10 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '68%' }}
                        className="h-full bg-brand-gold shadow-[0_0_10px_rgba(197,160,89,0.5)]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
