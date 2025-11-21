import React, { useEffect, useState } from "react";
import "./ProjectsGrid.css";

const API = "https://starlinegroup.ae/api"; // <-- UPDATED API ONLY

const ProjectsGrid = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null); // modal state

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API}/projects`);
      const data = await res.json();

      const formatted = data.map((p) => ({
        id: p._id,
        title: p.title,
        subtitle: p.subtitle || "",
        img: `${API}/uploads/projects/${p.coverImage}`,
      }));

      setProjects(formatted);
    } catch (error) {
      console.error("Failed to load projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <section className="projects-grid-section">
        <div className="projects-grid-container">
          {projects.map((p) => (
            <div
              className="project-card"
              key={p.id}
              onClick={() => openModal(p)} // open modal
            >
              <img src={p.img} alt={p.title} className="project-image" />

              <div className="project-overlay">
                <h3 className="project-title">{p.title}</h3>
                {p.subtitle && <p className="project-subtitle">{p.subtitle}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🟦 MODAL */}
      {selectedProject && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
          >
            <button className="modal-close-btn" onClick={closeModal}>
              ✕
            </button>

            <img
              src={selectedProject.img}
              alt={selectedProject.title}
              className="modal-image"
            />

            <h2 className="modal-title">{selectedProject.title}</h2>

            {selectedProject.subtitle && (
              <p className="modal-subtitle">{selectedProject.subtitle}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectsGrid;
