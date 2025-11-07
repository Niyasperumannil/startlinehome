import React from "react";
import "./InteriorGallery.css";

export default function InteriorGallery() {
  const galleryImages = [
    "https://www.solomia-home.ae/storage/sh/1R9A5637-960w.jpg", // top main large image
    "https://www.solomia-home.ae/storage/sh/1R9A5637-960w.jpg",
    "https://www.solomia-home.ae/storage/Showrooms/1R9A5523-640w.jpg",
    "https://www.solomia-home.ae/storage/sh/1R9A5637-960w.jpg",
    "https://www.solomia-home.ae/storage/sh/1R9A5637-960w.jpg",
    "https://www.solomia-home.ae/storage/Showrooms/1R9A6136-640w.jpg",
    "https://www.solomia-home.ae/storage/Showrooms/1R9A6153-640w.jpg",
    "https://www.solomia-home.ae/storage/Showrooms/1R9A5598-640w.jpg",
    "https://www.solomia-home.ae/storage/sh/1R9A5845-640w.jpg",
    "https://www.solomia-home.ae/storage/Showrooms/1R9A5374-640w.jpg",
    "https://www.solomia-home.ae/storage/Showrooms/1R9A5393-640w.jpg",
    "https://www.solomia-home.ae/storage/Showrooms/1R9A5418-640w.jpg",
    "https://www.solomia-home.ae/storage/Showrooms/1R9A5423-640w.jpg",
    "https://www.solomia-home.ae/storage/Showrooms/1R9A5443-640w.jpg",
    "https://www.solomia-home.ae/storage/sh/1R9A5743-640w.jpg",
    "https://www.solomia-home.ae/storage/sh/1R9A5637-960w.jpg",
    "https://www.solomia-home.ae/storage/sh/1R9A5794-640w.jpg",
    "https://www.solomia-home.ae/storage/sh/1R9A5956-640w.jpg",
    "https://www.solomia-home.ae/storage/sh/1R9A5971-640w.jpg",
    "https://www.solomia-home.ae/storage/sh/1R9A5982-640w.jpg",
    "https://www.solomia-home.ae/storage/sh/1R9A6220-640w.jpg",
  ];

  return (
    <section className="interior-gallery-section">
      <div className="interior-gallery-container">
        <h2 className="interior-gallery-heading">Gallery</h2>

        {/* Main large image */}
        <div className="interior-gallery-main">
          <img src={galleryImages[0]} alt="Main Gallery" />
        </div>

        {/* Grid images */}
        <div className="interior-gallery-grid">
          {galleryImages.slice(1).map((src, index) => (
            <div key={index} className="interior-gallery-item">
              <img src={src} alt={`Gallery ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
