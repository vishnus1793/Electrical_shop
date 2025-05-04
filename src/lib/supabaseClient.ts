import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jgkpesrtinnvcbevtyde.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impna3Blc3J0aW5udmNiZXZ0eWRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MTQ5ODUsImV4cCI6MjA2MDM5MDk4NX0.Jl_j7z7bAVb5CWLoJVr6gqr_hnUChSQkbbm_rffXPpk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
