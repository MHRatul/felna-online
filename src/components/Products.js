import React, { useState } from "react";
import { Container, Card, Button, Modal, Form } from "react-bootstrap";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/Products.css";

const CustomPrevArrow = ({ onClick }) => (
  <button className="slick-arrow custom-prev-arrow" onClick={onClick}>
    <FaChevronLeft />
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button className="slick-arrow custom-next-arrow" onClick={onClick}>
    <FaChevronRight />
  </button>
);

const products = [
  { name: "Wifi Router", price: 3600, image: "/images/wifi.png", description: "A router that provides Wi-Fi." },
  { name: "Switch", price: 8000, image: "/images/switch.png", description: "A network switch for connecting devices." },
  { name: "Hub", price: 20000, image: "/images/hub.png", description: "A simple networking device." },
  { name: "ONU", price: 2000, image: "/images/onu.png", description: "An Optical Network Unit for fiber networks." },
];

const Products = () => {
  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });
  const [errors, setErrors] = useState({});

  const handleShow = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  const totalPrice = selectedProduct ? selectedProduct.price * quantity : 0;

  const handleOrder = (event) => {
    event.preventDefault();

    const newErrors = {};
    
    // Validate name
    if (!formData.name) newErrors.name = "Name is required.";
    
    // Validate phone (start with 013-019)
    if (!formData.phone || !/^(013|014|015|016|017|018|019)\d{8}$/.test(formData.phone)) 
      newErrors.phone = "Phone number must be 11 digits, starting with 013, 014, 015, 016, 017, 018, or 019.";
    
    // Validate email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    
    // Validate address
    if (!formData.address) newErrors.address = "Address is required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Thanks for your order!");
      handleClose();
    }
  };

  return (
    <Container className="container my-5 text-center">
      <h5 className="section-subtitle">Our Products</h5>
      <h2 className="fw-bold mb-4">We Have Latest Products</h2>

      <Slider
  className="products-slider"
  dots
  infinite
  speed={500}
  slidesToShow={3}
  slidesToScroll={1}
  arrows
  nextArrow={<CustomNextArrow />}
  prevArrow={<CustomPrevArrow />}
  responsive={[
    { breakpoint: 992, settings: { slidesToShow: 2 } },
    { breakpoint: 768, settings: { slidesToShow: 1 } },
  ]}
>
  {products.map((product, index) => (
    <div key={index} className="p-3">
      <Card className="product-card">
        <Card.Img variant="top" src={product.image} className="product-image" />
        <Card.Body>
          <h4 className="price-tag fw-bold">৳ {product.price}</h4>
          <Card.Title className="fw-bold">{product.name}</Card.Title>
          <Card.Text className="text-muted">{product.description}</Card.Text>
          <Button variant="danger" onClick={() => handleShow(product)}>Buy Now</Button>
        </Card.Body>
      </Card>
    </div>
  ))}
</Slider>


      {/* Bootstrap Modal */}
      <Modal show={show} onHide={handleClose} centered className="order-modal">
        <Modal.Header closeButton>
          <Modal.Title>Order {selectedProduct?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleOrder}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                isInvalid={!!errors.name}
                required
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                isInvalid={!!errors.phone}
                required
              />
              <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                isInvalid={!!errors.email}
                required
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                isInvalid={!!errors.address}
                required
              />
              <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3 text-left">
              <Form.Label>Quantity</Form.Label>
              <div className="quantity-container">
                <Button className="quantity-btn" onClick={decreaseQuantity}>-</Button>
                <span className="mx-3">{quantity}</span>
                <Button className="quantity-btn" onClick={increaseQuantity}>+</Button>
              </div>
            </Form.Group>
            <h5 className="total-price">Total Price: ৳ {totalPrice}</h5>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>Close</Button>
          <Button className="btn-order" onClick={handleOrder}>Order Now</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Products;