import React from "react";
import { useParams } from "react-router-dom";
import { projects } from "../../components/projectsData";
import "./ProjectDetails.css";

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === Number(id));

  if (!project) return <h2 className="not-found">Project not found</h2>;

  return (
    <section className="project-detail-section">
      <div className="project-detail-container">
        <h1 className="project-detail-title">{project.title}</h1>

        <img
          src={project.img}
          alt={project.title}
          className="project-detail-image"
        />

        <p className="project-detail-description">{project.description}</p>
      </div>
    </section>
  );
};

export default ProjectDetail;
