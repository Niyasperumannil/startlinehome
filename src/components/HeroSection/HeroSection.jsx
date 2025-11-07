import React from "react";
import { useTranslation } from "react-i18next";
import "./HeroSection.css";

const HeroSection = () => {
  const { t, i18n } = useTranslation();

  return (
    <section className={`hero-section ${i18n.language === "ar" ? "rtl" : ""}`}>
      {/* 🔹 Background Video */}
      <video className="hero-video" autoPlay loop muted playsInline>
        <source
          src="/hero.mp4"
          type="video/mp4"
        />
      </video>

      {/* 🔹 Overlay Content */}
      <div className="hero-overlay">
        <div className="hero-content">
          <h1 className="hero-title">{t("hero_title")}</h1>
          <p className="hero-subtitle">{t("hero_subtitle")}</p>
          <div
            className="hero-arrow"
            onClick={() =>
              window.scrollTo({
                top: window.innerHeight,
                behavior: "smooth",
              })
            }
          >
            ↓
          </div>
        </div>

        <div className="hero-info">
          <p>{t("hero_location")}</p>
          <span>{t("hero_size")}</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
