"use client";

import { useEffect, useState } from "react";
import supabase from "../lib/supabaseClient";   // default export
import "../styles/HomePage.css";               // lowercase folder name
import Image from "next/image";

export default function HomePage() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const { data, error } = await supabase.from("properties").select("*");
      if (error) {
        console.error("Supabase error:", error);
      } else {
        setProperties(data);
      }
    };
    fetchProperties();
  }, []);

  

  return (
    <main>
      <section className="hero-section">
        <div className="overlay">
          <h1>Find Your Dream Home</h1>
          <p>Discover the perfect place to live</p>

          <div className="search-bar">
            <input type="text" placeholder="City or ZIP" />
            <select>
              <option>Property Type</option>
              <option>House</option>
              <option>Apartment</option>
              <option>Condo</option>
            </select>
            <input type="number" placeholder="Max Price" />
            <button>Search</button>
          </div>
        </div>
      </section>

      <section className="property-listings">
        {properties.map((property) => (
          <div className="property-card" key={property.id}>
            <img src={property.image_url} alt={property.title} />
            <div className="property-details">
              <h3>{property.title}</h3>
              <p>
                {property.beds} Beds • {property.baths} Baths • {property.sqft} sqft
              </p>
              <p className="property-price">${property.price}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
