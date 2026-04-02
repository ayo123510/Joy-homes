import { supabase } from '../../lib/supabaseClient';

export default async function TestPage() {
  const { data, error } = await supabase.from('properties').select('*').limit(1);

  if (error) {
    return <div>Supabase error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Test Connection</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
