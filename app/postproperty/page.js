
"use client";

import { useState, useEffect } from "react";
import supabase from "../../lib/supabaseClient";
import "../../styles/auth.css";
import "../../styles/postproperty.css";

export default function PostAndDropPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [properties, setProperties] = useState([]);
  const [showDropList, setShowDropList] = useState(false);
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = null;
    let fileName = null;

    if (imageFile) {
      fileName = `${Date.now()}-${imageFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from("properties-image")
        .upload(fileName, imageFile);

      if (uploadError) {
        setMessage(`Image upload failed: ${uploadError.message}`);
        setLoading(false);
        return;
      }

      const { data } = supabase.storage
        .from("properties-image")
        .getPublicUrl(fileName);

      imageUrl = data.publicUrl;
    }

    const { data, error } = await supabase
      .from("properties")
      .insert([{ title, description, price, location, image_url: imageUrl }])
      .select();

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage("Property posted successfully!");
      setProperties([...properties, data[0]]);
      setTitle("");
      setDescription("");
      setPrice("");
      setLocation("");
      setImageFile(null);
      setPreviewUrl(null);
    }

    setLoading(false);
  };

  const handleDropClick = (property) => {
    setSelectedProperty(property);
    setShowConfirm(true);
  };

  const confirmDrop = async () => {
    if (!selectedProperty) return;
    setLoading(true);

    if (selectedProperty.image_url) {
      const parts = selectedProperty.image_url.split("/");
      const imagePath = parts[parts.length - 1];
      await supabase.storage.from("properties-image").remove([imagePath]);
    }

    await supabase.from("properties").delete().eq("id", selectedProperty.id);

    setProperties(properties.filter((p) => p.id !== selectedProperty.id));
    setMessage("Property deleted successfully!");
    setLoading(false);
    setShowConfirm(false);
    setSelectedProperty(null);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Post / Drop Property</h2>
        <form onSubmit={handlePost}>
          <input type="text" placeholder="Property Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
          <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
          <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />

          <div className="upload-box">
            {!previewUrl ? (
              <label className="upload-label">
                <input type="file" accept="image/*" onChange={handleFileChange} hidden />
                <span>Click or drag an image here</span>
              </label>
            ) : (
              <div className="preview-wrapper">
                <img src={previewUrl} alt="Preview" className="preview-image" />
                {loading && <div className="spinner"></div>}
              </div>
            )}
          </div>

          <div className="button-group">
            <button type="submit" className="post-btn" disabled={loading}>
              {loading ? "Posting..." : "Post Property"}
            </button>
            <button
              type="button"
              className="drop-btn"
              onClick={() => setShowDropList(!showDropList)}
            >
              {showDropList ? "Hide Drop List" : "Drop Properties"}
            </button>
          </div>
        </form>
        {message && <p className="feedback">{message}</p>}
      </div>

      {showDropList && (
        <div className="auth-card property-scroll">
          <h2>Drop Properties</h2>
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

                {/* Inline modal anchored to this card */}
                {showConfirm && selectedProperty?.id === property.id && (
                  <div className="inline-modal">
                    <p>Are you sure you want to drop <strong>{property.title}</strong>?</p>
                    <div className="modal-actions">
                      <button onClick={confirmDrop} disabled={loading}>
                        {loading ? "Dropping..." : "Yes, Drop"}
                      </button>
                      <button onClick={() => setShowConfirm(false)} disabled={loading}>
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
