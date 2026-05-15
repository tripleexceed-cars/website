import { useState, useEffect } from 'react';
import { 
  Plus, Edit, Trash2, Search, Filter, 
  ChevronRight, LayoutGrid, List as ListIcon,
  Shield, Package
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_VEHICLES } from '../../data/mockVehicles';
import { supabaseService } from '../../lib/supabaseService';

export default function AdminInventory() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await supabaseService.getVehicles();
        // Fallback to mock if empty
        setVehicles(data.length > 0 ? data : MOCK_VEHICLES);
      } catch (err) {
        setVehicles(MOCK_VEHICLES);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      try {
        await supabaseService.deleteVehicle(id);
        setVehicles(prev => prev.filter(v => v.id !== id));
      } catch (err) {
        alert('Delete failed');
      }
    }
  };

  return (
    <div className="min-h-screen bg-brand-black pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="w-8 h-[1px] bg-brand-gold" />
              <span className="text-brand-gold uppercase tracking-[0.4em] text-[10px] font-bold">Asset Management</span>
            </div>
            <h1 className="text-4xl font-display font-medium">Fleet Inventory</h1>
          </div>

          <button 
            onClick={() => setIsAddingNew(true)}
            className="btn-premium-filled py-3 px-8 flex items-center gap-3"
          >
            <Plus size={18} />
            Add Asset
          </button>
        </div>

        {/* Controls */}
        <div className="luxury-glass p-6 mb-8 flex flex-col md:flex-row gap-6">
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-white/20 group-focus-within:text-brand-gold transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search by model or VIN..."
              className="w-full bg-brand-white/5 border border-brand-white/5 py-3 pl-12 pr-4 text-xs tracking-widest uppercase focus:outline-none focus:border-brand-gold/50 transition-all text-brand-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4">
            <button className="px-6 bg-brand-white/5 border border-brand-white/5 text-[10px] uppercase tracking-widest font-bold text-brand-white/40 hover:text-brand-gold transition-all flex items-center gap-2">
              <Filter size={14} /> Filter
            </button>
            <div className="flex bg-brand-white/5 p-1 border border-brand-white/5">
              <button className="p-2 bg-brand-gold text-brand-black"><LayoutGrid size={16} /></button>
              <button className="p-2 text-brand-white/20"><ListIcon size={16} /></button>
            </div>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="py-32 flex justify-center">
            <div className="w-12 h-12 border-2 border-brand-gold border-t-transparent animate-spin rounded-full" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.filter(v => v.name.toLowerCase().includes(search.toLowerCase())).map((vehicle) => (
              <div key={vehicle.id} className="luxury-glass overflow-hidden group">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img src={vehicle.images[0]} alt={vehicle.name} className="w-full h-full object-cover grayscale" />
                  <div className="absolute inset-0 bg-brand-black/40 group-hover:bg-transparent transition-all" />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button className="p-2 bg-brand-black/80 backdrop-blur-md text-brand-gold hover:bg-brand-gold hover:text-black transition-all">
                      <Edit size={14} />
                    </button>
                    <button 
                      onClick={() => handleDelete(vehicle.id)}
                      className="p-2 bg-brand-black/80 backdrop-blur-md text-red-500 hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-display font-medium text-brand-white">{vehicle.name}</h3>
                      <p className="text-[10px] text-brand-white/30 uppercase tracking-widest">{vehicle.id}</p>
                    </div>
                    <span className="text-brand-gold font-bold">GH₵ {vehicle.priceGHS.toLocaleString()}</span>
                  </div>
                  
                  <div className="pt-4 border-t border-brand-white/5 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-brand-gold/60">
                      <Shield size={12} />
                      <span className="text-[9px] uppercase tracking-widest font-bold">Verified Status</span>
                    </div>
                    <span className="text-[9px] text-brand-white/40 uppercase tracking-widest">Added {new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
