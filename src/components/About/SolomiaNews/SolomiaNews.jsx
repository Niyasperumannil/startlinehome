import React, { useRef } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import navigation hook
import "./SolomiaNews.css";

const newsItems = [
  {
    id: 1,
    date: "18/04/2025",
    title: "SOLOMIA HOME FURNITURE IN DUBAI FROM MILAN. NEW COLLECTION.",
    desc: "April 8–13, the most anticipated event for all professionals...",
    img: "https://www.solomia-home.ae/storage/news/solomia-home-furniture-in-dubai-from-milan-new-collection-960w.jpg",
  },
  {
    id: 2,
    date: "31/03/2025",
    title:
      "GRAND OPENING OF THE FIRST VERSACE HOME SHOWROOM BY SOLOMIA HOME IN ZABEEL DUBAI MALL",
    desc: "",
    img: "https://www.solomia-home.ae/storage/Solomia%20Home.%20Dubai/Versace-Home-Dubai-grand-opening.jpeg",
  },
  {
    id: 3,
    date: "26/02/2025",
    title:
      "SOLOMIA HOME AT INTERNATIONAL PROPERTY AWARDS 2025: AN INTERIOR THAT CONQUERS THE WORLD",
    desc: "",
    img: "https://www.solomia-home.ae/storage/International%20Property%20Awards%202025/Solomia-Home-at-International-Property-Awards-1.JPG",
  },
  {
    id: 4,
    date: "03/02/2025",
    title:
      "VERSACE HOME LAUNCHES A NEW COLLECTION BY SOLOMIA HOME DUBAI MALL",
    desc: "",
    img: "https://www.solomia-home.ae/storage/B&B%20Italia/A/a/cover%20.jpeg",
  },
];

export default function SolomiaNews() {
  const marqueeRef = useRef(null);
  const navigate = useNavigate(); // ✅ useNavigate hook

  const handleNext = () => {
    if (marqueeRef.current) {
      marqueeRef.current.scrollBy({
        left: 420,
        behavior: "smooth",
      });
    }
  };

  const handlePrev = () => {
    if (marqueeRef.current) {
      marqueeRef.current.scrollBy({
        left: -420,
        behavior: "smooth",
      });
    }
  };

  const handleCardClick = (id) => {
    navigate(`/news/${id}`); // ✅ Navigate to internal route
  };

  return (
    <div className="news-wrapper">
      <div className="news-header">
        <h2 className="so-heading">
          Solomia<br />
          <span className="so-heading-light">home news</span>
        </h2>

        <div className="nav-buttons">
          <button className="prev-btn" onClick={handlePrev}>
            <span className="arrow">←</span>
          </button>
          <button className="next-btn" onClick={handleNext}>
            <span className="arrow">→</span>
          </button>
        </div>
      </div>

      <div className="news-marquee" ref={marqueeRef}>
        {newsItems.map((item) => (
          <div
            className="news-card"
            key={item.id}
            onClick={() => handleCardClick(item.id)} // ✅ Navigate on click
          >
            <img src={item.img} alt={item.title} className="news-img" />
            <p className="news-date">{item.date}</p>
            <h2 className="news-headline">{item.title}</h2>
            {item.desc && <p className="news-desc">{item.desc}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
