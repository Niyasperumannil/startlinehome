import { useEffect, useState } from "react";
import "./AdminHero.css";

// -------------------------------------------
// 🔗 BACKEND URL — CHANGE ONLY THIS
// -------------------------------------------

// For LOCAL development:
const API = "http://localhost:5008";

// For VPS production:
// const API = "http://YOUR_SERVER_IP:5008";   // <--- REPLACE THIS

// -------------------------------------------

export default function AdminHero() {
  const [hero, setHero] = useState(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [location, setLocation] = useState("");
  const [size, setSize] = useState("");
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // ------------------ Fetch Hero ------------------
  const fetchHero = async () => {
    try {
      const res = await fetch(`${API}/api/hero`);
      if (!res.ok) throw new Error("Failed to fetch hero");

      const data = await res.json();
      setHero(data);

      setTitle(data.title);
      setSubtitle(data.subtitle);
      setLocation(data.location);
      setSize(data.size);
    } catch (error) {
      console.error("Error fetching hero:", error);
      alert("Failed to load hero section");
    }
  };

  useEffect(() => {
    fetchHero();
  }, []);

  // ------------------ Add Hero ------------------
  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("subtitle", subtitle);
      formData.append("location", location);
      formData.append("size", size);
      formData.append("video", video);

      const res = await fetch(`${API}/api/hero`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("Hero Created Successfully!");
      fetchHero();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ------------------ Update Hero ------------------
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("subtitle", subtitle);
      formData.append("location", location);
      formData.append("size", size);
      if (video) formData.append("video", video);

      const res = await fetch(`${API}/api/hero`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("Hero Updated Successfully!");
      fetchHero();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero-admin-container">
      <h2 className="heading">Admin Hero Section</h2>

      <form className="hero-form" onSubmit={hero ? handleUpdate : handleAdd}>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Subtitle</label>
        <input
          type="text"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          required
        />

        <label>Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <label>Size</label>
        <input
          type="text"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          required
        />

        <label>Upload Video</label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files[0])}
          className="file-input"
        />

        {hero?.videoUrl && (
          <video
            width="350"
            controls
            className="video-preview"
            src={`${API}${hero.videoUrl}`}
          ></video>
        )}

        <button className="btn" disabled={loading}>
          {loading ? "Please Wait..." : hero ? "Update Hero" : "Add Hero"}
        </button>
      </form>
    </div>
  );
}
