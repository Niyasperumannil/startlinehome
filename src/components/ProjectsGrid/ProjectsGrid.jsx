import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProjectsGrid.css";

const projects = [
  {
    id: 1,
    title: "VILLA IN THE SPIRIT OF HERMÈS",
    img: "https://www.solomia-home.ae/storage/Project/hermes/hall-kitchen-livingroom-12-2560w.jpg",
  },
  {
    id: 2,
    title: "FENDI DA NANG, VIETNAM",
    img: "https://www.solomia-home.ae/storage/Project/fendi/102-kitchen-living-room-12-2560w.jpg",
  },
  {
    id: 3,
    title: "MARSA AL ARAB VILLA",
    img: "https://www.solomia-home.ae/storage/Project/marsal-al-arab-villa/living-room/living-3-2560w.jpg",
  },
  {
    id: 4,
    title: "AURUM COASTLIN",
    subtitle: "1300 sq m",
    img: "https://www.solomia-home.ae/storage/Project/ext-villa/solomia-prj-villaview-010-2560w.jpg",
  },
  {
    id: 5,
    title: "PRIVATE RESIDENCE",
    img: "https://www.solomia-home.ae/storage/Project/bulgari_villa/living-room-2306-view09-2560w.jpg",
  },
  {
    id: 6,
    title: "LUXURY APARTMENT",
    img: "https://www.solomia-home.ae/storage/Project/villa-in-keturah-reserve-dubai/villa-in-keturah-reserve-dubai18-2560w.jpg",
  },
   {
    id: 7,
    title: "LUXURY APARTMENT",
    img: "https://www.solomia-home.ae/storage/Project/villa-in-keturah-reserve-dubai/villa-in-keturah-reserve-dubai18-2560w.jpg",
  },
  {
    id: 8,
    title: "LUXURY APARTMENT",
    img: "https://www.solomia-home.ae/storage/Project/villa-in-keturah-reserve-dubai/villa-in-keturah-reserve-dubai18-2560w.jpg",
  },
  
];

const ProjectsGrid = () => {
  const navigate = useNavigate();

  const handleProjectClick = (id) => {
    navigate(`/projects/${id}`); // 👉 Go to each project page dynamically
  };

  return (
    <section className="projects-grid-section">
      <div className="projects-grid-container">
        {projects.map((p) => (
          <div
            className="project-card"
            key={p.id}
            onClick={() => handleProjectClick(p.id)}
          >
            <img src={p.img} alt={p.title} className="project-image" />
            <div className="project-overlay">
              <h3 className="project-title">{p.title}</h3>
              {p.subtitle && <p className="project-subtitle">{p.subtitle}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* WhatsApp Floating Icon */}
 
    </section>
  );
};

export default ProjectsGrid;
