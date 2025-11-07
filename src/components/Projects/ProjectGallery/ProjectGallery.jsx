import React, { useState } from "react";
import "./ProjectGallery.css";

const projects = [
  {
    title: "ROYAL EXPO APARTMENT",
    size: "320 sq m",
    img: "https://www.solomia-home.ae/storage/Project/fendi/102-kitchen-living-room-11-2560w.jpg",
  },
  {
    title: "ATLANTIS THE ROYAL",
    size: "120 sq m",
    img: "https://www.solomia-home.ae/storage/Project/fendi/102-kitchen-living-room-11-2560w.jpg",
  },
  {
    title: "ONE ZA’ABEEL DUBAI",
    size: "890 sq m",
    img: "https://www.solomia-home.ae/storage/Project/fendi/102-kitchen-living-room-11-2560w.jpg",
  },
  {
    title: "DISTRICT ONE DUBAI",
    size: "977 sq m",
    img: "https://www.solomia-home.ae/storage/Project/fendi/102-kitchen-living-room-11-2560w.jpg",
  },
  {
    title: "APARTMENT PALAZZO VERSACE",
    size: "510 sq m",
    img: "https://www.solomia-home.ae/storage/Project/fendi/102-kitchen-living-room-11-2560w.jpg",
  },
  {
    title: "MIAMI VILLA",
    size: "1150 sq m",
    img: "https://www.solomia-home.ae/storage/Project/fendi/102-kitchen-living-room-11-2560w.jpg",
  },
  {
    title: "VILLA JUMEIRAH BAY",
    size: "2150 sq m",
    img: "https://www.solomia-home.ae/storage/Project/fendi/102-kitchen-living-room-11-2560w.jpg",
  },
  {
    title: "VILLA EMIRATES HILLS",
    size: "1520 sq m",
    img: "https://www.solomia-home.ae/storage/Project/fendi/102-kitchen-living-room-11-2560w.jpg",
  },
   {
    title: "VILLA JUMEIRAH BAY",
    size: "2150 sq m",
    img: "https://www.solomia-home.ae/storage/Project/fendi/102-kitchen-living-room-11-2560w.jpg",
  },
  {
    title: "VILLA EMIRATES HILLS",
    size: "1520 sq m",
    img: "https://www.solomia-home.ae/storage/Project/fendi/102-kitchen-living-room-11-2560w.jpg",
  },
    {
    title: "VILLA JUMEIRAH BAY",
    size: "2150 sq m",
    img: "https://www.solomia-home.ae/storage/Project/fendi/102-kitchen-living-room-11-2560w.jpg",
  },
  {
    title: "VILLA EMIRATES HILLS",
    size: "1520 sq m",
    img: "https://www.solomia-home.ae/storage/Project/fendi/102-kitchen-living-room-11-2560w.jpg",
  },
];

const ProjectGallery = () => {
  const [visibleCount, setVisibleCount] = useState(4);

  const handleLoadMore = () => {
    setVisibleCount(projects.length);
    // Optional: smooth scroll to new items
    setTimeout(() => {
      const lastCard = document.querySelector(".gallery-card:last-child");
      lastCard?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <section className="gallery-section">
      <div className="gallery-grid">
        {projects.slice(0, visibleCount).map((item, index) => (
          <div
            className="gallery-card fade-in"
            key={index}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <img src={item.img} alt={item.title} className="gallery-image" />
            <div className="gallery-info">
              <h3 className="gallery-title">{item.title}</h3>
              <p className="gallery-size">{item.size}</p>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < projects.length && (
        <div className="load-more-container">
          <button className="load-more-btn" onClick={handleLoadMore}>
            LOAD MORE
          </button>
        </div>
      )}
    </section>
  );
};

export default ProjectGallery;
