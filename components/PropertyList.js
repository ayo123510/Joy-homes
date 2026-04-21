
import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
import styles from "../styles/propertylist.css";
export default function PropertyList({ properties }) {
  return (
    <div className="properties-grid">
      {properties.map((property) => (
        <div key={property.id} className="property-card">
          {property.image_url && (
            <img
              src={property.image_url}
              alt={property.title}
              className="property-image"
            />
          )}
          <h3>{property.title}</h3>
          <p>{property.description}</p>
          <p><strong>Price:</strong> ${property.price}</p>
          <p><strong>Location:</strong> {property.location}</p>

          {/* Property details with icons */}
          <div className="property-details">
            <span><FaRulerCombined /> {property.sqft} sqft</span>
            <span><FaBed /> {property.beds} beds</span>
            <span><FaBath /> {property.baths} baths</span>
          </div>
        </div>
      ))}
    </div>
  );
}

