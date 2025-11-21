import React, { useState, useEffect } from "react";
import axios from "axios";

const API = "https://starlinegroup.ae/api/services"; // ✅ UPDATED API BASE URL

export default function AddService() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get(`${API}/`);
      setServices(res.data);
    } catch (error) {
      console.log("FETCH ERROR:", error);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Admin not logged in");
    if (!window.confirm("Delete this service?")) return;

    try {
      await axios.delete(`${API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchServices();
    } catch (error) {
      console.log("DELETE ERROR:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      setMsg("Admin not logged in — No token found.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", desc);
    formData.append("image", file);

    try {
      await axios.post(`${API}/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMsg("Service added successfully!");
      setTitle("");
      setDesc("");
      setFile(null);
      fetchServices();
    } catch (error) {
      console.log("AXIOS ERROR:", error);
      setMsg("Failed — Admin not logged in OR invalid token.");
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Inter, sans-serif",
        background: "#eef2f4",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ marginBottom: "25px", fontSize: "28px", color: "#111" }}>
        Services Admin — CRUD
      </h2>

      {/* 2 COLUMN LAYOUT */}
      <div style={{ display: "flex", gap: "30px" }}>
        
        {/* LEFT — SERVICE LIST CARD */}
        <div
          style={{
            flex: 2,
            background: "#ffffff",
            padding: "25px",
            borderRadius: "14px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          <h3 style={{ marginBottom: "15px", color: "#111" }}>Services List</h3>

          {services.length === 0 ? (
            <p style={{ color: "#6c757d", padding: "20px" }}>
              No Services found. Add a new item using the form.
            </p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={th}>Image</th>
                    <th style={th}>Title</th>
                    <th style={th}>Description</th>
                    <th style={th}>Created</th>
                    <th style={th}>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {services.map((srv) => (
                    <tr key={srv._id} style={row}>
                      <td style={td}>
                        <img
                          src={`https://starlinegroup.ae${srv.image}`}
                          style={{
                            width: 60,
                            height: 60,
                            borderRadius: "8px",
                            objectFit: "cover",
                          }}
                        />
                      </td>
                      <td style={td}>{srv.title}</td>
                      <td style={td}>{srv.description}</td>
                      <td style={td}>
                        {new Date(srv.createdAt).toLocaleDateString()}
                      </td>
                      <td style={td}>
                        <button style={btnDelete} onClick={() => handleDelete(srv._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* RIGHT — ADD ITEM CARD */}
        <div
          style={{
            flex: 1,
            background: "white",
            padding: "25px",
            borderRadius: "14px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          <h3 style={{ marginBottom: "10px", color: "#111" }}>Add Services</h3>

          {msg && (
            <p
              style={{
                background: "#fdecea",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #e8b4b4",
                color: "#bb0000",
              }}
            >
              {msg}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title (e.g., Sofa)"
              style={input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              placeholder="Description"
              style={textarea}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />

            <label style={{ fontSize: "14px", marginBottom: "6px" }}>Image</label>
            <input
              type="file"
              style={fileInput}
              onChange={(e) => setFile(e.target.files[0])}
            />

            <button style={btnAdd}>Add Item</button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* Styles */
const input = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  marginBottom: "15px",
  fontSize: "15px",
};

const textarea = {
  ...input,
  minHeight: "100px",
};

const fileInput = {
  padding: "8px 0",
  marginBottom: "15px",
};

const btnAdd = {
  background: "#0C1D36",
  color: "white",
  padding: "10px 18px",
  fontSize: "15px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  marginTop: "5px",
};

const btnDelete = {
  background: "#d9534f",
  color: "white",
  padding: "6px 14px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const th = {
  background: "#f3f3f3",
  padding: "12px",
  textAlign: "left",
  fontWeight: "600",
  fontSize: "14px",
};

const td = {
  padding: "12px",
  borderBottom: "1px solid #eee",
  fontSize: "14px",
};

const row = {
  background: "#fff",
};
