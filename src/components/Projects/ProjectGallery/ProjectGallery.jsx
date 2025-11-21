import React, { useState, useEffect } from "react";
import "./ProjectGallery.css";

const API = "https://starlinegroup.ae/api";  
const STATIC_BASE = "https://starlinegroup.ae/uploads/projects"; // static path for project images

const ProjectGallery = () => {
  const [projects, setProjects] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);

  // Fetch projects from backend
  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API}/projects`);
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();

      const formatted = data.map((p) => ({
        title: p.title,
        size: p.subtitle || "",
        img: p.coverImage ? `${STATIC_BASE}/${p.coverImage}` : null,
      }));

      setProjects(formatted);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount(projects.length);

    // Smooth scroll to the last card after a short delay
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
            {item.img ? (
              <img
                src={item.img}
                alt={item.title}
                className="gallery-image"
                loading="lazy"  // native lazy-loading
              />
            ) : (
              <div className="gallery-image placeholder">No Image</div>
            )}

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
