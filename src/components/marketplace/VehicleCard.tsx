import { motion } from 'framer-motion';
import { Shield, ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function VehicleCard({ vehicle }: { vehicle: any }) {
  return (
    <Link to={`/vehicle/${vehicle.id}`} className="block group">
      <div className="luxury-glass overflow-hidden relative">
        {/* Image */}
        <div className="aspect-[16/10] overflow-hidden relative">
          <img 
            src={vehicle.images[0]} 
            alt={vehicle.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent" />
          
          {/* Badge */}
          <div className="absolute top-4 left-4 flex space-x-2">
            <span className="px-3 py-1 bg-brand-gold text-white text-[9px] font-bold uppercase tracking-widest shadow-md shadow-red-600/20">
              {vehicle.condition}
            </span>
            <span className="px-3 py-1 bg-black/80 backdrop-blur-md text-brand-gold text-[9px] font-bold uppercase tracking-widest border border-brand-gold/20 flex items-center gap-1 shadow-md">
              <MapPin size={8} /> {vehicle.sourceCountry}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-display font-medium text-brand-white group-hover:text-brand-gold transition-colors">
                {vehicle.name}
              </h3>
              <span className="text-brand-gold font-display font-bold">GH₵ {vehicle.priceGHS.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-4 text-brand-silver/40 text-[10px] uppercase tracking-widest font-bold">
              <span>{vehicle.year}</span>
              <div className="w-1 h-1 bg-brand-gold/30 rounded-full" />
              <span>{vehicle.fuelType}</span>
              <div className="w-1 h-1 bg-brand-gold/30 rounded-full" />
              <span>{vehicle.mileage.toLocaleString()} KM</span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-brand-white/5">
            <div className="flex items-center space-x-2 text-brand-gold/60">
              <Shield size={14} />
              <span className="text-[9px] uppercase tracking-widest font-bold">Verified Asset</span>
            </div>
            <div className="flex items-center space-x-2 text-brand-white/40 group-hover:text-brand-white transition-colors text-[9px] uppercase tracking-[0.2em] font-bold">
              <span>Details</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
