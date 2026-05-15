import { supabase } from './supabase';

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
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async deleteVehicle(id: string) {
    const { error } = await supabase
      .from('vehicles')
      .delete()
      .eq('id', id);
    if (error) throw error;
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
    const { data, error } = await supabase
      .from('shipments')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data.map(mapShipment);
  },

  async createShipment(shipment: any) {
    const { data, error } = await supabase
      .from('shipments')
      .insert([{
        tracking_id: shipment.trackingId,
        vehicle_name: shipment.vehicleName,
        status: shipment.status || 'In Transit',
        location: shipment.location || 'Port of Origin',
        progress: shipment.progress || 10,
        customer_email: shipment.customerEmail,
        eta: shipment.eta || 'Calculating...'
      }])
      .select();
    if (error) throw error;
    return mapShipment(data[0]);
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
  }
};
