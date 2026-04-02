
// app/properties/page.js
import  supabase from '../../lib/supabaseClient';
import PropertyCard from '../../components/PropertyCard';

export default async function PropertiesPage() {
  const { data, error } = await supabase.from('properties').select('*');

  if (error) {
    console.error("Supabase error:", error.message, error.details, error.hint);
    return <div>Error loading properties</div>;
  }

  const properties = Array.isArray(data) ? data : [];

  if (properties.length === 0) {
    return <div>No property available</div>;
  }

  return (
    <div>
      <h2>Available Properties</h2>
      <div>
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
