import React, { useEffect, useState } from "react";
import "./ProjectsGrid.css";

const API = "https://starlinegroup.ae/api";  
const STATIC_BASE = "https://starlinegroup.ae/uploads/projects"; // base for project images

const ProjectsGrid = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API}/projects`); 
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();

      const formatted = data.map((p) => ({
        id: p._id,
        title: p.title,
        subtitle: p.subtitle || "",
        coverImage: p.coverImage,
        img: p.coverImage
          ? `${STATIC_BASE}/${p.coverImage}`
          : null,
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
              onClick={() => openModal(p)}
            >
              {p.img ? (
                <img src={p.img} alt={p.title} className="project-image" />
              ) : (
                <div className="project-image placeholder">
                  No Image
                </div>
              )}

              <div className="project-overlay">
                <h3 className="project-title">{p.title}</h3>
                {p.subtitle && (
                  <p className="project-subtitle">{p.subtitle}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedProject && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close-btn" onClick={closeModal}>
              ✕
            </button>

            {selectedProject.img ? (
              <img
                src={selectedProject.img}
                alt={selectedProject.title}
                className="modal-image"
              />
            ) : (
              <div className="modal-image placeholder">No Image</div>
            )}

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
