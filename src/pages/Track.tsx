import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crosshair, Ship, Anchor, Search, ArrowRight, AlertTriangle, Clock } from 'lucide-react';
import { supabaseService } from '../lib/supabaseService';

export default function Track() {
  const [trackingId, setTrackingId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [shipment, setShipment] = useState<any>(null);
  const [error, setError] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId) return;
    
    setIsSearching(true);
    setError(false);
    setShipment(null);

    try {
      const data = await supabaseService.getShipmentByTrackingId(trackingId);
      if (data) {
        setShipment(data);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setIsSearching(false);
    }
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
              <label className="text-[10px] uppercase tracking-[0.5em] text-brand-gold font-bold block text-left">
                Enter Tracking ID or VIN
              </label>
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="e.g. TE-492817"
                  className="w-full bg-brand-white/5 border-b border-brand-white/10 py-6 text-2xl md:text-3xl font-display text-brand-white focus:outline-none focus:border-brand-gold transition-all uppercase placeholder:opacity-20"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                />
                <Search className="absolute right-0 top-1/2 -translate-y-1/2 text-brand-white/20 group-focus-within:text-brand-gold transition-colors" size={24} />
              </div>
            </div>

            <button type="submit" disabled={isSearching} className="w-full btn-premium-filled py-5 flex items-center justify-center space-x-4 group disabled:opacity-50">
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

          <AnimatePresence mode="wait">
            {shipment && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
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
                        {shipment.status}
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      </h3>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-[10px] uppercase tracking-widest text-brand-white/30 font-bold">Current Location</p>
                      <p className="text-xl text-brand-white flex items-center gap-2">
                        <Anchor size={18} className="text-brand-gold" />
                        {shipment.location}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-2">
                      <p className="text-[10px] uppercase tracking-widest text-brand-white/30 font-bold">Asset Type</p>
                      <p className="text-xl text-brand-white">{shipment.vehicleName}</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold">
                        <span className="text-brand-gold">Logistics Progress</span>
                        <span className="text-brand-white">{shipment.progress}%</span>
                      </div>
                      <div className="w-full h-1 bg-brand-white/10 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${shipment.progress}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-brand-gold shadow-[0_0_10px_rgba(197,160,89,0.5)]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-brand-white/5 flex flex-wrap gap-8">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-brand-gold" />
                    <span className="text-[10px] uppercase tracking-widest font-bold text-brand-white/40">Estimated Arrival:</span>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-brand-white">{shipment.eta}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div 
                key="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="luxury-glass p-8 border-red-500/30 flex flex-col items-center gap-4 max-w-md mx-auto"
              >
                <AlertTriangle size={32} className="text-red-500" />
                <div className="text-center">
                  <h3 className="text-brand-white font-display font-medium uppercase tracking-widest">Protocol Failure</h3>
                  <p className="text-brand-white/40 text-xs mt-2 leading-relaxed">No asset found with tracking ID: <span className="text-brand-gold">{trackingId}</span>. Please verify your credentials and retry.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
