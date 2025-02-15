import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import Products from './components/Products';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import StatsSection from './components/StatsSection';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="content-wrapper">
          <Header />
          <Routes>
            <Route path="/" element={
              <>
                <HeroSection />
                <StatsSection />
                <Features />
                <Products />
                <Team />
                <Testimonials />
              </>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
