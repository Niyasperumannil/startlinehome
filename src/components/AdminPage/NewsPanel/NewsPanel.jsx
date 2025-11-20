import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddNews() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

  const [newsList, setNewsList] = useState([]);
  const [search, setSearch] = useState("");

  // Load all news
  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await axios.get("http://localhost:5008/api/news/");
      setNewsList(res.data);
    } catch (error) {
      console.log("FETCH NEWS ERROR:", error);
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
      await axios.delete(`http://localhost:5008/api/news/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchNews();
    } catch (error) {
      console.log("DELETE ERROR:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const TOKEN = localStorage.getItem("token");
    if (!TOKEN) {
      setMsg("Admin not logged in — No token found.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("date", date);
    formData.append("image", file);

    try {
      await axios.post("http://localhost:5008/api/news/create", formData, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMsg("News added successfully!");
      setTitle("");
      setDesc("");
      setDate("");
      setFile(null);

      fetchNews();
    } catch (error) {
      console.log("AXIOS ERROR:", error);
      setMsg("Failed — Admin not logged in OR invalid token.");
    }
  };

  return (
    <div style={{ padding: "40px", background: "#eef2f3", minHeight: "100vh" }}>
      {/* TOP BAR */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Search by name, title or brand"
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

        <button
          onClick={fetchNews}
          style={topButton}
        >
          Refresh
        </button>

        <button
          style={{
            ...topButton,
            background: "#0d6efd",
            color: "white",
          }}
        >
          New Item
        </button>
      </div>

      {/* MAIN 2-COLUMN LAYOUT */}
      <div style={{ display: "flex", gap: "25px" }}>
        
        {/* LEFT PANEL — NEWS LIST */}
        <div style={leftCard}>
          <h2 style={sectionTitle}>News List</h2>

          {newsList.length === 0 ? (
            <p style={{ color: "#777", fontSize: 16 }}>
              No news found. Add a new item using the form.
            </p>
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
                {newsList.map((item) => (
                  <tr key={item._id} style={rowStyle}>
                    <td style={tdStyle}>
                      <img
                        src={`http://localhost:5008${item.image}`}
                        alt=""
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 6,
                          objectFit: "cover",
                        }}
                      />
                    </td>
                    <td style={tdStyle}>{item.title}</td>
                    <td style={tdStyle}>{item.desc}</td>
                    <td style={tdStyle}>{item.date}</td>

                    <td style={tdStyle}>
                      <button
                        onClick={() => handleDelete(item._id)}
                        style={deleteBtn}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* RIGHT PANEL — ADD FORM */}
        <div style={rightCard}>
          <h2 style={sectionTitle}>Add News</h2>

          {msg && (
            <p style={errorBox}>{msg}</p>
          )}

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
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              required
              style={input}
            />

            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              <button type="submit" style={addBtn}>
                Add Item
              </button>
              <button type="reset" style={cancelBtn}>
                Cancel
              </button>
            </div>

            <p style={{ marginTop: 15, color: "#888", fontSize: 13 }}>
              Tip: Make sure your backend server is running and the upload folder exists at /uploads/news.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ************* UI STYLES (Only UI changes) ************* */

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
  minHeight: 400,
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
