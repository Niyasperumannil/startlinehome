import React from "react";
import { useTranslation } from "react-i18next";
import "./ProjectsHeader.css";

const ProjectsHeader = () => {
  const { t } = useTranslation();

  return (
    <section className="projects-header">
      <div className="projects-container">
        <div className="projects-title">
          <h1 className="projects-title-bold">{t("projects_title_line1")}</h1>
          <h2 className="projects-title-light">{t("projects_title_line2")}</h2>
        </div>

        <button className="projects-btn">{t("projects_button")}</button>
      </div>
    </section>
  );
};

export default ProjectsHeader;
