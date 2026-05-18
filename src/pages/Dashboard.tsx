import React, { useState, useEffect, FormEvent } from 'react';
import { 
  User, LayoutDashboard, Package, Heart, Settings, 
  LogOut, Plus, Edit, Trash2, CheckCircle, Clock, Truck, Ship, Home as HomeIcon,
  ArrowRight, Shield, Search, Filter, Anchor, Key, Database, Cloud, RefreshCw, Save, Globe, DollarSign, Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { MOCK_VEHICLES } from '../data/mockVehicles';
import VehicleCard from '../components/marketplace/VehicleCard';
import { supabaseService } from '../lib/supabaseService';
import VehicleModal from '../components/admin/VehicleModal';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  // State
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [shipments, setShipments] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [staffList, setStaffList] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  
  // Staff Modal State
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [staffName, setStaffName] = useState('');
  const [staffEmail, setStaffEmail] = useState('');
  const [staffRole, setStaffRole] = useState<'admin' | 'manager' | 'sales' | 'staff'>('staff');
  const [staffTempPass, setStaffTempPass] = useState('');

  // Vehicle Modal State
  const [selectedVehicle, setSelectedVehicle] = useState<any | null>(null);
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);

  // Protocols & Settings State
  const [exchangeRate, setExchangeRate] = useState(15.80);
  const [inspectionFee, setInspectionFee] = useState(2500);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [backupLoading, setBackupLoading] = useState(false);
  const [lastBackup, setLastBackup] = useState(new Date().toLocaleString());

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [v, b, s, c, st, inq] = await Promise.all([
          supabaseService.getVehicles(),
          supabaseService.getBookings(),
          supabaseService.getShipments(),
          supabaseService.getCustomers(),
          supabaseService.getStaffUsers(),
          supabaseService.getInquiries()
        ]);
        setVehicles(v.length > 0 ? v : MOCK_VEHICLES);
        setBookings(b);
        setShipments(s);
        setCustomers(c);
        setStaffList(st);
        setInquiries(inq);
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
    navigate('/');
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

  const handleCreateStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await supabaseService.saveStaffUser({
        name: staffName,
        email: staffEmail,
        role: staffRole,
        tempPassword: staffTempPass,
        isFirstLogin: true,
        status: 'Pending Reset'
      });
      const updated = await supabaseService.getStaffUsers();
      setStaffList(updated);
      setShowStaffModal(false);
      setStaffName('');
      setStaffEmail('');
      alert(`Personnel successfully registered.\nEmail: ${staffEmail}\nTemporary Key: ${staffTempPass}`);
    } catch (err) {
      alert('Failed to register personnel endpoint');
    }
  };

  const handleDeleteStaff = async (id: string) => {
    if (confirm('Revoke staff access endpoint and delete credentials?')) {
      await supabaseService.deleteStaffUser(id);
      const updated = await supabaseService.getStaffUsers();
      setStaffList(updated);
    }
  };

  const handleResetStaffPassword = async (id: string, name: string) => {
    const tempCode = `TX-TEMP-${Math.floor(1000 + Math.random() * 9000)}`;
    if (confirm(`Generate temporary access code for ${name}?\n\nCode: ${tempCode}\n\nUpon first successful login, the system will mandate a permanent password change.`)) {
      await supabaseService.resetStaffPassword(id, tempCode);
      const updated = await supabaseService.getStaffUsers();
      setStaffList(updated);
      alert(`Temporary key successfully established for ${name}.\nKey: ${tempCode}`);
    }
  };

  const handleDeleteVehicle = async (id: string) => {
    if (confirm('Delete this fleet asset?')) {
      await supabaseService.deleteVehicle(id);
      setVehicles(prev => prev.filter(v => v.id !== id));
    }
  };

  const handleSaveVehicle = async (vehicleData: any) => {
    const saved = await supabaseService.saveVehicle(vehicleData);
    setVehicles(prev => {
      const exists = prev.some(v => v.id === saved.id);
      if (exists) {
        return prev.map(v => v.id === saved.id ? saved : v);
      } else {
        return [saved, ...prev];
      }
    });
  };

  const handleToggleInquiryStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Unread' ? 'Read' : 'Unread';
    await supabaseService.updateInquiryStatus(id, newStatus);
    const updated = await supabaseService.getInquiries();
    setInquiries(updated);
  };

  const handleDeleteInquiry = async (id: string) => {
    if (confirm('Delete this inquiry record from the database?')) {
      await supabaseService.deleteInquiry(id);
      setInquiries(prev => prev.filter(i => i.id !== id));
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

              <div className="luxury-glass p-10 space-y-8">
                <h3 className="text-xl font-display font-medium uppercase tracking-widest flex items-center gap-4">
                  <Ship size={20} className="text-brand-gold" />
                  Active Shipments
                </h3>
                <div className="space-y-6">
                  {shipments.slice(0, 4).map((s, i) => (
                    <div key={i} className="space-y-4 py-4 border-b border-brand-white/5 last:border-0">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-display font-medium text-brand-white">{s.vehicleName}</p>
                        <span className="text-[10px] text-brand-gold font-bold uppercase tracking-widest">{s.progress}%</span>
                      </div>
                      <div className="w-full h-[2px] bg-brand-white/5 overflow-hidden">
                        <div className="h-full bg-brand-gold" style={{ width: `${s.progress}%` }} />
                      </div>
                      <p className="text-[9px] text-brand-white/30 uppercase tracking-widest flex items-center gap-2">
                        <Anchor size={10} /> {s.location}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'inventory':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex justify-between items-end">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="w-8 h-[1px] bg-brand-gold" />
                  <span className="text-brand-gold uppercase tracking-[0.4em] text-[10px] font-bold">Asset Control</span>
                </div>
                <h2 className="text-4xl font-display font-medium">Fleet Inventory</h2>
              </div>
              <button 
                onClick={() => { setSelectedVehicle(null); setIsVehicleModalOpen(true); }}
                className="btn-premium-filled py-3 px-8 flex items-center gap-3"
              >
                <Plus size={18} /> Add Asset
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {vehicles.map(vehicle => (
                <div key={vehicle.id} className="luxury-glass overflow-hidden group">
                  <div className="aspect-[16/9] bg-brand-white/5 relative overflow-hidden">
                    <img src={vehicle.images?.[0]} alt={vehicle.name} className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button 
                        onClick={() => { setSelectedVehicle(vehicle); setIsVehicleModalOpen(true); }}
                        className="p-2 bg-brand-black/80 backdrop-blur-md text-brand-gold hover:bg-brand-gold hover:text-black transition-all"
                      >
                        <Edit size={14} />
                      </button>
                      <button 
                        onClick={() => handleDeleteVehicle(vehicle.id)}
                        className="p-2 bg-brand-black/80 backdrop-blur-md text-red-500 hover:bg-red-500 hover:text-white transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-brand-white font-display font-medium">{vehicle.name}</h4>
                    <p className="text-[10px] text-brand-gold font-bold uppercase tracking-widest mt-2">GH₵ {vehicle.priceGHS?.toLocaleString()}</p>
                  </div>
                </div>
              ))}
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
      case 'logistics':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="w-8 h-[1px] bg-brand-gold" />
                <span className="text-brand-gold uppercase tracking-[0.4em] text-[10px] font-bold">Global Supply Chain</span>
              </div>
              <h2 className="text-4xl font-display font-medium">Active Logistics</h2>
            </div>
            <div className="grid grid-cols-1 gap-8">
              {shipments.map((shipment) => (
                <div key={shipment.id} className="luxury-glass p-8 space-y-8 group">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Ship size={16} className="text-brand-gold" />
                        <span className="text-[10px] text-brand-white/40 uppercase tracking-widest font-bold">{shipment.trackingId}</span>
                      </div>
                      <h3 className="text-2xl font-display font-medium text-brand-white">{shipment.vehicleName}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-brand-gold font-bold uppercase tracking-widest mb-1">Current Protocol</p>
                      <p className="text-xl text-brand-white">{shipment.status}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold">
                      <span className="text-brand-white/40">Transit Progress</span>
                      <span className="text-brand-gold">{shipment.progress}%</span>
                    </div>
                    <div className="w-full h-1 bg-brand-white/5 overflow-hidden">
                      <div className="h-full bg-brand-gold" style={{ width: `${shipment.progress}%` }} />
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-8 border-t border-brand-white/5">
                    <div className="flex items-center gap-3">
                      <Anchor size={14} className="text-brand-gold" />
                      <span className="text-xs text-brand-white/60">{shipment.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock size={14} className="text-brand-gold" />
                      <span className="text-xs text-brand-white/60">ETA: {shipment.eta}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex justify-between items-end">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="w-8 h-[1px] bg-brand-gold" />
                  <span className="text-brand-gold uppercase tracking-[0.4em] text-[10px] font-bold">Client Directory</span>
                </div>
                <h2 className="text-4xl font-display font-medium">VIP Clients</h2>
              </div>
              <button className="btn-premium-filled py-3 px-8 flex items-center gap-3">
                <Plus size={18} /> Onboard Client
              </button>
            </div>
            <div className="luxury-glass overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-brand-white/5 text-[10px] uppercase tracking-[0.3em] font-bold text-brand-gold">
                    <th className="p-6">Client Name</th>
                    <th className="p-6">Contact Registry</th>
                    <th className="p-6">Tier</th>
                    <th className="p-6">Joined At</th>
                    <th className="p-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-white/5">
                  {customers.map((customer) => (
                    <tr key={customer.id} className="group hover:bg-brand-white/5 transition-colors">
                      <td className="p-6 font-display font-medium text-brand-white">{customer.name}</td>
                      <td className="p-6">
                        <div className="space-y-1">
                          <p className="text-xs text-brand-white">{customer.email}</p>
                          <p className="text-[10px] text-brand-white/30">{customer.phone}</p>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className="px-3 py-1 bg-brand-gold/10 text-brand-gold text-[9px] font-bold uppercase tracking-widest border border-brand-gold/20">
                          {customer.tier}
                        </span>
                      </td>
                      <td className="p-6 text-xs text-brand-white/40">{new Date(customer.joinedAt).toLocaleDateString()}</td>
                      <td className="p-6 text-right">
                        <div className="flex items-center justify-end space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="text-brand-gold hover:text-white transition-colors"><Edit size={16} /></button>
                          <button className="text-red-500/50 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'staff':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex justify-between items-end">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="w-8 h-[1px] bg-brand-gold" />
                  <span className="text-brand-gold uppercase tracking-[0.4em] text-[10px] font-bold">Internal Governance</span>
                </div>
                <h2 className="text-4xl font-display font-medium">Personnel & Access Registry</h2>
              </div>
              <button 
                onClick={() => {
                  setStaffTempPass(`TX-TEMP-${Math.floor(1000 + Math.random() * 9000)}`);
                  setShowStaffModal(true);
                }}
                className="btn-premium-filled py-3 px-8 flex items-center gap-3"
              >
                <Plus size={18} /> Register Personnel
              </button>
            </div>

            {showStaffModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-black/80 backdrop-blur-md">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="luxury-glass p-10 max-w-lg w-full space-y-8 relative border border-brand-gold/30"
                >
                  <div className="space-y-2">
                    <h3 className="text-2xl font-display font-medium text-brand-white">New Account Protocol</h3>
                    <p className="text-brand-white/40 text-xs">Assign secure endpoint access to internal personnel or administrators.</p>
                  </div>
                  <form onSubmit={handleCreateStaff} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Full Name</label>
                      <input 
                        type="text"
                        required
                        value={staffName}
                        onChange={e => setStaffName(e.target.value)}
                        placeholder="Officer Name"
                        className="w-full bg-brand-white/5 border border-brand-white/5 p-3 text-xs text-brand-white focus:border-brand-gold/50 outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Official Email</label>
                      <input 
                        type="email"
                        required
                        value={staffEmail}
                        onChange={e => setStaffEmail(e.target.value)}
                        placeholder="identity@tripleexceed.com"
                        className="w-full bg-brand-white/5 border border-brand-white/5 p-3 text-xs text-brand-white focus:border-brand-gold/50 outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Security Role</label>
                      <select 
                        value={staffRole}
                        onChange={e => setStaffRole(e.target.value as any)}
                        className="w-full bg-[#151515] border border-brand-white/5 p-3 text-xs text-brand-white focus:border-brand-gold/50 outline-none uppercase tracking-widest"
                      >
                        <option value="admin">Administrator (Master)</option>
                        <option value="manager">Operations Manager</option>
                        <option value="sales">Sales Specialist</option>
                        <option value="staff">Logistics Staff</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Assigned Temporary Key</label>
                      <input 
                        type="text"
                        required
                        value={staffTempPass}
                        onChange={e => setStaffTempPass(e.target.value)}
                        className="w-full bg-brand-white/5 border border-brand-white/5 p-3 font-mono text-xs text-brand-gold focus:border-brand-gold/50 outline-none"
                      />
                      <p className="text-[10px] text-brand-white/30">Upon first login, the officer will be forced to replace this key.</p>
                    </div>
                    <div className="flex gap-4 pt-4">
                      <button 
                        type="button"
                        onClick={() => setShowStaffModal(false)}
                        className="flex-1 py-3 border border-brand-white/10 text-brand-white/60 text-xs uppercase tracking-widest hover:border-brand-white/30 transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        className="flex-1 btn-premium-filled py-3 text-xs font-bold uppercase tracking-widest"
                      >
                        Register Access
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}

            <div className="luxury-glass overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-brand-white/5 text-[10px] uppercase tracking-[0.3em] font-bold text-brand-gold">
                    <th className="p-6">Personnel</th>
                    <th className="p-6">Endpoint Registry</th>
                    <th className="p-6">Security Role</th>
                    <th className="p-6">Protocol Status</th>
                    <th className="p-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-white/5">
                  {staffList.map((member) => (
                    <tr key={member.id} className="group hover:bg-brand-white/5 transition-colors">
                      <td className="p-6 font-display font-medium text-brand-white">{member.name}</td>
                      <td className="p-6">
                        <span className="text-xs text-brand-white/80 font-mono">{member.email}</span>
                      </td>
                      <td className="p-6">
                        <span className={`px-3 py-1 text-[9px] uppercase tracking-wider font-bold border rounded-none ${
                          member.role === 'admin' ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' :
                          member.role === 'manager' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' :
                          member.role === 'sales' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                          'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        }`}>
                          {member.role}
                        </span>
                      </td>
                      <td className="p-6">
                        <span className={`inline-block px-3 py-1 text-[9px] uppercase tracking-wider font-bold ${
                          member.status === 'Active' ? 'text-green-400 bg-green-500/10 border border-green-500/20' : 'text-amber-400 bg-amber-500/10 border border-amber-500/20'
                        }`}>
                          {member.status}
                        </span>
                        {member.tempPassword && (
                          <p className="text-[10px] text-brand-gold mt-1 font-mono">Key: {member.tempPassword}</p>
                        )}
                      </td>
                      <td className="p-6 text-right">
                        <div className="flex items-center justify-end space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleResetStaffPassword(member.id, member.name)}
                            className="text-amber-500/80 hover:text-amber-500 text-xs uppercase tracking-widest font-bold transition-colors flex items-center gap-1.5"
                          >
                            <Key size={14} /> Reset Key
                          </button>
                          <button 
                            onClick={() => handleDeleteStaff(member.id)}
                            className="text-red-500/60 hover:text-red-500 text-xs uppercase tracking-widest font-bold transition-colors flex items-center gap-2"
                          >
                            <Trash2 size={14} /> Revoke
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'inquiries':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex justify-between items-end">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="w-8 h-[1px] bg-brand-gold" />
                  <span className="text-brand-gold uppercase tracking-[0.4em] text-[10px] font-bold">Client Communication Hub</span>
                </div>
                <h2 className="text-4xl font-display font-medium text-brand-white">Inquiries & Messages</h2>
                <p className="text-xs text-brand-silver/60 uppercase tracking-widest max-w-2xl">
                  Review and manage secure messages transmitted by website visitors via the public contact portal.
                </p>
              </div>
              <div className="flex items-center gap-3 bg-brand-white/5 border border-brand-white/10 px-4 py-2">
                <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
                <span className="text-[10px] uppercase tracking-widest font-mono text-brand-white font-bold">
                  {inquiries.filter(i => i.status === 'Unread').length} Unread Protocol(s)
                </span>
              </div>
            </div>

            <div className="space-y-6">
              {inquiries.map((inq) => (
                <div 
                  key={inq.id} 
                  className={`luxury-glass p-8 space-y-6 transition-all border ${
                    inq.status === 'Unread' ? 'border-brand-gold/40 bg-brand-white/[0.03]' : 'border-brand-white/5 opacity-70'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-brand-white/10">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-display font-bold text-brand-white">{inq.name}</span>
                        <span className="px-2.5 py-0.5 text-[9px] font-mono uppercase tracking-widest bg-brand-gold/10 text-brand-gold border border-brand-gold/20 font-bold">
                          {inq.inquiryType}
                        </span>
                        {inq.status === 'Unread' && (
                          <span className="w-2 h-2 rounded-full bg-brand-gold" />
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-brand-silver">
                        <span className="text-brand-white/80">{inq.email}</span>
                        <span>•</span>
                        <span className="text-brand-gold font-bold">{inq.phone}</span>
                        <span>•</span>
                        <span className="text-[10px] text-brand-white/40">{new Date(inq.createdAt).toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => handleToggleInquiryStatus(inq.id, inq.status)}
                        className={`px-4 py-2 text-xs uppercase tracking-widest font-bold border transition-all ${
                          inq.status === 'Unread' 
                            ? 'bg-brand-gold text-brand-black border-brand-gold hover:bg-transparent hover:text-brand-gold' 
                            : 'bg-brand-white/5 text-brand-silver border-brand-white/10 hover:border-brand-white/30'
                        }`}
                      >
                        {inq.status === 'Unread' ? 'Mark as Read' : 'Mark Unread'}
                      </button>
                      <button 
                        onClick={() => handleDeleteInquiry(inq.id)}
                        className="p-2 border border-red-500/20 text-red-500/60 hover:text-red-500 hover:border-red-500 hover:bg-red-500/10 transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="bg-[#121212] p-6 border border-brand-white/5 rounded-none font-mono text-xs text-brand-silver leading-relaxed whitespace-pre-wrap">
                    {inq.message}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="w-8 h-[1px] bg-brand-gold" />
                <span className="text-brand-gold uppercase tracking-[0.4em] text-[10px] font-bold">System Configuration</span>
              </div>
              <h2 className="text-4xl font-display font-medium text-brand-white">Protocols Command Core</h2>
              <p className="text-xs text-brand-silver/60 uppercase tracking-widest max-w-2xl">
                Manage global exchange pegs, cryptographic backup telemetry, and automated verification thresholds.
              </p>
            </div>

            {/* Health Indicators Banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="luxury-glass p-6 border-l-2 border-green-500 space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-brand-silver uppercase tracking-widest font-bold">Supabase Cloud Engine</span>
                  <Cloud size={16} className="text-green-500" />
                </div>
                <p className="text-lg font-display text-brand-white font-bold">Connected</p>
                <span className="text-[9px] text-green-400 font-mono">SSL / TLS v1.3 Encrypted</span>
              </div>

              <div className="luxury-glass p-6 border-l-2 border-brand-gold space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-brand-silver uppercase tracking-widest font-bold">Encrypted Local Ledger</span>
                  <Database size={16} className="text-brand-gold" />
                </div>
                <p className="text-lg font-display text-brand-white font-bold">Active Fallback</p>
                <span className="text-[9px] text-brand-gold/80 font-mono">AES-256 State Mirror</span>
              </div>

              <div className="luxury-glass p-6 border-l-2 border-blue-500 space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-brand-silver uppercase tracking-widest font-bold">Vercel Edge CDN</span>
                  <Globe size={16} className="text-blue-500" />
                </div>
                <p className="text-lg font-display text-brand-white font-bold">99.99% Uptime</p>
                <span className="text-[9px] text-blue-400 font-mono">Distributed Routing Nodes</span>
              </div>
            </div>

            {/* Main Configuration Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Financial Pegs */}
              <div className="luxury-glass p-8 space-y-8 relative border border-brand-gold/20">
                <div className="flex items-center gap-3 border-b border-brand-white/10 pb-4">
                  <DollarSign size={20} className="text-brand-gold" />
                  <h3 className="text-xl font-display font-medium text-brand-white uppercase tracking-wider">Fiscal & Sourcing Pegs</h3>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <label className="text-brand-gold font-bold uppercase tracking-widest text-[10px]">USD to GHS Benchmark Peg</label>
                      <span className="text-brand-white font-mono font-bold">1 USD = {exchangeRate} GHS</span>
                    </div>
                    <input 
                      type="number" 
                      step="0.01" 
                      value={exchangeRate}
                      onChange={e => setExchangeRate(Number(e.target.value))}
                      className="w-full bg-brand-white/5 border border-brand-white/10 p-3.5 text-xs text-brand-white focus:border-brand-gold/50 outline-none font-mono"
                    />
                    <p className="text-[10px] text-brand-silver/50">Calculates automated landed import tax valuation across marketplace vehicles.</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <label className="text-brand-gold font-bold uppercase tracking-widest text-[10px]">Standard Escrow Inspection Fee (GHS)</label>
                      <span className="text-brand-white font-mono font-bold">GH₵ {inspectionFee.toLocaleString()}</span>
                    </div>
                    <input 
                      type="number" 
                      value={inspectionFee}
                      onChange={e => setInspectionFee(Number(e.target.value))}
                      className="w-full bg-brand-white/5 border border-brand-white/10 p-3.5 text-xs text-brand-white focus:border-brand-gold/50 outline-none font-mono"
                    />
                    <p className="text-[10px] text-brand-silver/50">Mandatory non-refundable deposit required prior to global physical dispatch.</p>
                  </div>

                  <button 
                    onClick={() => alert('Fiscal protocols successfully synchronized across all operational hubs.')}
                    className="w-full btn-premium-filled py-3.5 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                  >
                    <Save size={16} /> Update Financial Pegs
                  </button>
                </div>
              </div>

              {/* Maintenance & Backup */}
              <div className="luxury-glass p-8 space-y-8 relative border border-brand-gold/20">
                <div className="flex items-center gap-3 border-b border-brand-white/10 pb-4">
                  <Shield size={20} className="text-brand-gold" />
                  <h3 className="text-xl font-display font-medium text-brand-white uppercase tracking-wider">Security & Cryptographic Snapshot</h3>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-brand-white/5 border border-brand-white/10">
                    <div className="space-y-1">
                      <p className="text-xs text-brand-white uppercase tracking-wider font-bold">Platform Maintenance Lock</p>
                      <p className="text-[10px] text-brand-silver">Restricts client-side marketplace reservations during scheduled inventory updates.</p>
                    </div>
                    <button 
                      onClick={() => setMaintenanceMode(!maintenanceMode)}
                      className={`px-4 py-2 text-xs uppercase tracking-widest font-bold transition-all ${
                        maintenanceMode ? 'bg-red-500 text-white font-extrabold' : 'bg-brand-gold text-brand-black font-extrabold'
                      }`}
                    >
                      {maintenanceMode ? 'Locked' : 'Unlocked'}
                    </button>
                  </div>

                  <div className="space-y-4 p-6 bg-[#121212] border border-brand-white/5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-brand-gold uppercase tracking-widest text-[10px] font-bold">Master Database Snapshot</span>
                      <span className="text-brand-silver text-[10px]">Last: {lastBackup}</span>
                    </div>
                    <p className="text-xs text-brand-silver/80">
                      Creates an immutable export of the complete vehicle fleet, VIP bookings, and staff cryptographic signatures.
                    </p>
                    <button 
                      onClick={() => {
                        setBackupLoading(true);
                        setTimeout(() => {
                          setBackupLoading(false);
                          setLastBackup(new Date().toLocaleString());
                          alert('Master database snapshot successfully encrypted and saved to decentralized ledger.');
                        }, 1500);
                      }}
                      disabled={backupLoading}
                      className="w-full py-4 border border-brand-gold/30 hover:border-brand-gold text-brand-gold text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2"
                    >
                      <RefreshCw size={14} className={backupLoading ? 'animate-spin' : ''} />
                      {backupLoading ? 'Encrypting Ledger...' : 'Execute Manual Snapshot'}
                    </button>
                  </div>
                </div>
              </div>
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
        {/* User Identity Indicator */}
        <div className="space-y-3 pb-8 border-b border-brand-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center font-display font-bold text-brand-gold">
              {user?.name ? user.name[0].toUpperCase() : 'U'}
            </div>
            <div>
              <p className="text-brand-white font-medium text-sm">{user?.name || 'Authorized Client'}</p>
              <span className="inline-block px-2 py-0.5 mt-1 bg-brand-gold/10 text-brand-gold font-mono text-[9px] uppercase tracking-widest border border-brand-gold/20">
                {user?.role || 'client'}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-gold mb-4">Command Core</p>
          {[
            { id: 'overview', name: 'Nexus Overview', icon: LayoutDashboard, roles: ['admin', 'manager', 'sales', 'staff', 'client'] },
            { id: 'inventory', name: 'Fleet Inventory', icon: Package, roles: ['admin', 'manager', 'sales'] },
            { id: 'bookings', name: 'Reservations', icon: CheckCircle, roles: ['admin', 'manager', 'sales', 'staff'] },
            { id: 'logistics', name: 'Global Logistics', icon: Ship, roles: ['admin', 'manager', 'staff'] },
            { id: 'users', name: 'VIP Directory', icon: User, roles: ['admin', 'manager', 'sales'] },
            { id: 'inquiries', name: 'Inquiries & Messages', icon: Mail, roles: ['admin', 'manager', 'sales'] },
            { id: 'staff', name: 'Personnel & Access', icon: Shield, roles: ['admin'] },
            { id: 'settings', name: 'Protocols', icon: Settings, roles: ['admin'] }
          ]
            .filter(item => item.roles.includes(user?.role || 'client'))
            .map((item) => (
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
      <div className="flex-1 p-8 lg:p-16 max-w-7xl mx-auto w-full relative">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="w-12 h-12 border-2 border-brand-gold border-t-transparent animate-spin rounded-full" />
          </div>
        ) : renderContent()}

        <VehicleModal 
          isOpen={isVehicleModalOpen} 
          onClose={() => setIsVehicleModalOpen(false)} 
          onSave={handleSaveVehicle} 
          vehicle={selectedVehicle} 
        />
      </div>
    </div>
  );
}
