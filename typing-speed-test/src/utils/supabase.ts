import { createClient } from "@supabase/supabase-js";

export const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
export const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;

if (!supabaseKey || !supabaseUrl) {
  throw new Error('Environment variables REACT_APP_SUPABASE_ANON_KEY and REACT_APP_SUPABASE_URL must be set');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchRecords() {
  let { data, error } = await supabase
    .from('profiles')
    .select('*')

  if (error) {
    console.error('Błąd podczas pobierania danych:', error)
  } else {
    console.log('Pobrane dane:', data)
  }
}

fetchRecords()
