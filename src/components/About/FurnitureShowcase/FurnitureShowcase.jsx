import React, { useState } from "react";
import "./FurnitureShowcase.css";

export default function FurnitureShowcase() {
  const [active, setActive] = useState(2); // default center card

  const handleSelect = (index) => {
    setActive(index);
  };

  return (
    <div className="furniture-section">
      
      {/* HEADER */}
      <h1 className="awards-title">
        Starline <br />
        <span className="awards-light">Home Collection</span>
      </h1>

      <div className="fs-wrapper">

        {/* CARD 1 */}
        <div
          className={`fs-card ${active === 1 ? "active" : "inactive"}`}
          onClick={() => handleSelect(1)}
          onTouchStart={() => handleSelect(1)}
          onMouseEnter={() => handleSelect(1)}   
        >
          <img src="https://starlinegroup.ae/uploads/projects/1764132317353_fa16050a2e431ba96456250b3aa2a56e.jpg" />
          <div className="fs-label"></div>
        </div>

        {/* CARD 2 */}
        <div
          className={`fs-card ${active === 2 ? "active" : "inactive"}`}
          onClick={() => handleSelect(2)}
          onTouchStart={() => handleSelect(2)}
          onMouseEnter={() => handleSelect(2)}   
        >
          <img src="https://starlinegroup.ae/uploads/projects/1764132317353_fa16050a2e431ba96456250b3aa2a56e.jpg" />
          <h2 className="fs-main-title">Desks + Workstation</h2>
        </div>

        {/* CARD 3 */}
        <div
          className={`fs-card ${active === 3 ? "active" : "inactive"}`}
          onClick={() => handleSelect(3)}
          onTouchStart={() => handleSelect(3)}
          onMouseEnter={() => handleSelect(3)}   
        >
          <img src="https://starlinegroup.ae/uploads/projects/1764132317353_fa16050a2e431ba96456250b3aa2a56e.jpg" />
          <div className="fs-label"></div>
        </div>

        {/* CARD 4 */}
        <div
          className={`fs-card ${active === 4 ? "active" : "inactive"}`}
          onClick={() => handleSelect(4)}
          onTouchStart={() => handleSelect(4)}
          onMouseEnter={() => handleSelect(4)}   
        >
          <img src="https://starlinegroup.ae/uploads/projects/1764132317353_fa16050a2e431ba96456250b3aa2a56e.jpg" />
          <div className="fs-label"></div>
        </div>

      </div>
    </div>
  );
}
