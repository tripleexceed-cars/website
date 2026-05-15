import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, Shield, Globe, 
  CheckCircle2, Info, Package, Calendar, Fuel, 
  Gauge, MapPin, ArrowRight, MessageCircle, X
} from 'lucide-react';
import { MOCK_VEHICLES } from '../data/mockVehicles';
import { supabaseService } from '../lib/supabaseService';

export default function VehicleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState<any>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    idNumber: ''
  });

  useEffect(() => {
    const v = MOCK_VEHICLES.find(item => item.id === id);
    if (v) {
      setVehicle(v);
    } else {
      navigate('/marketplace');
    }
  }, [id, navigate]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingLoading(true);
    try {
      await supabaseService.createBooking({
        id: `BK-${Math.floor(Math.random() * 100000)}`,
        vehicleName: vehicle.name,
        vehiclePrice: vehicle.priceGHS,
        customerName: formData.name,
        email: formData.email,
        phone: formData.phone,
        idNumber: formData.idNumber
      });
      setBookingSuccess(true);
      setTimeout(() => {
        setIsBookingModalOpen(false);
        setBookingSuccess(false);
        setFormData({ name: '', email: '', phone: '', idNumber: '' });
      }, 3000);
    } catch (err) {
      alert('Error creating booking');
    } finally {
      setBookingLoading(false);
    }
  };

  if (!vehicle) return null;

  return (
    <div className="pt-24 bg-brand-black min-h-screen">
      {/* Navigation & Header */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-brand-silver/60 hover:text-brand-gold transition-colors text-xs uppercase tracking-widest font-bold mb-12"
        >
          <ChevronLeft size={16} />
          <span>Back to Fleet</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Gallery Side */}
          <div className="space-y-6">
            <div className="aspect-[16/10] overflow-hidden luxury-glass relative group">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  src={vehicle.images[activeImage]} 
                  alt={vehicle.name}
                  className="w-full h-full object-cover grayscale-[0.3]"
                />
              </AnimatePresence>
              
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 via-transparent to-transparent" />
              
              {vehicle.images.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => setActiveImage(prev => (prev === 0 ? vehicle.images.length - 1 : prev - 1))}
                    className="w-12 h-12 bg-brand-black/80 backdrop-blur-md flex items-center justify-center text-brand-white hover:text-brand-gold transition-all"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={() => setActiveImage(prev => (prev === vehicle.images.length - 1 ? 0 : prev + 1))}
                    className="w-12 h-12 bg-brand-black/80 backdrop-blur-md flex items-center justify-center text-brand-white hover:text-brand-gold transition-all"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-4 gap-4">
              {vehicle.images.map((img: string, idx: number) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-[16/10] overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-brand-gold' : 'border-transparent opacity-40 hover:opacity-100'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover grayscale" />
                </button>
              ))}
            </div>
          </div>

          {/* Info Side */}
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 bg-brand-gold text-brand-black text-[10px] font-bold uppercase tracking-widest">
                  {vehicle.condition}
                </span>
                <span className="text-brand-silver/40 text-[10px] uppercase tracking-widest font-bold">
                  Asset Protocol #{vehicle.id}
                </span>
              </div>
              
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-display font-medium text-brand-white">{vehicle.name}</h1>
                <p className="text-3xl text-brand-gold font-display font-bold">GH₵ {vehicle.priceGHS.toLocaleString()}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-brand-white/5">
                {[
                  { icon: Calendar, label: 'Year', value: vehicle.year },
                  { icon: Gauge, label: 'Mileage', value: `${vehicle.mileage.toLocaleString()} KM` },
                  { icon: Fuel, label: 'Fuel', value: vehicle.fuelType },
                  { icon: MapPin, label: 'Origin', value: vehicle.sourceCountry }
                ].map((spec, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center gap-2 text-brand-gold">
                      <spec.icon size={14} />
                      <span className="text-[9px] uppercase tracking-widest font-bold text-brand-white/30">{spec.label}</span>
                    </div>
                    <p className="text-sm font-display font-medium text-brand-white">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-xs uppercase tracking-[0.4em] font-bold text-brand-gold flex items-center gap-2">
                  <Info size={14} /> Description
                </h3>
                <p className="text-brand-silver/60 leading-relaxed italic">
                  "{vehicle.description}"
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs uppercase tracking-[0.4em] font-bold text-brand-gold flex items-center gap-2">
                  <Package size={14} /> Premium Features
                </h3>
                <div className="grid grid-cols-2 gap-y-3 gap-x-8">
                  {vehicle.selectedFeatures.map((f: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 text-xs text-brand-white/60">
                      <CheckCircle2 size={12} className="text-brand-gold" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setIsBookingModalOpen(true)}
                className="flex-1 btn-premium-filled py-4 flex items-center justify-center gap-3"
              >
                Establish Reservation
                <ArrowRight size={18} />
              </button>
              <a 
                href={`https://wa.me/233243145384?text=I am interested in the ${vehicle.name} (${vehicle.id})`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium px-8 flex items-center justify-center gap-3"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
            </div>

            <div className="flex items-center justify-center space-x-12 pt-8 border-t border-brand-white/5 opacity-40">
              <div className="flex flex-col items-center gap-2">
                <Shield size={24} className="text-brand-gold" />
                <span className="text-[8px] uppercase tracking-widest font-bold">Verified</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Globe size={24} className="text-brand-gold" />
                <span className="text-[8px] uppercase tracking-widest font-bold">Global Origin</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {isBookingModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBookingModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="relative w-full max-w-lg bg-brand-matte border border-brand-white/10 p-10"
            >
              <button onClick={() => setIsBookingModalOpen(false)} className="absolute top-6 right-6 text-brand-silver hover:text-brand-white">
                <X size={20} />
              </button>
              
              {bookingSuccess ? (
                <div className="py-20 text-center space-y-6">
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-500">
                    <CheckCircle2 size={40} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-display font-medium text-brand-white">Protocol Initiated</h3>
                    <p className="text-brand-silver/60 text-sm">Your reservation has been recorded. Our team will contact you shortly to finalize the acquisition.</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-2 mb-8">
                    <span className="text-brand-gold uppercase tracking-[0.3em] text-[10px] font-bold">Reservation Registry</span>
                    <h3 className="text-3xl font-display font-medium text-brand-white">Secure this Asset</h3>
                  </div>
                  <form className="space-y-6" onSubmit={handleBooking}>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Full Legal Name</label>
                      <input 
                        required
                        type="text" 
                        className="w-full bg-brand-white/5 border border-brand-white/5 py-4 px-4 text-xs tracking-widest uppercase focus:outline-none focus:border-brand-gold/50 transition-all"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Email</label>
                        <input 
                          required
                          type="email" 
                          className="w-full bg-brand-white/5 border border-brand-white/5 py-4 px-4 text-xs tracking-widest uppercase focus:outline-none focus:border-brand-gold/50 transition-all"
                          placeholder="email@protocol.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Phone</label>
                        <input 
                          required
                          type="tel" 
                          className="w-full bg-brand-white/5 border border-brand-white/5 py-4 px-4 text-xs tracking-widest uppercase focus:outline-none focus:border-brand-gold/50 transition-all"
                          placeholder="+233..."
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">ID / Passport Number</label>
                      <input 
                        required
                        type="text" 
                        className="w-full bg-brand-white/5 border border-brand-white/5 py-4 px-4 text-xs tracking-widest uppercase focus:outline-none focus:border-brand-gold/50 transition-all"
                        placeholder="GHA-..."
                        value={formData.idNumber}
                        onChange={(e) => setFormData({...formData, idNumber: e.target.value})}
                      />
                    </div>
                    <button 
                      type="submit" 
                      disabled={bookingLoading}
                      className="w-full btn-premium-filled py-4 flex items-center justify-center gap-3"
                    >
                      {bookingLoading ? 'Processing Protocol...' : 'Confirm Reservation'}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
