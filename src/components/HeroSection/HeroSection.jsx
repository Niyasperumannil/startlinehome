import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "./HeroSection.css";

const API = "https://starlinegroup.ae";

const HeroSection = () => {
  const { t, i18n } = useTranslation();

  const [heroData, setHeroData] = useState(null);
  const [videoSrc, setVideoSrc] = useState(null);
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const videoRef = useRef(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await fetch(`${API}/api/hero`);
        if (!res.ok) throw new Error("Failed to fetch hero");

        const data = await res.json();
        setHeroData(data);

        if (data.videoUrl) {
          setVideoSrc(`${API}${data.videoUrl}`);
        } else {
          // fallback to a default video
          setVideoSrc("/hero.mp4");
        }
      } catch (error) {
        console.error("Error fetching hero:", error);
        setVideoSrc("/hero.mp4"); // fallback on fetch error
      }
    };

    fetchHero();
  }, []);

  const handleVideoError = () => {
    console.warn("Hero video failed to load, switching to fallback");
    setVideoError(true);
    setVideoSrc("/hero.mp4");
  };

  const handleLoadedData = () => {
    setIsLoading(false);
  };

  return (
    <section className={`hero-section ${i18n.language === "ar" ? "rtl" : ""}`}>
      <div className="hero-video-wrapper">
        {isLoading && <div className="hero-loading">Loading video...</div>}

        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
          onError={handleVideoError}
          onLoadedData={handleLoadedData}
          preload="auto"
          // optionally, you can add a poster image:
          // poster="/path/to/poster.jpg"
        >
          {videoSrc && <source src={videoSrc} type="video/mp4" />}
          Your browser does not support the video tag.
        </video>
      </div>

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
