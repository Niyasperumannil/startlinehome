import React, { useEffect, useState } from "react";
import "./ServicesOverviewSection.css";
import axios from "axios";

const API = "https://starlinegroup.ae/";

const ServicesOverviewSection = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get(`${API}/api/services/`);
      setServices(res.data);
    } catch (error) {
      console.log("FETCH ERROR:", error);
    }
  };

  return (
    <section className="so-section">
      <h2 className="so-heading">
        Starline<br />
        <span className="so-heading-light"> home services</span>
      </h2>

      <button className="so-viewAllBtn">VIEW ALL SERVICES</button>

      <div className="so-cardsContainer">

        {/* 🔥 Dynamic Services from Admin Panel */}
        {services.slice(0, 3).map((srv, index) => (
          <div
            key={srv._id}
            className={`fade-card delay${index + 1} so-card${index + 1}`}
          >
            <img
              src={`${API}${srv.image}`}
              alt={srv.title}
              className={`so-card${index + 1}Img`}
            />
            <p className={`so-card${index + 1}Label`}>{srv.title}</p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default ServicesOverviewSection;
