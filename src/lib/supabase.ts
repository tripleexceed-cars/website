/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://pltashchsgkjeqyrmgtk.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsdGFzaGNoc2dramVxeXJtZ3RrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3OTMzNzYsImV4cCI6MjA5NDM2OTM3Nn0.3ydBKQBs7MIIh0ddOxMijwZEFQ0ohdUFpx1lCsnQtZo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
