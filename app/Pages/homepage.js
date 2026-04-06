

// pages/index.js or wherever you fetch data
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import PropertyList from '../components/PropertyList';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);

export default function HomePage() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    async function fetchProperties() {
      const { data, error } = await supabase
        .from('properties')
        .select('*');
      if (error) {
        console.error(error);
      } else {
        setProperties(data);
      }
    }
    fetchProperties();
  }, []);

  return (
    <div>
      <h1>Available Properties</h1>
      <PropertyList properties={properties} />
    </div>
  );
}
