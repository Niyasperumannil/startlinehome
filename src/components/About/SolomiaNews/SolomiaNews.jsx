import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SolomiaNews.css";
import axios from "axios";

const API = "http://157.173.219.218:5008";

export default function SolomiaNews() {
  const marqueeRef = useRef(null);
  const navigate = useNavigate();

  const [newsItems, setNewsItems] = useState([]);

  // Fetch news from backend
  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await axios.get(`${API}/api/news/`);
      setNewsItems(res.data);
    } catch (error) {
      console.log("FETCH NEWS ERROR:", error);
    }
  };

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
    navigate(`/news/${id}`);
  };

  return (
    <div className="news-wrapper">
      <div className="news-header">
        <h2 className="so-heading">
          Starline<br />
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
            key={item._id}
            onClick={() => handleCardClick(item._id)}
          >
            <img
              src={`${API}${item.image}`}
              alt={item.title}
              className="news-img"
            />
            <p className="news-date">{item.date}</p>
            <h2 className="news-headline">{item.title}</h2>
            {item.desc && <p className="news-desc">{item.desc}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
