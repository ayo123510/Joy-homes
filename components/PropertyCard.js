

// components/PropertyCard.js
import styles from "../styles/propertyCard.module.css";

export default function PropertyCard({ property }) {
  return (
    <div className={styles.card}>
      <img src={property.image_url} alt={property.title} />
      <h2>{property.title}</h2>
      <p>
        {property.beds} Beds • {property.baths} Baths • {property.sqft} sqft
      </p>
      <p>${property.price}</p>
    </div>
  );
}





