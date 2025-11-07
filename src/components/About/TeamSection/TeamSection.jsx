import React from "react";
import "./TeamSection.css";
// import teamImage from "./team-image.jpg"; // replace with your image file

const TeamSection = () => {
  return (
    <section className="team-section">
      <img src="https://www.solomia-home.ae/storage/IMG_0217-2560w.jpg" alt="Team" className="team-image" />
      <div className="overlay">
        <div className="member member-left">
          <p className="name">Luca<br />Bacci</p>
          <p className="role">CEO</p>
        </div>
        <div className="member member-center">
          <p className="name">Svitlana<br />Antonovych</p>
          <p className="role">Cofounder</p>
        </div>
        <div className="member member-right">
          <p className="name">Dmytro<br />Korotchuk</p>
          <p className="role">Founder</p>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
