import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => (
  <footer>
    <Container fluid>
      <Row className="footer-container">
        {/* Company Info */}
        <Col md={4} className="footer-section">
          <h5>Felna Online</h5>
          <p>House #33 (4th Floor), Road #4, Dhanmondi, Dhaka-1205</p>
          <p>Email: support@felnaonline.com</p>
          <p>Phone: +8801958-666999</p>
        </Col>

        {/* Quick Links */}
        <Col md={4} className="footer-section text-center">
          <h5>Quick Links</h5>
          <ul className="list-unstyled">
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </Col>

        {/* Social Media Links */}
        <Col md={4} className="footer-section footer-social text-center">
          <h5>Follow Us</h5>
          <div className="footer-social-icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedin /></a>
          </div>
        </Col>
      </Row>

      {/* Copyright Section */}
      <Row>
        <Col className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Felna Online. All Rights Reserved.</p>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
