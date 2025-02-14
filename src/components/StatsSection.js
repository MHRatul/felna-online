import React, { useState, useEffect } from 'react';
import { FaUsers, FaCheck, FaUserTie, FaAward } from "react-icons/fa";
import '../styles/StatsSection.css'; 

const CounterSection = () => {
  const [counts, setCounts] = useState({ clients: 0, projects: 0, staff: 0, awards: 0 });

  useEffect(() => {
    const targetCounts = { clients: 1234, projects: 1234, staff: 1234, awards: 1234 };
    const duration = 2000; // Animation duration in ms
    const interval = 50; // Interval for updating numbers
    
    const steps = Object.keys(targetCounts).reduce((acc, key) => {
      acc[key] = targetCounts[key] / (duration / interval);
      return acc;
    }, {});
    
    const intervalId = setInterval(() => {
      setCounts(prevCounts => {
        let newCounts = {};
        Object.keys(prevCounts).forEach(key => {
          newCounts[key] = Math.min(prevCounts[key] + steps[key], targetCounts[key]);
        });
        return newCounts;
      });
    }, interval);
    
    setTimeout(() => clearInterval(intervalId), duration);
  }, []);

  return (
    <>
      <div style={{ marginBottom: '80px' }}></div> {/* Added space between hero section and counter section */}
      <section className="py-5 text-center text-white stats-section">
        <div className="container">
          <div className="row justify-content-center align-items-center text-center gap-3">
            {[ 
              { icon: <FaUsers />, count: counts.clients, label: "Happy Clients" },
              { icon: <FaCheck />, count: counts.projects, label: "Projects Completed" },
              { icon: <FaUserTie />, count: counts.staff, label: "Dedicated Staff" },
              { icon: <FaAward />, count: counts.awards, label: "Awards Achieved" }
            ].map((item, index) => (
              <div key={index} className="col-md-3 d-flex flex-column align-items-center stat-card">
                <div className="fs-1 mb-2">{item.icon}</div>
                <h2 className="fw-bold">{Math.floor(item.count)}</h2>
                <p className="fw-semibold">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CounterSection;
