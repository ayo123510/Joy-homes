"use client";

import { useEffect, useState } from "react";
import supabase from "../lib/supabaseClient";
import "../styles/HomePage.css";
import Slider from "react-slick";

// ✅ Import slick-carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomePage() {
  const [properties, setProperties] = useState([]);
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    let query = supabase
      .from("properties")
      .select(`
      id,
      title,
      beds,
      baths,
      sqft,
      price,
      type,
      image_url,
      property_images:property_images_property_id_fkey(id, url, caption)
      
    `);

    if (city) query = query.ilike("city", `%${city}%`);
    if (type) query = query.eq("type", type);
    if (maxPrice) query = query.lte("price", maxPrice);

    const { data, error } = await query;

    if (error) {
      console.error("Supabase error:", error.message || error);
    } else {
      console.log("Fetched data:", data);
      setProperties(data);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <main>
      <section className="hero-section">
        <div className="overlay">
          <h1>Find Your Dream Home</h1>
          <p>Discover the perfect place to live</p>

          <div className="search-bar">
            <input
              type="text"
              placeholder="City or ZIP"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">Property Type</option>
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
              <option value="Condo">Condo</option>
            </select>
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <button onClick={fetchProperties}>Search</button>
          </div>
        </div>
      </section>

      <section className="property-listings">
        {properties.map((property) => {
          const hasImages =
            Array.isArray(property.property_images) &&
            property.property_images.length > 0;

          return (
            <div className="property-card" key={property.id}>
              {hasImages ? (
                <Slider key={`slider-${property.id}`} {...sliderSettings}>
                  {property.property_images.map((img, index) => (
                    <div key={img.id || index} className="carousel-slide">
                      <img
                        src={img.url}
                        alt={img.caption || `${property.title} - ${index}`}
                        className="carousel-image"
                      />
                      {img.caption && (
                        <span className="image-overlay">{img.caption}</span>
                      )}
                    </div>
                  ))}
                </Slider>
              ) : (
                <img
                  src={property.image_url}
                  alt={property.title}
                  className="cover-image"
                />
              )}

              <div className="property-details">
                <h3>{property.title}</h3>
                <p>
                  {property.beds} Beds • {property.baths} Baths • {property.sqft} sqft
                </p>
                <p className="property-price">${property.price}</p>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
