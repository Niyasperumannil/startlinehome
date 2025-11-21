import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./HeroSection.css";

const API = "https://starlinegroup.ae/api";

const HeroSection = () => {
  const { t, i18n } = useTranslation();

  const [heroData, setHeroData] = useState(null);
  const [heroVideo, setHeroVideo] = useState("/hero.mp4"); // fallback

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await fetch(`${API}/hero`);
        const data = await res.json();

        if (data) {
          setHeroData(data);

          if (data.videoUrl) {
            setHeroVideo(`${API}${data.videoUrl}`);
          }
        }
      } catch (error) {
        console.error("Failed to load hero:", error);
      }
    };

    fetchHero();
  }, []);

  return (
    <section className={`hero-section ${i18n.language === "ar" ? "rtl" : ""}`}>
      <video className="hero-video" autoPlay loop muted playsInline>
        <source src={heroVideo} type="video/mp4" />
      </video>

      <div className="hero-overlay">
        <div className="hero-content">
          <h1 className="hero-title">
            {heroData?.title || t("hero_title")}
          </h1>

          <p className="hero-subtitle">
            {heroData?.subtitle || t("hero_subtitle")}
          </p>

          <div
            className="hero-arrow"
            onClick={() =>
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
            }
          >
            ↓
          </div>
        </div>

        <div className="hero-info">
          <p>{heroData?.location || t("hero_location")}</p>
          <span>{heroData?.size || t("hero_size")}</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
