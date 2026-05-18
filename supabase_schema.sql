-- ==============================================================================
-- TRIPLE EXCEED AUTOMOBILE — MASTER SUPABASE SQL SCHEMA v2.6
-- ==============================================================================
-- Execute this complete script in your Supabase SQL Editor to initialize all 
-- platform tables, default admin/staff accounts, and row-level security policies.

-- 1. STAFF USERS TABLE (Governance & RBAC)
CREATE TABLE IF NOT EXISTS public.staff_users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'manager', 'sales', 'staff')),
    password_hash TEXT NOT NULL,
    temp_password TEXT,
    is_first_login BOOLEAN DEFAULT false,
    status TEXT DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert Default Admin & Staff Accounts
INSERT INTO public.staff_users (id, email, name, role, password_hash, is_first_login, status)
VALUES 
    ('staff-1', 'admin@tripleexceed.com', 'Louis Kemenyo', 'admin', 'admin', false, 'Active'),
    ('staff-2', 'manager@tripleexceed.com', 'Sarah Mensah', 'manager', 'manager', false, 'Active'),
    ('staff-3', 'sales@tripleexceed.com', 'David Osei', 'sales', 'sales', false, 'Active'),
    ('staff-4', 'staff@tripleexceed.com', 'Joshua Kemenyo', 'staff', 'TX-TEMP-2026', true, 'Pending Reset'),
    ('staff-5', 'tripleexceed@gmail.com', 'System Admin', 'admin', 'admin', false, 'Active')
ON CONFLICT (email) DO NOTHING;


-- 2. VEHICLES TABLE (Flagship Inventory Registry)
CREATE TABLE IF NOT EXISTS public.vehicles (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    year INTEGER NOT NULL,
    price_ghs NUMERIC NOT NULL,
    condition TEXT NOT NULL,
    source_country TEXT NOT NULL,
    mileage NUMERIC NOT NULL,
    fuel_type TEXT NOT NULL,
    description TEXT,
    images TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);


-- 3. BOOKINGS TABLE (VIP Sourcing & Inspection Inquiries)
CREATE TABLE IF NOT EXISTS public.bookings (
    id TEXT PRIMARY KEY,
    vehicle_name TEXT NOT NULL,
    vehicle_price NUMERIC NOT NULL,
    customer_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    id_number TEXT,
    status TEXT DEFAULT 'Pending Protocol' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);


-- 4. SHIPMENTS TABLE (Maritime Satellite Telemetry & Tracking)
CREATE TABLE IF NOT EXISTS public.shipments (
    id TEXT PRIMARY KEY,
    tracking_id TEXT UNIQUE NOT NULL,
    booking_id TEXT REFERENCES public.bookings(id) ON DELETE SET NULL,
    vehicle_name TEXT NOT NULL,
    current_location TEXT NOT NULL,
    destination TEXT NOT NULL,
    status TEXT NOT NULL,
    vessel_name TEXT NOT NULL,
    estimated_arrival DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);


-- 5. CUSTOMERS TABLE (Client CRM & KYC Dossiers)
CREATE TABLE IF NOT EXISTS public.customers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    id_number TEXT,
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);


-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) & PUBLIC READ ACCESS PROTOCOLS
-- ==============================================================================
-- Enable RLS on all tables
ALTER TABLE public.staff_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

-- Create generous public policies for the SPA (allowing frontend access without complex JWT auth)
CREATE POLICY "Allow public read access on vehicles" ON public.vehicles FOR SELECT USING (true);
CREATE POLICY "Allow public insert on vehicles" ON public.vehicles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on vehicles" ON public.vehicles FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on vehicles" ON public.vehicles FOR DELETE USING (true);

CREATE POLICY "Allow public read access on staff_users" ON public.staff_users FOR SELECT USING (true);
CREATE POLICY "Allow public update on staff_users" ON public.staff_users FOR UPDATE USING (true);
CREATE POLICY "Allow public insert on staff_users" ON public.staff_users FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access on bookings" ON public.bookings FOR SELECT USING (true);
CREATE POLICY "Allow public insert on bookings" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on bookings" ON public.bookings FOR UPDATE USING (true);

CREATE POLICY "Allow public read access on shipments" ON public.shipments FOR SELECT USING (true);
CREATE POLICY "Allow public insert on shipments" ON public.shipments FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on shipments" ON public.shipments FOR UPDATE USING (true);

CREATE POLICY "Allow public read access on customers" ON public.customers FOR SELECT USING (true);
CREATE POLICY "Allow public insert on customers" ON public.customers FOR INSERT WITH CHECK (true);

-- 6. INQUIRIES TABLE (Client Contact & General Sourcing Messages)
CREATE TABLE IF NOT EXISTS public.inquiries (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    inquiry_type TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'Unread' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on inquiries" ON public.inquiries FOR SELECT USING (true);
CREATE POLICY "Allow public insert on inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on inquiries" ON public.inquiries FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on inquiries" ON public.inquiries FOR DELETE USING (true);

-- 7. PROTOCOLS TABLE (Global System Settings & Exchange Pegs)
CREATE TABLE IF NOT EXISTS public.protocols (
    id TEXT PRIMARY KEY,
    exchange_rate NUMERIC NOT NULL DEFAULT 15.80,
    inspection_fee NUMERIC NOT NULL DEFAULT 2500,
    maintenance_mode BOOLEAN NOT NULL DEFAULT false,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

INSERT INTO public.protocols (id, exchange_rate, inspection_fee, maintenance_mode)
VALUES ('system_cfg', 15.80, 2500, false)
ON CONFLICT (id) DO NOTHING;

ALTER TABLE public.protocols ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on protocols" ON public.protocols FOR SELECT USING (true);
CREATE POLICY "Allow public update on protocols" ON public.protocols FOR UPDATE USING (true);
