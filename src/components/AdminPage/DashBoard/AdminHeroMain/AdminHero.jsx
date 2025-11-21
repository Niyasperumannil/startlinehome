import { useEffect, useState } from "react";
import "./AdminHero.css";

// ✅ Updated API base (remove /api, frontend will call /api/hero)
const API = "https://starlinegroup.ae";

export default function AdminHero() {
  const [hero, setHero] = useState(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [location, setLocation] = useState("");
  const [size, setSize] = useState("");
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch Existing Hero
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

  // Add Hero
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

  // Update Hero
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
    <div style={{ padding: "30px", background: "#eef2f3", minHeight: "100vh" }}>
      <h2 style={{ marginBottom: 25 }}>Admin Hero Section</h2>

      <div style={{ display: "flex", gap: "25px" }}>
        {/* Current Video Section */}
        <div
          style={{
            flex: 1,
            background: "white",
            padding: 20,
            borderRadius: 12,
            boxShadow: "0 2px 15px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <h3 style={{ marginBottom: 15 }}>Current Video</h3>

          {hero?.videoUrl ? (
            <video
              width="100%"
              controls
              style={{
                borderRadius: 10,
                border: "1px solid #ddd",
                maxHeight: 300,
                objectFit: "cover",
              }}
              src={`${API}${hero.videoUrl}`}
            ></video>
          ) : (
            <p style={{ color: "#777" }}>No video uploaded</p>
          )}
        </div>

        {/* Form Section */}
        <div
          style={{
            flex: 1.2,
            background: "white",
            padding: 25,
            borderRadius: 12,
            boxShadow: "0 2px 15px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ marginBottom: 20 }}>{hero ? "Update Hero" : "Add Hero"}</h3>

          <form onSubmit={hero ? handleUpdate : handleAdd}>
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={inputStyle}
            />

            <label>Subtitle</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              required
              style={inputStyle}
            />

            <label>Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              style={inputStyle}
            />

            <label>Size</label>
            <input
              type="text"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              required
              style={inputStyle}
            />

            <label>Upload Video</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
              style={{ marginBottom: 20, padding: 10, borderRadius: 6 }}
            />

            <button style={btnPrimary} disabled={loading}>
              {loading ? "Please Wait..." : hero ? "Update Hero" : "Add Hero"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  border: "1px solid #ccc",
  borderRadius: "6px",
};

const btnPrimary = {
  width: "100%",
  background: "#0d6efd",
  color: "white",
  padding: "12px 0",
  border: "none",
  borderRadius: 6,
  fontSize: 16,
  cursor: "pointer",
};
