
// components/PropertyList.js
import PropertyCard from "./PropertyCard";
import styles from "../styles/propertyCard.module.css";

export default function PropertyList({ properties }) {
  if (!properties || properties.length === 0) {
    return <p>No properties available.</p>;
  }

  return (
    <div className={styles.propertyContainer}>
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
