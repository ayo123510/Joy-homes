// testSupabase.js
import { createClient } from '@supabase/supabase-js';

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('properties')   // replace with a table you know exists
      .select('*')
      .limit(1);

    if (error) {
      console.error("❌ Supabase error:", error.message);
    } else {
      console.log("✅ Supabase connection works!");
      console.log("Sample data:", data);
    }
  } catch (err) {
    console.error("❌ Unexpected error:", err);
  }
}

testConnection();
