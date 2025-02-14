import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import Products from './components/Products';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import StatsSection from './components/StatsSection';

const App = () => {
  return (
    <div className="content-wrapper">
      <Header />
      <HeroSection />
      <StatsSection />
      <Features />
      <Products />
      <Team />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default App;
