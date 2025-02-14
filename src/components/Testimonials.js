import React from "react";
import { FaStar } from "react-icons/fa";
import "../styles/Testimonials.css";

const testimonials = [
  {
    name: 'Colin Munro',
     review: 'They are awesome.',
     image: '/images/team-2.jpg', 
     rating: 5,
   },
   {
     name: 'Mike Hussy',
     review: 'Service was good.',
     image: '/images/team-1.jpg',
     rating: 4,
   },
   {
     name: 'Emily Davis',
     review: 'Very professional and helpful staff.',
     image: '/images/team-3.jpg',
     rating: 5,
   },
   {
     name: 'Michael Johnson',
     review: 'Outstanding service, highly recommend!',
     image: '/images/team-2.jpg',
     rating: 5,
   },
   {
     name: 'Sarah Miller',
     review: 'Quick and efficient solutions provided.',
     image: '/images/team-1.jpg',
     rating: 4,
   },
   {
     name: "Michael Smith",
     image: "/images/team-2.jpg",
     review: "A fantastic experience from start to finish!",
     rating: 4,
   },
   {
     name: "Sophia Brown",
     image: "/images/team-3.jpg",
     review: "Excellent quality and amazing support team.",
     rating: 5,
   }, 
];

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="container">
        <h5 className="section-subtitle">Testimonials</h5>
        <h2 className="section-title">What Our Clients Say</h2>
        <div className="testimonials-container">
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <div className="testimonial-image">
                <img src={testimonial.image} alt={testimonial.name} />
              </div>
              <div className="testimonial-info">
                <h3>{testimonial.name}</h3>
                <p className="testimonial-review">"{testimonial.review}"</p>
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="star" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
