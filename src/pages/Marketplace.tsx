import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Grid, List as ListIcon } from 'lucide-react';

import { MOCK_VEHICLES } from '../data/mockVehicles';
import VehicleCard from '../components/marketplace/VehicleCard';
import { SOURCE_COUNTRIES, BRANDS, CONDITIONS } from '../constants';

export default function Marketplace() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedSource, setSelectedSource] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [maxPrice, setMaxPrice] = useState(1500000);

  useEffect(() => {
    const brandParam = searchParams.get('brand');
    const sourceParam = searchParams.get('source');
    const budgetParam = searchParams.get('budget');
    const queryParam = searchParams.get('q');
    
    if (brandParam) setSelectedBrand(brandParam);
    if (sourceParam) setSelectedSource(sourceParam);
    if (budgetParam) setMaxPrice(Number(budgetParam));
    if (queryParam) setSearch(queryParam);
  }, [searchParams]);

  const filteredVehicles = useMemo(() => {
    return MOCK_VEHICLES.filter(v => {
      const matchesSearch = v.name.toLowerCase().includes(search.toLowerCase()) || 
                           v.brand.toLowerCase().includes(search.toLowerCase());
      const matchesBrand = selectedBrand === 'All' || v.brand === selectedBrand;
      const matchesSource = selectedSource === 'All' || v.sourceCountry === selectedSource;
      const matchesCondition = selectedCondition === 'All' || v.condition === selectedCondition;
      const matchesPrice = v.priceGHS <= maxPrice;
      return matchesSearch && matchesBrand && matchesSource && matchesCondition && matchesPrice;
    });
  }, [search, selectedBrand, selectedSource, selectedCondition, maxPrice]);

  const brands = useMemo(() => ['All', ...BRANDS.sort()], []);

  return (
    <div className="pt-32 pb-24 bg-brand-black min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="w-12 h-[1px] bg-brand-gold" />
              <span className="text-brand-gold uppercase tracking-[0.4em] text-xs font-bold font-display">
                Global Inventory
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-medium">Browse Fleet</h1>
          </div>
          
          <div className="flex items-center space-x-4 text-brand-white/30 text-sm">
            <span>Showing {filteredVehicles.length} vehicles</span>
            <div className="h-4 w-[1px] bg-brand-white/10" />
            <button className="hover:text-brand-gold transition-colors"><Grid size={18} /></button>
            <button className="hover:text-brand-gold transition-colors"><ListIcon size={18} /></button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="luxury-glass mb-16 p-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-white/30 group-focus-within:text-brand-gold transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search by model or brand..."
              className="w-full bg-brand-white/5 border border-brand-white/5 py-3 pl-12 pr-4 text-xs tracking-widest uppercase focus:outline-none focus:border-brand-gold/50 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Brand</label>
            <select 
              className="bg-brand-white/5 border border-brand-white/5 py-3 px-4 text-xs tracking-widest uppercase focus:outline-none focus:border-brand-gold/50 transition-all text-brand-white/70"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              {brands.map(brand => <option key={brand} value={brand} className="bg-brand-matte">{brand}</option>)}
            </select>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Source Country</label>
            <select 
              className="bg-brand-white/5 border border-brand-white/5 py-3 px-4 text-xs tracking-widest uppercase focus:outline-none focus:border-brand-gold/50 transition-all text-brand-white/70"
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
            >
              <option value="All" className="bg-brand-matte">All Sources</option>
              {SOURCE_COUNTRIES.map(country => <option key={country} value={country} className="bg-brand-matte">{country}</option>)}
            </select>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Condition</label>
            <select 
              className="bg-brand-white/5 border border-brand-white/5 py-3 px-4 text-xs tracking-widest uppercase focus:outline-none focus:border-brand-gold/50 transition-all text-brand-white/70"
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
            >
              <option value="All" className="bg-brand-matte">All Conditions</option>
              {CONDITIONS.map(condition => <option key={condition} value={condition} className="bg-brand-matte">{condition}</option>)}
            </select>
          </div>

          <div className="flex flex-col space-y-4 md:col-span-4 border-t border-brand-white/5 pt-8">
            <div className="flex justify-between items-center">
              <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Max Budget (GHS)</label>
              <span className="text-brand-white font-display font-bold">GH₵ {maxPrice.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="100000" 
              max="2500000" 
              step="50000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-[2px] bg-brand-white/10 appearance-none cursor-pointer accent-brand-gold"
            />
          </div>

        </div>

        {/* Vehicle Grid */}
        {filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredVehicles.map(vehicle => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center space-y-4">
            <Search size={48} className="text-brand-white/10 mx-auto" />
            <h3 className="text-2xl font-display font-medium text-brand-white/40">No vehicles match your criteria</h3>
            <button 
              onClick={() => { setSearch(''); setSelectedBrand('All'); setSelectedSource('All'); setSelectedCondition('All'); setMaxPrice(1500000); }}
              className="text-brand-gold text-xs uppercase tracking-widest border-b border-brand-gold/30 pb-1"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
