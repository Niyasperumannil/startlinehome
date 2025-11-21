import React, { useState, useEffect } from "react";
import axios from "axios";

const API = "https://starlinegroup.ae/api"; // Use correct base URL

export default function NewsPanel() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

  const [newsList, setNewsList] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await axios.get(`${API}/news/`);
      setNewsList(res.data);
    } catch (error) {
      console.error("FETCH NEWS ERROR:", error);
      setMsg("Error fetching news");
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Admin not logged in");
      return;
    }
    if (!window.confirm("Delete this news?")) return;

    try {
      await axios.delete(`${API}/news/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNews();
    } catch (error) {
      console.error("DELETE ERROR:", error);
      setMsg("Error deleting news");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setMsg("Admin not logged in — No token");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("date", date);
    formData.append("image", file);

    try {
      await axios.post(`${API}/news/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          // Do NOT set Content-Type so browser can add the boundary
        },
      });

      setMsg("News added successfully!");
      setTitle("");
      setDesc("");
      setDate("");
      setFile(null);
      fetchNews();
    } catch (error) {
      console.error("SUBMIT ERROR:", error);
      setMsg("Error adding news");
    }
  };

  // Filter news list by search text (optional)
  const filteredNews = newsList.filter((item) => {
    const text = search.toLowerCase();
    return (
      item.title.toLowerCase().includes(text) ||
      item.desc.toLowerCase().includes(text)
    );
  });

  return (
    <div style={{ padding: "40px", background: "#eef2f3", minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Search news"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px 15px",
            width: 260,
            border: "1px solid #ccc",
            borderRadius: 6,
            marginRight: 10,
          }}
        />
        <button onClick={fetchNews} style={topButton}>Refresh</button>
      </div>

      <div style={{ display: "flex", gap: "25px" }}>
        {/* LEFT PANEL: News List */}
        <div style={leftCard}>
          <h2 style={sectionTitle}>News List</h2>

          {filteredNews.length === 0 ? (
            <p style={{ color: "#777", fontSize: 16 }}>No news found.</p>
          ) : (
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Image</th>
                  <th style={thStyle}>Title</th>
                  <th style={thStyle}>Description</th>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredNews.map((item) => (
                  <tr key={item._id} style={rowStyle}>
                    <td style={tdStyle}>
                      {item.image && (
                        <img
                          src={`${API}${item.image}`}
                          alt={item.title}
                          style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 4 }}
                        />
                      )}
                    </td>
                    <td style={tdStyle}>{item.title}</td>
                    <td style={tdStyle}>{item.desc}</td>
                    <td style={tdStyle}>{item.date}</td>
                    <td style={tdStyle}>
                      <button onClick={() => handleDelete(item._id)} style={deleteBtn}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* RIGHT PANEL: Add News */}
        <div style={rightCard}>
          <h2 style={sectionTitle}>Add News</h2>

          {msg && <div style={errorBox}>{msg}</div>}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={input}
            />
            <textarea
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
              style={textarea}
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              style={input}
            />
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              required
              style={input}
            />

            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              <button type="submit" style={addBtn}>Add News</button>
              <button
                type="button"
                onClick={() => {
                  setTitle(""); setDesc(""); setDate(""); setFile(null); setMsg("");
                }}
                style={cancelBtn}
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/* Styles */
const topButton = { padding: "10px 18px", borderRadius: 6, border: "1px solid #ccc", background: "#fff", cursor: "pointer", fontSize: 14 };
const leftCard = { flex: 2, background: "white", padding: "25px", borderRadius: 12, boxShadow: "0 2px 15px rgba(0,0,0,0.1)" };
const rightCard = { flex: 1, background: "white", padding: "25px", borderRadius: 12, boxShadow: "0 2px 15px rgba(0,0,0,0.1)" };
const sectionTitle = { fontSize: 22, fontWeight: "bold", marginBottom: 20 };
const input = { width: "100%", padding: "12px", border: "1px solid #ccc", borderRadius: 6, marginBottom: 15 };
const textarea = { width: "100%", minHeight: 90, padding: "12px", border: "1px solid #ccc", borderRadius: 6, marginBottom: 15 };
const addBtn = { padding: "10px 20px", background: "#0d6efd", color: "white", border: "none", borderRadius: 6, cursor: "pointer" };
const cancelBtn = { padding: "10px 20px", background: "#ddd", border: "none", borderRadius: 6, cursor: "pointer" };
const deleteBtn = { background: "#dc3545", color: "white", padding: "6px 12px", border: "none", borderRadius: 4, cursor: "pointer" };
const tableStyle = { width: "100%", borderCollapse: "collapse" };
const thStyle = { padding: "12px", borderBottom: "2px solid #ddd", textAlign: "left" };
const tdStyle = { padding: "12px", borderBottom: "1px solid #eee" };
const rowStyle = { background: "white" };
const errorBox = { background: "#ffe2e2", padding: "10px", color: "#c40000", borderRadius: 6, marginBottom: 15 };
