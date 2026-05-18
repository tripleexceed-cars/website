import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, DollarSign, Image as ImageIcon, FileText } from 'lucide-react';

interface VehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (vehicle: any) => Promise<void>;
  vehicle?: any | null;
}

export default function VehicleModal({ isOpen, onClose, onSave, vehicle }: VehicleModalProps) {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState(2026);
  const [priceGHS, setPriceGHS] = useState(0);
  const [condition, setCondition] = useState('Brand New');
  const [sourceCountry, setSourceCountry] = useState('USA');
  const [mileage, setMileage] = useState(0);
  const [fuelType, setFuelType] = useState('Electric');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (vehicle) {
      setName(vehicle.name || '');
      setBrand(vehicle.brand || '');
      setModel(vehicle.model || '');
      setYear(vehicle.year || 2026);
      setPriceGHS(vehicle.priceGHS || 0);
      setCondition(vehicle.condition || 'Brand New');
      setSourceCountry(vehicle.sourceCountry || 'USA');
      setMileage(vehicle.mileage || 0);
      setFuelType(vehicle.fuelType || 'Electric');
      setDescription(vehicle.description || '');
      setImageUrl(vehicle.images?.[0] || '');
    } else {
      setName('');
      setBrand('');
      setModel('');
      setYear(2026);
      setPriceGHS('');
      setCondition('Brand New');
      setSourceCountry('USA');
      setMileage(0);
      setFuelType('Electric');
      setDescription('');
      setImageUrl('');
    }
  }, [vehicle, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave({
        id: vehicle?.id,
        name: name || `${brand} ${model}`,
        brand: brand || name.split(' ')[0],
        model: model || name.split(' ').slice(1).join(' '),
        year: Number(year),
        priceGHS: Number(priceGHS),
        condition,
        sourceCountry,
        mileage: Number(mileage),
        fuelType,
        description,
        images: [imageUrl || 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=1200']
      });
      onClose();
    } catch (err) {
      alert('Failed to save asset protocol');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="luxury-glass p-8 max-w-2xl w-full relative border border-brand-gold/30 my-8 space-y-6"
        >
          <div className="flex justify-between items-center pb-4 border-b border-brand-white/10">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="w-4 h-[1px] bg-brand-gold" />
                <span className="text-brand-gold uppercase tracking-[0.3em] text-[9px] font-bold">Asset Registry</span>
              </div>
              <h3 className="text-2xl font-display font-medium text-brand-white">
                {vehicle ? 'Modify Fleet Asset' : 'Onboard New Asset'}
              </h3>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-brand-white/40 hover:text-brand-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Display Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Rolls-Royce Spectre" 
                  value={name} 
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-brand-white/5 border border-brand-white/5 p-3.5 text-xs text-brand-white focus:border-brand-gold/50 outline-none uppercase tracking-wider"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Brand</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Rolls-Royce" 
                  value={brand} 
                  onChange={e => setBrand(e.target.value)}
                  className="w-full bg-brand-white/5 border border-brand-white/5 p-3.5 text-xs text-brand-white focus:border-brand-gold/50 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Model</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Spectre" 
                  value={model} 
                  onChange={e => setModel(e.target.value)}
                  className="w-full bg-brand-white/5 border border-brand-white/5 p-3.5 text-xs text-brand-white focus:border-brand-gold/50 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Model Year</label>
                <input 
                  type="number" 
                  required
                  value={year} 
                  onChange={e => setYear(Number(e.target.value))}
                  className="w-full bg-brand-white/5 border border-brand-white/5 p-3.5 text-xs text-brand-white focus:border-brand-gold/50 outline-none font-mono"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Valuation (GHS)</label>
                <input 
                  type="number" 
                  required
                  placeholder="1850000" 
                  value={priceGHS} 
                  onChange={e => setPriceGHS(Number(e.target.value))}
                  className="w-full bg-brand-white/5 border border-brand-white/5 p-3.5 text-xs text-brand-white focus:border-brand-gold/50 outline-none font-mono"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Condition</label>
                <select 
                  value={condition} 
                  onChange={e => setCondition(e.target.value)}
                  className="w-full bg-[#151515] border border-brand-white/5 p-3.5 text-xs text-brand-white focus:border-brand-gold/50 outline-none uppercase tracking-wider"
                >
                  <option value="Brand New">Brand New</option>
                  <option value="Pristine Used">Pristine Used</option>
                  <option value="Certified Pre-Owned">Certified Pre-Owned</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Global Hub Source</label>
                <select 
                  value={sourceCountry} 
                  onChange={e => setSourceCountry(e.target.value)}
                  className="w-full bg-[#151515] border border-brand-white/5 p-3.5 text-xs text-brand-white focus:border-brand-gold/50 outline-none uppercase tracking-wider"
                >
                  <option value="USA">USA / Houston Hub</option>
                  <option value="China">China / Shenzhen Hub</option>
                  <option value="Europe">Europe / Frankfurt Hub</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Propulsion Type</label>
                <select 
                  value={fuelType} 
                  onChange={e => setFuelType(e.target.value)}
                  className="w-full bg-[#151515] border border-brand-white/5 p-3.5 text-xs text-brand-white focus:border-brand-gold/50 outline-none uppercase tracking-wider"
                >
                  <option value="Electric">Pure Electric (EV)</option>
                  <option value="Hybrid">PHEV / Hybrid</option>
                  <option value="Gasoline">High-Output V8 / V12</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Mileage (KM)</label>
                <input 
                  type="number" 
                  value={mileage} 
                  onChange={e => setMileage(Number(e.target.value))}
                  className="w-full bg-brand-white/5 border border-brand-white/5 p-3.5 text-xs text-brand-white focus:border-brand-gold/50 outline-none font-mono"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Asset Image URL</label>
                <input 
                  type="url" 
                  placeholder="https://images.unsplash.com/..." 
                  value={imageUrl} 
                  onChange={e => setImageUrl(e.target.value)}
                  className="w-full bg-brand-white/5 border border-brand-white/5 p-3.5 text-xs text-brand-white focus:border-brand-gold/50 outline-none font-mono text-[10px]"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Executive Summary / Description</label>
                <textarea 
                  rows={3} 
                  placeholder="Engineering specifications and bespoke features..."
                  value={description} 
                  onChange={e => setDescription(e.target.value)}
                  className="w-full bg-brand-white/5 border border-brand-white/5 p-3.5 text-xs text-brand-white focus:border-brand-gold/50 outline-none"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-6 border-t border-brand-white/10">
              <button 
                type="button" 
                onClick={onClose}
                className="flex-1 py-4 border border-brand-white/10 text-brand-white/60 text-xs uppercase tracking-widest font-bold hover:border-brand-white/30 transition-colors"
              >
                Abort
              </button>
              <button 
                type="submit" 
                disabled={loading}
                className="flex-1 btn-premium-filled py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
              >
                {loading ? 'Executing...' : (vehicle ? 'Update Fleet Asset' : 'Commit New Asset')}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
