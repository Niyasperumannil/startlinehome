import React from "react";
import "./BannerSection.css";

const BannerSection = () => {
  return (
    <div className="banner-wrapper">
      <section className="banner-hero">
        <img
          className="banner-hero__image"
          src="https://www.solomia-home.ae/storage/contact-us.jpg"
          alt="Solomia Home Banner"
        />
        <div className="banner-hero__text">
          <h1>Starline Home</h1>
        </div>
      </section>
    </div>
  );
};

export default BannerSection;
