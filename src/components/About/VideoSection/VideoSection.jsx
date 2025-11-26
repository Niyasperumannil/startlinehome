// VideoSection.jsx
import React from "react";
import "./VideoSection.css";

const VideoSection = () => {
  return (
    <div className="video-section-container">
      <div className="video-wrapper">
<iframe width="560" height="315" src="https://www.youtube.com/embed/OzUkvzyBttA?si=ihAKsZkz2cCRpwKe" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    </div>
  );
};

export default VideoSection;
