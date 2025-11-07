import React from "react";
import "./ServicesOverviewSection.css";

const ServicesOverviewSection = () => {
  return (
    <section className="so-section">
      <h2 className="so-heading">
        Solomia<br />
        <span className="so-heading-light"> home services</span>
      </h2>

      <button className="so-viewAllBtn">VIEW ALL SERVICES</button>

      <div className="so-cardsContainer">
        {/* Card 1 */}
        <div className="so-card1 fade-card delay1">
          <img
            src="https://www.solomia-home.ae/storage/uploads/2024/10/image-10-640w.jpg"
            alt="Luxury Furniture"
            className="so-card1Img"
          />
          <p className="so-card1Label">Luxury Furniture</p>
        </div>

        {/* Card 2 */}
        <div className="svc-card2 fade-card delay2">
          <img
            src="https://www.solomia-home.ae/storage/uploads/2024/10/image-9-640w.jpg"
            alt="Interior Design"
            className="svc-card2Img"
          />
          <p className="svc-card2Label">Interior Design</p>
        </div>

        {/* Card 3 */}
        <div className="so-card3 fade-card delay3">
          <img
            src="https://www.solomia-home.ae/storage/uploads/2024/10/image-11-640w.jpg"
            alt="[Third Service]"
            className="so-card3Img"
          />
          <p className="so-card3Label">[Third Service]</p>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverviewSection;
