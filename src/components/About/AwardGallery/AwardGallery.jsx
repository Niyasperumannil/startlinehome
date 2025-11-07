import React from "react";
import "./AwardGallery.css";

export default function AwardGallery() {
  return (
    <div className="gallery-wrapper">
      <div className="gallery-container">
        <img
          src="https://www.solomia-home.ae/storage/International%20Property%20Awards%202025/Solomia-Home-at-International-Property-Awards-1.JPG"
          alt="Left Side"
          className="gallery-img left-img"
        />
        <img
          src="https://www.solomia-home.ae/storage/International%20Property%20Awards%202025/Solomia-Home-at-International-Property-Awards-1.JPG"
          alt="Center Main"
          className="gallery-img center-img"
        />
        <img
          src="https://www.solomia-home.ae/storage/International%20Property%20Awards%202025/Solomia-Home-at-International-Property-Awards-1.JPG"
          alt="Right Side"
          className="gallery-img right-img"
        />
      </div>
    </div>
  );
}
