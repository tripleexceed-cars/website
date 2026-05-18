import { supabase } from './supabase';
import { MOCK_VEHICLES } from '../data/mockVehicles';

const MOCK_INQUIRIES = [
  {
    id: 'INQ-101',
    name: 'Osei Kwame',
    email: 'osei.kwame@gmail.com',
    phone: '+233 24 458 1923',
    inquiryType: 'VIP Fleet Consultation',
    message: 'Looking to acquire two 2025 Mercedes-Maybach GLS 600 units with armored specs for corporate transit.',
    status: 'Unread',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: 'INQ-102',
    name: 'Amina Alhassan',
    email: 'amina@danquahgroup.com',
    phone: '+233 50 129 4833',
    inquiryType: 'Logistics Inquiry',
    message: 'What is the estimated maritime transit window and landed customs duty for a 2024 Porsche 911 GT3 RS from Bremerhaven?',
    status: 'Read',
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString()
  }
];

const MOCK_SHIPMENTS = [
  {
    id: 'SHP-101',
    trackingId: 'TE-884192',
    vehicleName: '2025 Mercedes-AMG G63 Grand Edition',
    status: 'Customs Clearance',
    location: 'Port of Tema, Ghana',
    progress: 85,
    customerEmail: 'osei.kwame@gmail.com',
    eta: '3 Days'
  },
  {
    id: 'SHP-102',
    trackingId: 'TE-491028',
    vehicleName: '2024 Rolls-Royce Spectre Fully Bespoke',
    status: 'Maritime Transit (Atlantic Hub)',
    location: 'Coordinates 24.5N, 45.1W',
    progress: 45,
    customerEmail: 'lord.danquah@luxury.com',
    eta: '14 Days'
  }
];

const mapInquiry = (i: any) => ({
  id: i.id,
  name: i.name,
  email: i.email,
  phone: i.phone,
  inquiryType: i.inquiry_type,
  message: i.message,
  status: i.status,
  createdAt: i.created_at
});

const mapBooking = (b: any) => ({
  id: b.id,
  vehicleName: b.vehicle_name,
  vehiclePrice: b.vehicle_price,
  customerName: b.customer_name,
  email: b.email,
  phone: b.phone,
  idNumber: b.id_number,
  status: b.status,
  created_at: b.created_at
});

const mapShipment = (s: any) => ({
  id: s.id,
  trackingId: s.tracking_id,
  vehicleName: s.vehicle_name,
  status: s.status,
  location: s.location,
  progress: s.progress,
  customerEmail: s.customer_email,
  eta: s.eta
});

const mapCustomer = (c: any) => ({
  id: c.id,
  name: c.name,
  email: c.email,
  phone: c.phone,
  tier: c.tier,
  joinedAt: c.created_at
});

export const supabaseService = {
  // Vehicles
  async getVehicles() {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data;
    } catch (_) {}

    const local = localStorage.getItem('te_vehicles_db');
    if (!local) {
      localStorage.setItem('te_vehicles_db', JSON.stringify(MOCK_VEHICLES));
      return MOCK_VEHICLES;
    }
    return JSON.parse(local);
  },

  async saveVehicle(vehicle: any) {
    const list = await this.getVehicles();
    const isNew = !vehicle.id;
    const vId = vehicle.id || `TE-VEH-${Date.now()}`;
    const payload = {
      ...vehicle,
      id: vId,
      images: Array.isArray(vehicle.images) ? vehicle.images : [vehicle.images || 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=1200'],
      priceGHS: Number(vehicle.priceGHS) || 0,
      year: Number(vehicle.year) || 2026,
      created_at: vehicle.created_at || new Date().toISOString()
    };

    let updatedList;
    if (isNew) {
      updatedList = [payload, ...list];
    } else {
      updatedList = list.map((v: any) => v.id === vehicle.id ? { ...v, ...payload } : v);
    }

    try {
      if (isNew) {
        await supabase.from('vehicles').insert([payload]);
      } else {
        await supabase.from('vehicles').update(payload).eq('id', payload.id);
      }
    } catch (_) {}

    localStorage.setItem('te_vehicles_db', JSON.stringify(updatedList));
    return payload;
  },

  async deleteVehicle(id: string) {
    const list = await this.getVehicles();
    const updatedList = list.filter((v: any) => v.id !== id);
    localStorage.setItem('te_vehicles_db', JSON.stringify(updatedList));

    try {
      await supabase.from('vehicles').delete().eq('id', id);
    } catch (_) {}
  },

  // Bookings
  async getBookings() {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data.map(mapBooking);
  },

  async createBooking(booking: any) {
    const { data, error } = await supabase
      .from('bookings')
      .insert([{
        id: booking.id,
        vehicle_name: booking.vehicleName,
        vehicle_price: booking.vehiclePrice,
        customer_name: booking.customerName,
        email: booking.email,
        phone: booking.phone,
        id_number: booking.idNumber,
        status: 'Pending'
      }])
      .select();
    if (error) throw error;
    return mapBooking(data[0]);
  },

  async updateBookingStatus(id: string, status: string) {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id)
      .select();
    if (error) throw error;
    return mapBooking(data[0]);
  },

  // Shipments
  async getShipments() {
    try {
      const { data, error } = await supabase.from('shipments').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        const mapped = data.map(mapShipment);
        localStorage.setItem('te_shipments', JSON.stringify(mapped));
        return mapped;
      }
    } catch (_) {}

    const local = localStorage.getItem('te_shipments');
    if (local) return JSON.parse(local);

    localStorage.setItem('te_shipments', JSON.stringify(MOCK_SHIPMENTS));
    return MOCK_SHIPMENTS;
  },

  async createShipment(shipment: any) {
    const newShp = {
      id: `SHP-${Math.floor(1000 + Math.random() * 9000)}`,
      trackingId: shipment.trackingId,
      vehicleName: shipment.vehicleName,
      status: shipment.status || 'In Transit',
      location: shipment.location || 'Port of Origin',
      progress: shipment.progress || 10,
      customerEmail: shipment.customerEmail || 'client@tripleexceed.com',
      eta: shipment.eta || '24 Days'
    };

    const list = await this.getShipments();
    const updated = [newShp, ...list];
    localStorage.setItem('te_shipments', JSON.stringify(updated));

    try {
      await supabase.from('shipments').insert([{
        id: newShp.id,
        tracking_id: newShp.trackingId,
        vehicle_name: newShp.vehicleName,
        status: newShp.status,
        location: newShp.location,
        progress: newShp.progress,
        customer_email: newShp.customerEmail,
        eta: newShp.eta
      }]);
    } catch (_) {}

    return newShp;
  },

  async updateShipment(id: string, updates: { progress: number; location: string; status: string; eta: string }) {
    const list = await this.getShipments();
    const updated = list.map((s: any) => s.id === id ? { ...s, ...updates } : s);
    localStorage.setItem('te_shipments', JSON.stringify(updated));

    try {
      await supabase.from('shipments').update({
        progress: updates.progress,
        location: updates.location,
        status: updates.status,
        eta: updates.eta
      }).eq('id', id);
    } catch (_) {}
  },

  async getShipmentByTrackingId(trackingId: string) {
    const cleanId = trackingId.trim();
    try {
      const { data, error } = await supabase
        .from('shipments')
        .select('*')
        .ilike('tracking_id', cleanId)
        .single();
      
      if (!error && data) {
        return mapShipment(data);
      }
    } catch (_) {}

    const list = await this.getShipments();
    const found = list.find((s: any) => s.trackingId.toLowerCase() === cleanId.toLowerCase());
    return found || null;
  },

  // Customers
  async getCustomers() {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data.map(mapCustomer);
  },

  async saveCustomer(customer: any) {
    const payload = {
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      tier: customer.tier
    };
    
    if (customer.id) {
      const { data, error } = await supabase
        .from('customers')
        .update(payload)
        .eq('id', customer.id)
        .select();
      if (error) throw error;
      return mapCustomer(data[0]);
    } else {
      const { data, error } = await supabase
        .from('customers')
        .insert([payload])
        .select();
      if (error) throw error;
      return mapCustomer(data[0]);
    }
  },

  // Staff & RBAC Governance
  async getStaffUsers() {
    const DEFAULT_STAFF = [
      {
        id: 'staff-1',
        email: 'admin@tripleexceed.com',
        name: 'Louis Kemenyo',
        role: 'admin',
        passwordHash: 'admin',
        isFirstLogin: false,
        status: 'Active',
        createdAt: new Date(2026, 0, 1).toISOString()
      },
      {
        id: 'staff-2',
        email: 'manager@tripleexceed.com',
        name: 'Sarah Mensah',
        role: 'manager',
        passwordHash: 'manager',
        isFirstLogin: false,
        status: 'Active',
        createdAt: new Date(2026, 1, 15).toISOString()
      },
      {
        id: 'staff-3',
        email: 'sales@tripleexceed.com',
        name: 'David Osei',
        role: 'sales',
        passwordHash: 'sales',
        isFirstLogin: false,
        status: 'Active',
        createdAt: new Date(2026, 2, 10).toISOString()
      },
      {
        id: 'staff-4',
        email: 'staff@tripleexceed.com',
        name: 'Joshua Kemenyo',
        role: 'staff',
        tempPassword: 'TX-TEMP-2026',
        passwordHash: 'TX-TEMP-2026',
        isFirstLogin: true,
        status: 'Pending Reset',
        createdAt: new Date().toISOString()
      }
    ];

    try {
      // Try fetching from Supabase table if available
      const { data, error } = await supabase.from('staff_users').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return data.map(u => ({
          id: u.id,
          email: u.email,
          name: u.name,
          role: u.role,
          tempPassword: u.temp_password,
          passwordHash: u.password_hash,
          isFirstLogin: u.is_first_login,
          status: u.status,
          createdAt: u.created_at
        }));
      }
    } catch (_) {
      // Fallback below
    }

    // Robust LocalStorage Fallback
    const local = localStorage.getItem('te_staff_users');
    if (!local) {
      localStorage.setItem('te_staff_users', JSON.stringify(DEFAULT_STAFF));
      return DEFAULT_STAFF;
    }
    return JSON.parse(local);
  },

  async saveStaffUser(staff: any) {
    const list = await this.getStaffUsers();
    const isNew = !staff.id;
    const staffId = staff.id || `staff-${Date.now()}`;
    const payload = {
      id: staffId,
      email: staff.email.toLowerCase(),
      name: staff.name,
      role: staff.role,
      tempPassword: staff.tempPassword,
      passwordHash: staff.tempPassword || staff.passwordHash,
      isFirstLogin: isNew ? true : staff.isFirstLogin,
      status: isNew ? ('Pending Reset' as const) : staff.status,
      createdAt: staff.createdAt || new Date().toISOString()
    };

    let updatedList;
    if (isNew) {
      updatedList = [payload, ...list];
    } else {
      updatedList = list.map((u: any) => u.id === staff.id ? { ...u, ...payload } : u);
    }

    try {
      if (isNew) {
        await supabase.from('staff_users').insert([{
          id: payload.id,
          email: payload.email,
          name: payload.name,
          role: payload.role,
          temp_password: payload.tempPassword,
          password_hash: payload.passwordHash,
          is_first_login: payload.isFirstLogin,
          status: payload.status,
          created_at: payload.createdAt
        }]);
      } else {
        await supabase.from('staff_users').update({
          email: payload.email,
          name: payload.name,
          role: payload.role,
          temp_password: payload.tempPassword,
          password_hash: payload.passwordHash,
          is_first_login: payload.isFirstLogin,
          status: payload.status
        }).eq('id', payload.id);
      }
    } catch (_) {
      // LocalStorage sync ensures continuous operation
    }

    localStorage.setItem('te_staff_users', JSON.stringify(updatedList));
    return payload;
  },

  async updateStaffPassword(id: string, newPassword: string) {
    const list = await this.getStaffUsers();
    const user = list.find((u: any) => u.id === id);
    if (!user) throw new Error('User not found');

    const updatedUser = {
      ...user,
      tempPassword: '',
      passwordHash: newPassword,
      isFirstLogin: false,
      status: 'Active' as const
    };

    const updatedList = list.map((u: any) => u.id === id ? updatedUser : u);
    localStorage.setItem('te_staff_users', JSON.stringify(updatedList));

    try {
      await supabase.from('staff_users').update({
        temp_password: '',
        password_hash: newPassword,
        is_first_login: false,
        status: 'Active'
      }).eq('id', id);
    } catch (_) {}

    return updatedUser;
  },

  async resetStaffPassword(id: string, tempCode: string) {
    const list = await this.getStaffUsers();
    const user = list.find((u: any) => u.id === id);
    if (!user) throw new Error('User not found');

    const updatedUser = {
      ...user,
      tempPassword: tempCode,
      passwordHash: tempCode,
      isFirstLogin: true,
      status: 'Pending Reset' as const
    };

    const updatedList = list.map((u: any) => u.id === id ? updatedUser : u);
    localStorage.setItem('te_staff_users', JSON.stringify(updatedList));

    try {
      await supabase.from('staff_users').update({
        temp_password: tempCode,
        password_hash: tempCode,
        is_first_login: true,
        status: 'Pending Reset'
      }).eq('id', id);
    } catch (_) {}

    return updatedUser;
  },

  async verifyStaffLogin(email: string, passwordAttempt: string) {
    const list = await this.getStaffUsers();
    const user = list.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) return null;

    if (user.passwordHash === passwordAttempt || (user.tempPassword && user.tempPassword === passwordAttempt)) {
      return user;
    }
    return null;
  },

  async deleteStaffUser(id: string) {
    const list = await this.getStaffUsers();
    const updatedList = list.filter((u: any) => u.id !== id);
    localStorage.setItem('te_staff_users', JSON.stringify(updatedList));

    try {
      await supabase.from('staff_users').delete().eq('id', id);
    } catch (_) {}
  },

  async getInquiries() {
    try {
      const { data, error } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        const mapped = data.map(mapInquiry);
        localStorage.setItem('te_inquiries', JSON.stringify(mapped));
        return mapped;
      }
    } catch (_) {}

    const local = localStorage.getItem('te_inquiries');
    if (local) return JSON.parse(local);

    localStorage.setItem('te_inquiries', JSON.stringify(MOCK_INQUIRIES));
    return MOCK_INQUIRIES;
  },

  async createInquiry(payload: { name: string; email: string; phone: string; inquiryType: string; message: string }) {
    const newInq = {
      id: `INQ-${Math.floor(100 + Math.random() * 900)}`,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      inquiryType: payload.inquiryType,
      message: payload.message,
      status: 'Unread',
      createdAt: new Date().toISOString()
    };

    const list = await this.getInquiries();
    const updated = [newInq, ...list];
    localStorage.setItem('te_inquiries', JSON.stringify(updated));

    try {
      await supabase.from('inquiries').insert([{
        id: newInq.id,
        name: newInq.name,
        email: newInq.email,
        phone: newInq.phone,
        inquiry_type: newInq.inquiryType,
        message: newInq.message,
        status: 'Unread',
        created_at: newInq.createdAt
      }]);
    } catch (_) {}

    return newInq;
  },

  async updateInquiryStatus(id: string, status: string) {
    const list = await this.getInquiries();
    const updated = list.map((i: any) => i.id === id ? { ...i, status } : i);
    localStorage.setItem('te_inquiries', JSON.stringify(updated));

    try {
      await supabase.from('inquiries').update({ status }).eq('id', id);
    } catch (_) {}
  },

  async deleteInquiry(id: string) {
    const list = await this.getInquiries();
    const updated = list.filter((i: any) => i.id !== id);
    localStorage.setItem('te_inquiries', JSON.stringify(updated));

    try {
      await supabase.from('inquiries').delete().eq('id', id);
    } catch (_) {}
  },

  async getProtocols() {
    const defaultCfg = { exchangeRate: 15.80, inspectionFee: 2500, maintenanceMode: false };
    try {
      const { data, error } = await supabase.from('protocols').select('*').eq('id', 'system_cfg').single();
      if (!error && data) {
        const mapped = {
          exchangeRate: Number(data.exchange_rate),
          inspectionFee: Number(data.inspection_fee),
          maintenanceMode: Boolean(data.maintenance_mode)
        };
        localStorage.setItem('te_protocols', JSON.stringify(mapped));
        return mapped;
      }
    } catch (_) {}

    const local = localStorage.getItem('te_protocols');
    if (local) return JSON.parse(local);

    localStorage.setItem('te_protocols', JSON.stringify(defaultCfg));
    return defaultCfg;
  },

  async updateProtocols(cfg: { exchangeRate: number; inspectionFee: number; maintenanceMode: boolean }) {
    localStorage.setItem('te_protocols', JSON.stringify(cfg));
    try {
      await supabase.from('protocols').update({
        exchange_rate: cfg.exchangeRate,
        inspection_fee: cfg.inspectionFee,
        maintenance_mode: cfg.maintenanceMode,
        updated_at: new Date().toISOString()
      }).eq('id', 'system_cfg');
    } catch (_) {}
  }
};
