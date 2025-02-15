import React from "react";
import { FaCheck } from "react-icons/fa";
import "../styles/Feature.css";

const Feature = () => {
  const features = [
    { title: "High Speed Internet", description: "Enjoy blazing fast speeds for all your online activities with friends seamlessly." },
    { title: "Reliable Performance", description: "Experience consistent connectivity with minimal downtime." },
    { title: "Wide Coverage Area", description: "Serving urban and rural areas with advanced network technology." },
    { title: "24/7 Customer Support", description: "Our support team is available around the clock to assist you." },
    { title: "Affordable Plans", description: "Choose from a variety of plans that fit your budget without hidden fees." },
    { title: "Advanced Security", description: "Protect your data with our top-notch security features." }
  ];

  return (
    <section className="feature-section">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Side: Heading & Text */}
          <div className="col-lg-4 mb-4 text-left">
            <span className="why-choosing">Why Choosing Us!</span>
            <h2 className="fw-bold big-title">Few Reasons Why People Choose Us!</h2>
            <p className="text-muted lead">
              We provide high-quality service, outstanding reliability, and customer satisfaction.
            </p>
            <button className="btn btn-success btn-lg">Explore More</button>
          </div>

          {/* Right Side: Features Grid */}
          <div className="col-lg-8">
            <div className="row g-4">
              {features.map((feature, index) => (
                <div key={index} className="col-md-4">
                  <div className="feature-box">
                    <FaCheck className="check-icon" />
                    <h4 className="feature-title">{feature.title}</h4>
                    <p className="feature-text">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Feature;
