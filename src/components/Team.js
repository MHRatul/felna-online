import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import "../styles/Team.css";

const teamMembers = [
  {
    name: "John Doe",
    position: "CEO",
    image: "/images/team-1.jpg",
    social: {
      facebook: "#",
      twitter: "#",
      linkedin: "#"
    }
  },
  {
    name: "Jane Smith",
    position: "CTO",
    image: "/images/team-2.jpg",
    social: {
      facebook: "#",
      twitter: "#",
      linkedin: "#"
    }
  },
  {
    name: "Mike Johnson",
    position: "Marketing Head",
    image: "/images/team-3.jpg",
    social: {
      facebook: "#",
      twitter: "#",
      linkedin: "#"
    }
  }
];

const Team = () => {
  return (
    <section className="team-section">
      <div className="container">
        <h5 className="section-subtitle">Our Team</h5>
        <h2 className="section-title">Meet Our Exclusive Team</h2>
        <div className="team-container">
          {teamMembers.map((member, index) => (
            <div className="team-card" key={index}>
              <div className="team-image">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="team-info">
                <h3>{member.name}</h3>
                <p>{member.position}</p>
                <div className="social-icons">
                  <a href={member.social.facebook}><FaFacebook /></a>
                  <a href={member.social.twitter}><FaTwitter /></a>
                  <a href={member.social.linkedin}><FaLinkedin /></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
