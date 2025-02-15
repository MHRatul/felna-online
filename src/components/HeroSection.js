import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";
import "../styles/HeroSection.css";

const HeroSection = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    // Fetch slider data from the backend API
    axios
      .get("http://localhost:5001/api/slider")
      .then((response) => {
        setSlides(response.data);
      })
      .catch((error) => {
        console.error("Error fetching slider data:", error);
      });
  }, []);

  return (
    <section className="hero-section">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="hero-slider"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <a href={slide.url || "#"} target="_blank" rel="noopener noreferrer">
              <div className="slide">
                {/* Build the image URL using the server's address and the image path from DB */}
                <img
                  src={`http://localhost:5001${slide.image}`}
                  alt={slide.title || "Slide"}
                  className="slide-image"
                />
                <div className="slide-overlay">
                  <h2>{slide.title || "Default Title"}</h2>
                  <p>{slide.description || "Default Description"}</p>
                </div>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSection;
