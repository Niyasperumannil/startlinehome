import React from "react";
import { useTranslation } from "react-i18next";
import { FaWhatsapp } from "react-icons/fa";
import "./AboutSection.css";

const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <section className="about-section">
      <div className="about-container">
        {/* ===== Left Text ===== */}
        <div className="about-text">
          <h2 className="about-title">
            <span className="line1">{t("about_title_line1")}</span>
            <br />
            <span className="line2">
              <span>{t("about_title_line2_home")} </span>
              <span>{t("about_title_line2_family")}</span>
            </span>
          </h2>

          <p className="about-description">{t("about_paragraph1")}</p>

          <p className="about-description">{t("about_paragraph2")}</p>

          <button className="about-btn">{t("about_button")}</button>
        </div>

        {/* ===== Right Image ===== */}
        <div className="about-image">
          <img
            src="https://www.solomia-home.ae/storage/24a854c6bcafad1a2c216b66d52ae535.jpeg"
            alt={t("about_alt_text")}
          />
        </div>
      </div>

      {/* ===== Floating WhatsApp Button ===== */}
      <a
        href="https://wa.me/971501234567" // 🔁 replace with your WhatsApp number
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="whatsapp-icon" />
      </a>
    </section>
  );
};

export default AboutSection;
