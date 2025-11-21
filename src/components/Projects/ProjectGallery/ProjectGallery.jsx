import React, { useState, useEffect } from "react";
import "./ProjectGallery.css";

const API = "https://starlinegroup.ae/api"; // ✅ UPDATED API ONLY

const ProjectGallery = () => {
  const [projects, setProjects] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);

  // FETCH PROJECTS FROM BACKEND
  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API}/projects`); // ✅ removed extra /api/
      const data = await res.json();

      // Convert admin project format to frontend gallery format
      const formatted = data.map((p) => ({
        title: p.title,
        size: p.subtitle || "",
        img: `${API}/uploads/projects/${p.coverImage}`, // full image URL
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
