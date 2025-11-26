import React, { useState } from "react";
import "./BeforeAfterSlider.css";

const BeforeAfterSlider = ({
  beforeImage,
  afterImage,
  width = "100%",
  height = "500px",
  backgroundImage,
  heading = "Before / After Comparison",
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value);
  };

  return (
    <div className="before-after-section">

      {/* TOP HEADER */}
      <h2 className="before-after-header">{heading}</h2>

      <div
        className="before-after-container"
        style={{
          width,
          height,
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="before-after-inner"
          style={{ width: `${sliderPosition}%` }}
        >
          <img src={beforeImage} alt="Before" className="before-image" />
        </div>

        <img src={afterImage} alt="After" className="after-image" />

        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          className="slider"
          onChange={handleSliderChange}
        />
      </div>
    </div>
  );
};

// -------------------
// Example Usage
// -------------------
const App = () => {
  return (
    <div style={{ padding: "50px" }}>
      <BeforeAfterSlider
        beforeImage="/Gemini_Generated_Image_4ggfc74ggfc74ggf.png"
        afterImage="/Gemini_Generated_Image_4ggfc74ggfc74ggf.png"
        width="100%"
        height="500px"
        heading="Starline  Before & After Results"
      />
    </div>
  );
};

export default App;
