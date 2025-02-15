import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { FaEnvelope, FaClock, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import "../styles/Header.css";
import logo from "../assets/logo.png";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Redirect to Google Login
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5001/auth/google";  // Redirects to backend auth route
  };

  return (
    <header className={isSticky ? "sticky-header" : ""}>
      {/* Top Bar */}
      <div className="top-bar">
        <Container>
          <div className="d-flex justify-content-between align-items-center top-bar-container">
            {/* Address & Hours */}
            <div className="top-info left-align">
              <div className="d-flex align-items-center gap-2">
                <FaMapMarkerAlt className="icon" />
                <span>House #33 (4th Floor), Road #4, Dhanmondi, Dhaka-1205</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <FaClock className="icon" />
                <span>9.00 am - 6.00 pm</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="top-info">
              <div className="d-flex align-items-center gap-2">
                <FaEnvelope className="icon" />
                <span>support@felnaonline.com</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <FaPhoneAlt className="icon" />
                <span>+8801958-666999</span>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Navbar */}
      <Navbar expand="lg" className="custom-navbar">
        <Container>
          {/* Brand Logo */}
          <Navbar.Brand href="/" className="brand-name d-flex align-items-center">
            <img src={logo} alt="Felna Online" className="logo" />
            <span className="text-felna">Felna</span>
            <span className="text-online">Online</span>
          </Navbar.Brand>

          {/* Mobile Toggle Button */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* Collapsible Menu */}
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
            <Nav className="nav-links">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/services">Services</Nav.Link>
              <Nav.Link href="/products">Products</Nav.Link>
              <Nav.Link href="/packages">Packages</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
            </Nav>

            {/* Login and Register Buttons */}
            <div className="auth-buttons">
              <Button variant="btn btn-success" className="mx-2" onClick={handleGoogleLogin}>
                Login
              </Button>
              <Button variant="danger" className="mx-2" href="/register">
                Register
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
