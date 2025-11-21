import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const API = "https://starlinegroup.ae/api";

export default function NewsPanel() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const [newsList, setNewsList] = useState([]);
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await axios.get(`${API}/news/`);
      setNewsList(res.data);
    } catch (err) {
      console.error("FETCH NEWS ERROR:", err);
      setError("Failed to fetch news.");
    }
  };

  const resetForm = () => {
    setTitle("");
    setDesc("");
    setDate("");
    setFile(null);
    setEditingId(null);
    setMsg("");
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      alert("Admin not logged in");
      return;
    }

    if (!window.confirm("Delete this news?")) return;

    try {
      await axios.delete(`${API}/news/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMsg("News deleted successfully");
      fetchNews();
    } catch (err) {
      console.error("DELETE ERROR:", err);
      setError("Failed to delete news.");
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setTitle(item.title);
    setDesc(item.desc);
    setDate(item.date);

    if (fileInputRef.current) fileInputRef.current.value = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    const token = localStorage.getItem("adminToken");
    if (!token) {
      setError("Admin not logged in — No token found.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("date", date);
    if (file) formData.append("image", file);

    try {
      if (editingId) {
        await axios.put(`${API}/news/${editingId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setMsg("News updated successfully!");
      } else {
        await axios.post(`${API}/news/create`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setMsg("News added successfully!");
      }

      resetForm();
      fetchNews();
    } catch (err) {
      console.error("AXIOS ERROR:", err.response || err);
      setError("Operation failed — check your token or input.");
    }
  };

  // Filter based on search
  const filteredNews = newsList.filter((item) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      (item.title && item.title.toLowerCase().includes(q)) ||
      (item.desc && item.desc.toLowerCase().includes(q))
    );
  });

  return (
    <div style={{ padding: "40px", background: "#eef2f3", minHeight: "100vh" }}>
      {/* Top Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Search by title or description"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px 15px",
            width: 300,
            border: "1px solid #ccc",
            borderRadius: 6,
          }}
        />
        <div>
          <button onClick={fetchNews} style={topButton}>
            Refresh
          </button>
          <button
            onClick={resetForm}
            style={{ ...topButton, marginLeft: 10, background: "#0d6efd", color: "white" }}
          >
            {editingId ? "Cancel Edit" : "New News"}
          </button>
        </div>
      </div>

      {/* Layout */}
      <div style={{ display: "flex", gap: "25px" }}>
        {/* List Panel */}
        <div style={leftCard}>
          <h2 style={sectionTitle}>News List</h2>

          {error && <p style={{ color: "red" }}>{error}</p>}

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
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredNews.map((item) => (
                  <tr key={item._id} style={rowStyle}>
                    <td style={tdStyle}>
                      {item.image && (
                        <img
                          src={`https://starlinegroup.ae${item.image}`}
                          alt=""
                          style={{
                            width: 60,
                            height: 60,
                            borderRadius: 6,
                            objectFit: "cover",
                          }}
                        />
                      )}
                    </td>
                    <td style={tdStyle}>{item.title}</td>
                    <td style={tdStyle}>{item.desc}</td>
                    <td style={tdStyle}>{item.date}</td>
                    <td style={tdStyle}>
                      <button onClick={() => handleEdit(item)} style={topButton}>
                        Edit
                      </button>
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

        {/* Form Panel */}
        <div style={rightCard}>
          <h2 style={sectionTitle}>{editingId ? "Edit News" : "Add News"}</h2>

          {msg && (
            <p style={{ ...errorBox, background: "#e0f7e9", color: "#065f46" }}>{msg}</p>
          )}
          {error && <p style={errorBox}>{error}</p>}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="News Title"
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
              ref={fileInputRef}
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              style={input}
            />

            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              <button type="submit" style={addBtn}>
                {editingId ? "Update News" : "Add News"}
              </button>
              <button type="button" onClick={resetForm} style={cancelBtn}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/* STYLES */
const topButton = {
  padding: "10px 18px",
  borderRadius: 6,
  border: "1px solid #ccc",
  background: "#fff",
  cursor: "pointer",
  fontSize: 14,
};

const leftCard = {
  flex: 2,
  background: "white",
  padding: "25px",
  borderRadius: 12,
  boxShadow: "0 2px 15px rgba(0,0,0,0.1)",
};

const rightCard = {
  flex: 1,
  background: "white",
  padding: "25px",
  borderRadius: 12,
  boxShadow: "0 2px 15px rgba(0,0,0,0.1)",
};

const sectionTitle = {
  fontSize: 22,
  fontWeight: "bold",
  marginBottom: 20,
};

const input = {
  width: "100%",
  padding: "12px",
  border: "1px solid #ccc",
  borderRadius: 6,
  marginBottom: 15,
};

const textarea = {
  width: "100%",
  minHeight: 90,
  padding: "12px",
  border: "1px solid #ccc",
  borderRadius: 6,
  marginBottom: 15,
};

const addBtn = {
  padding: "10px 20px",
  background: "#0d6efd",
  color: "white",
  border: "none",
  borderRadius: 6,
  fontSize: 16,
  cursor: "pointer",
};

const cancelBtn = {
  padding: "10px 20px",
  background: "#ddd",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};

const deleteBtn = {
  background: "#dc3545",
  color: "white",
  padding: "6px 12px",
  border: "none",
  borderRadius: 4,
  cursor: "pointer",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const thStyle = {
  padding: "12px",
  borderBottom: "2px solid #ddd",
  textAlign: "left",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #eee",
};

const rowStyle = {
  background: "white",
};

const errorBox = {
  background: "#ffe2e2",
  padding: "10px",
  color: "#c40000",
  borderRadius: 6,
  marginBottom: 15,
  fontWeight: "bold",
};
