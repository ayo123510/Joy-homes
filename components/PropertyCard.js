

// components/PropertyList.js
import PropertyCard from './PropertyCard';
import '../styles/propertyCard.css';


export default function PropertyList({ properties }) {
  if (!properties || properties.length === 0) {
    return <p>No properties available.</p>;
  }

  return (
    <div className="propertyContainer">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}

