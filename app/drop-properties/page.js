"use client";

import { useEffect, useState } from "react";
import supabase from "../../lib/supabaseClient";
import "../../styles/auth.css";
import "../../styles/postproperty.css";

export default function DropPropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      const { data, error } = await supabase.from("properties").select("*");
      if (error) {
        setMessage(`Error fetching properties: ${error.message}`);
      } else {
        setProperties(data);
      }
    };
    fetchProperties();
  }, []);

  const handleDropClick = (property) => {
    setSelectedProperty(property);
    setShowConfirm(true);
  };

  const confirmDrop = async () => {
    if (!selectedProperty) return;
    setLoading(true);

    // Delete image from storage
    if (selectedProperty.image_url) {
      const parts = selectedProperty.image_url.split("/");
      const imagePath = parts[parts.length - 1];
      const { error: storageError } = await supabase.storage
        .from("properties-image")
        .remove([imagePath]);

      if (storageError) {
        console.error("Image delete failed:", storageError.message);
      }
    }

    // Delete property record
    const { error } = await supabase
      .from("properties")
      .delete()
      .eq("id", selectedProperty.id);

    if (error) {
      setMessage(`Error deleting property: ${error.message}`);
    } else {
      setMessage("Property deleted successfully!");
      setProperties(properties.filter((p) => p.id !== selectedProperty.id));
    }

    setLoading(false);
    setShowConfirm(false);
    setSelectedProperty(null);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Drop Properties</h2>
        {message && <p className="feedback">{message}</p>}
        <div className="property-list">
          {properties.map((property) => (
            <div key={property.id} className="property-card">
              <h3>{property.title}</h3>
              <p>{property.description}</p>
              <p><strong>Price:</strong> {property.price}</p>
              <p><strong>Location:</strong> {property.location}</p>
              {property.image_url && (
                <img src={property.image_url} alt={property.title} className="property-image" />
              )}
              <button
                className="drop-btn"
                onClick={() => handleDropClick(property)}
                disabled={loading}
              >
                Drop Property
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Are you sure you want to drop <strong>{selectedProperty?.title}</strong>?</p>
            <div className="modal-actions">
              <button onClick={confirmDrop} disabled={loading}>
                {loading ? "Dropping..." : "Yes, Drop"}
              </button>
              <button onClick={() => setShowConfirm(false)} disabled={loading}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
