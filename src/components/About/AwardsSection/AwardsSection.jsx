import React from "react";
import "./AwardsSection.css";

export default function AwardsSection() {
  return (
    <section className="awards-wrapper">
      <div className="awards-container">
        <h1 className="awards-title">
          Starline <br />
          <span className="awards-light">home awards</span>
        </h1>

        <p className="awards-description">
          Awards in construction represent recognition of achievements that
          inspire new accomplishments and industry growth. Striving for awards
          motivates continual improvement of projects.
        </p>

        <div className="awards-logos">
          <img
            src="https://www.solomia-home.ae/storage/uploads/awards.png"
            alt="Dubai Property Awards"
            className="award-img"
          />
        </div>
      </div>
    </section>
  );
}
