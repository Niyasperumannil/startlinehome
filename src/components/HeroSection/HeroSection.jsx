import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./HeroSection.css";

const API = "https://starlinegroup.ae";

const HeroSection = () => {
  const { t, i18n } = useTranslation();

  const [heroData, setHeroData] = useState(null);
  const [heroVideo, setHeroVideo] = useState("/hero.mp4"); // default fallback
  const [videoError, setVideoError] = useState(false);

  // Fetch hero data from backend
  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await fetch(`${API}/api/hero`);
        if (!res.ok) throw new Error("Failed to fetch hero");

        const data = await res.json();
        setHeroData(data);

        if (data.videoUrl) {
          setHeroVideo(`${API}${data.videoUrl}`);
        }
      } catch (error) {
        console.error("Failed to load hero:", error);
        setHeroVideo("/hero.mp4"); // fallback on error
      }
    };

    fetchHero();
  }, []);

  // If video fails to load, switch to fallback
  const handleVideoError = () => {
    if (!videoError) {
      console.warn("Hero video failed to load, using fallback video");
      setVideoError(true);
      setHeroVideo("/hero.mp4");
    }
  };

  return (
    <section className={`hero-section ${i18n.language === "ar" ? "rtl" : ""}`}>
      <video
        className="hero-video"
        autoPlay
        loop
        muted
        playsInline
        onError={handleVideoError}
      >
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="hero-overlay">
        <div className="hero-content">
          <h1 className="hero-title">{heroData?.title || t("hero_title")}</h1>
          <p className="hero-subtitle">{heroData?.subtitle || t("hero_subtitle")}</p>

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
