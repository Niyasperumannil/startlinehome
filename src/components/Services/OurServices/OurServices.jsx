import React, { useEffect, useState } from "react";
import "./OurServices.css";

const API = "https://starlinegroup.ae/api"; // ✅ UPDATED API

const OurServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch(`${API}/services/`); // ✅ REMOVED extra /api/
      const data = await res.json();
      setServices(data);
    } catch (error) {
      console.log("SERVICE FETCH ERROR:", error);
    }
  };

  return (
    <div className="services-container">
      <section className="services-header">
        <h1>Our services</h1>
      </section>

      {/* ✔ Display first service block */}
      {services[0] && (
        <section className="service-block service-card-versace">
          <div className="service-text versace-text">
            <h2>{services[0].title}</h2>
            <p>{services[0].description}</p>
            <button className="read-more-btn versace-btn">READ MORE</button>
          </div>

          <div className="service-image versace-image">
            <img
              src={`${API}${services[0].image}`}
              alt={services[0].title}
            />
          </div>
        </section>
      )}

      {/* ✔ Display second service block */}
      {services[1] && (
        <section className="service-block service-card-furniture">
          <div className="service-image furniture-image">
            <img
              src={`${API}${services[1].image}`}
              alt={services[1].title}
            />
          </div>

          <div className="service-text furniture-text">
            <h2>{services[1].title}</h2>
            <p>{services[1].description}</p>
            <button className="read-more-btn furniture-btn">READ MORE</button>
          </div>
        </section>
      )}
    </div>
  );
};

export default OurServices;
