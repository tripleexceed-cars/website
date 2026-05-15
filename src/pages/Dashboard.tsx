import { useState, useEffect, FormEvent } from 'react';
import { 
  User, LayoutDashboard, Package, Heart, Settings, 
  LogOut, Plus, Edit, Trash2, CheckCircle, Clock, Truck, Ship, Home as HomeIcon,
  ArrowRight, Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { MOCK_VEHICLES } from '../data/mockVehicles';
import VehicleCard from '../components/marketplace/VehicleCard';
import { supabaseService } from '../lib/supabaseService';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  // State
  const [vehicles, setVehicles] = useState(MOCK_VEHICLES);
  const [bookings, setBookings] = useState<any[]>([]);
  const [shipments, setShipments] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [b, s, c] = await Promise.all([
          supabaseService.getBookings(),
          supabaseService.getShipments(),
          supabaseService.getCustomers()
        ]);
        setBookings(b);
        setShipments(s);
        setCustomers(c);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  const handleApproveBooking = async (id: string) => {
    try {
      const booking = bookings.find(b => b.id === id);
      if (!booking) return;

      await supabaseService.updateBookingStatus(id, 'Confirmed');
      
      // Auto-generate shipment
      await supabaseService.createShipment({
        trackingId: `TE-${Math.floor(100000 + Math.random() * 900000)}`,
        vehicleName: booking.vehicleName,
        customerEmail: booking.email,
        status: 'In Transit',
        location: 'Port of Origin',
        progress: 10,
        eta: '24 Days'
      });

      // Refresh data
      const [newB, newS] = await Promise.all([
        supabaseService.getBookings(),
        supabaseService.getShipments()
      ]);
      setBookings(newB);
      setShipments(newS);
    } catch (err) {
      alert('Error approving booking');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="w-8 h-[1px] bg-brand-gold" />
                <span className="text-brand-gold uppercase tracking-[0.4em] text-[10px] font-bold">Operational Nexus</span>
              </div>
              <h2 className="text-4xl font-display font-medium">System Overview</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { label: 'Active Fleet', value: vehicles.length, icon: Package, trend: '+2 this week' },
                { label: 'Confirmed Bookings', value: bookings.filter(b => b.status === 'Confirmed').length, icon: CheckCircle, trend: 'High Priority' },
                { label: 'In Transit', value: shipments.length, icon: Ship, trend: 'Global Tracking Active' },
                { label: 'VIP Clients', value: customers.length, icon: User, trend: 'Premium Growth' }
              ].map((stat, i) => (
                <div key={i} className="luxury-glass p-8 space-y-4 group hover:border-brand-gold/30 transition-all">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                      <stat.icon size={24} />
                    </div>
                    <span className="text-[10px] text-brand-gold font-bold uppercase tracking-widest">{stat.trend}</span>
                  </div>
                  <div>
                    <h4 className="text-brand-white/40 text-[10px] uppercase tracking-[0.3em] font-bold">{stat.label}</h4>
                    <p className="text-4xl font-display font-medium text-brand-white mt-1">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
              <div className="luxury-glass p-10 space-y-8">
                <h3 className="text-xl font-display font-medium uppercase tracking-widest flex items-center gap-4">
                  <Shield size={20} className="text-brand-gold" />
                  Protocol Queue
                </h3>
                <div className="space-y-6">
                  {bookings.slice(0, 4).map((b, i) => (
                    <div key={i} className="flex justify-between items-center py-4 border-b border-brand-white/5 last:border-0 group">
                      <div className="space-y-1">
                        <p className="text-sm font-display font-medium text-brand-white group-hover:text-brand-gold transition-colors">{b.vehicleName}</p>
                        <p className="text-[10px] text-brand-white/30 uppercase tracking-widest">{b.customerName} | {b.id}</p>
                      </div>
                      <span className={`px-3 py-1 text-[9px] uppercase tracking-tighter font-bold ${b.status === 'Confirmed' ? 'bg-green-500/10 text-green-500' : 'bg-brand-gold/10 text-brand-gold'}`}>
                        {b.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'bookings':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4">
             <div className="flex justify-between items-end">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="w-8 h-[1px] bg-brand-gold" />
                  <span className="text-brand-gold uppercase tracking-[0.4em] text-[10px] font-bold">Sales Governance</span>
                </div>
                <h2 className="text-4xl font-display font-medium">Vehicle Reservations</h2>
              </div>
            </div>

            <div className="luxury-glass overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-brand-white/5 text-[10px] uppercase tracking-[0.3em] font-bold text-brand-gold">
                    <th className="p-6">Protocol ID</th>
                    <th className="p-6">Asset</th>
                    <th className="p-6">Client</th>
                    <th className="p-6">Valuation</th>
                    <th className="p-6">Status</th>
                    <th className="p-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-white/5">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="group hover:bg-brand-white/5 transition-colors">
                      <td className="p-6 text-xs font-mono text-brand-white/60">{booking.id}</td>
                      <td className="p-6 font-display font-medium text-brand-white">{booking.vehicleName}</td>
                      <td className="p-6">
                        <div className="space-y-1">
                          <p className="text-xs text-brand-white">{booking.customerName}</p>
                          <p className="text-[10px] text-brand-white/30">{booking.email}</p>
                        </div>
                      </td>
                      <td className="p-6 text-sm font-display text-brand-gold">GH₵ {booking.vehiclePrice?.toLocaleString()}</td>
                      <td className="p-6">
                        <span className={`px-3 py-1 text-[9px] uppercase tracking-tighter font-bold ${booking.status === 'Confirmed' ? 'bg-green-500/10 text-green-500' : 'bg-brand-gold/10 text-brand-gold'}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="p-6 text-right">
                        <div className="flex items-center justify-end space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          {booking.status !== 'Confirmed' && (
                            <button 
                              onClick={() => handleApproveBooking(booking.id)}
                              className="text-[9px] uppercase tracking-widest font-bold bg-green-500/10 text-green-500 px-3 py-1 border border-green-500/20 hover:bg-green-500/20 transition-all"
                            >
                              Approve
                            </button>
                          )}
                          <button className="text-[9px] uppercase tracking-widest font-bold text-red-500/50 hover:text-red-500 transition-all">Void</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      default:
        return <div className="py-20 text-center text-brand-white/20">Module Under Configuration</div>;
    }
  };

  return (
    <div className="min-h-screen bg-brand-black pt-24 pb-12 flex">
      {/* Sidebar */}
      <div className="w-72 border-r border-brand-white/10 hidden lg:flex flex-col p-8 space-y-12">
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-gold mb-4">Command Core</p>
          {[
            { id: 'overview', name: 'Nexus Overview', icon: LayoutDashboard },
            { id: 'inventory', name: 'Fleet Inventory', icon: Package },
            { id: 'bookings', name: 'Reservations', icon: CheckCircle },
            { id: 'logistics', name: 'Global Logistics', icon: Ship },
            { id: 'users', name: 'VIP Directory', icon: User },
            { id: 'settings', name: 'Protocols', icon: Settings }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-4 px-4 py-3 text-xs uppercase tracking-widest transition-all ${
                activeTab === item.id ? 'bg-brand-gold text-brand-black font-bold' : 'text-brand-silver hover:bg-brand-white/5'
              }`}
            >
              <item.icon size={16} />
              <span>{item.name}</span>
            </button>
          ))}
        </div>

        <div className="mt-auto pt-8 border-t border-brand-white/5">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-4 px-4 py-3 text-xs uppercase tracking-widest text-red-500/60 hover:text-red-500 transition-colors w-full"
          >
            <LogOut size={16} />
            <span>Terminate Session</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 lg:p-16 max-w-7xl mx-auto w-full">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="w-12 h-12 border-2 border-brand-gold border-t-transparent animate-spin rounded-full" />
          </div>
        ) : renderContent()}
      </div>
    </div>
  );
}
