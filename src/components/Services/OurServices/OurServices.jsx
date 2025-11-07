import React from "react";
import "./OurServices.css";

const OurServices = () => {
  return (
    <div className="services-container">
      <section className="services-header">
        <h1>Our services</h1>
      </section>

      {/* Versace Section */}
      <section className="service-block service-card-versace">
        <div className="service-text versace-text">
          <h2>
            Solomia Home® – official dealer Versace Home® in Dubai
          </h2>
          <p>
            Versace Home furniture and accessories are a stunning blend of the
            brand's history, fashion, heritage, and distinctive graphic elements
            that embody its philosophy. They are not just pieces of furniture,
            but a complete lifestyle. Versace Home furniture and accessories are
            designed with unparalleled taste and meticulous attention to detail,
            enriching and elevating spaces. Each piece in this collection is
            capable of adding a unique rhythm to an environment, giving interior
            design exceptional depth and elegance.
          </p>
          <button className="read-more-btn versace-btn">READ MORE</button>
        </div>
        <div className="service-image versace-image">
          <img
            src="https://www.solomia-home.ae/storage/uploads/2024/05/Black-White-jL1D0ddNrr8qFeau-960w.jpg"
            alt="Versace Home"
          />
        </div>
      </section>

      {/* Luxury Furniture Section */}
      <section className="service-block service-card-furniture">
        <div className="service-image furniture-image">
          <img
            src="https://www.solomia-home.ae/storage/uploads/2024/05/Black-White-jL1D0ddNrr8qFeau-960w.jpg"
            alt="Luxury Furniture"
          />
        </div>
        <div className="service-text furniture-text">
          <h2>Luxury Furniture</h2>
          <p>
            Our company is an exclusive representative of the best Italian
            factories that have won recognition worldwide. Limited collections of
            brands from Henge to Versace combine elegance, style and impeccable
            quality with the distinctive mark of made in Italy, which allows you
            to create exclusive interiors that meet the most demanding tastes and
            remain timelessly relevant.
          </p>
          <button className="read-more-btn furniture-btn">READ MORE</button>
        </div>
      </section>
    </div>
  );
};

export default OurServices;
