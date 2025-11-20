import React from "react";
import "./CompanyIntroSection.css";
import playIcon from "/PlayIcon.png";       // adjust path
import pauseIcon from "/PlayIcon.png";     // adjust path
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

const CompanyIntroSection = () => {
  const videoRef = React.useRef(null);
  const [isPaused, setIsPaused] = React.useState(true);

  const handleToggle = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play();
      setIsPaused(false);
    } else {
      vid.pause();
      setIsPaused(true);
    }
  };

  const handleVideoEnded = () => {
    setIsPaused(true);
  };

  return (
    <section className="ci-section">
      <div className="ci-left">
        <h1 className="ci-title">
          About <br />
          <span className="ci-highlight">Starline</span> home
        </h1>

        <p className="ci-paragraph">
          Having more than 17 years of experience in the field of interior design,
          exterior design, construction, architecture of private and commercial
          facilities, the company is recognized all over the world and has won
          numerous prestigious awards, in particular the International Property
          Awards.
        </p>

        <p className="ci-paragraph">
          The ability to subtly capture modern trends, adapt them to modern
          needs, implementing the highest standards of quality, allows us to fulfill
          the boldest dreams of customers all over the world, going beyond the
          usual notion of design. Due to the dynamic growth, development and
          numerous enquiries from the United Arab Emirates, Solomia LLC now has
          a presence in Dubai, in the world's largest shopping and entertainment
          center, Dubai Mall.
        </p>

        <p className="ci-paragraph">
          Here, in the heart of Downtown, we help our clients create the home of
          their dreams, ensuring that every customized detail best reflects the
          character and lifestyle of its owners.
        </p>

        <div className="ci-social-icons">
          <a href="#" className="ci-icon"><FaWhatsapp /></a>
          <a href="#" className="ci-icon"><FaInstagram /></a>
        </div>
      </div>

      <div className="ci-right">
        <div className="ci-video-wrapper">
          <video
            ref={videoRef}
            className="ci-video"
            poster="https://www.solomia-home.ae/storage/uploads/2024/10/image-9-640w.jpg"  // adjust path to thumbnail image
            onClick={handleToggle}
            onEnded={handleVideoEnded}
          >
            <source src='https://www.solomia-home.ae/storage/IMG_7898.MP4' type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div
            className={`ci-overlay ${isPaused ? "ci-overlay-show" : "ci-overlay-hide"}`}
            onClick={handleToggle}
          >
            <img
              src={isPaused ? playIcon : pauseIcon}
              alt={isPaused ? "Play" : "Pause"}
              className="ci-overlay-icon"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyIntroSection;
