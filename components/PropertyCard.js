"use client";


// components/PropertyCard.js
import styles from "../styles/propertyCard.module.css";
import Slider from "react-slick";

export default function PropertyCard({ property }) {
  const settings = { dots: true, infinite: true, slidesToShow: 1, slidesToScroll: 1 };

  return (
    <div className={styles.card}>
      <Slider {...settings}>
        {property.property_images?.map((img, idx) => (
          <div key={idx}>
            <img src={img.url} alt={img.caption || property.title} />
          </div>
        ))}
      </Slider>
      <h2>{property.title}</h2>
      <p>
        {property.beds} Beds • {property.baths} Baths • {property.sqft} sqft
      </p>
      <p>${property.price}</p>
    </div>
  );
}







