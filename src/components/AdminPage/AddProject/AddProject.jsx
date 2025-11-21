import React, { useState, useEffect } from "react";
import axios from "axios";

const API = "https://starlinegroup.ae/api";  
const STATIC_BASE = "https://starlinegroup.ae/uploads/projects"; // base URL for static images

export default function AddProject() {
  const [token, setToken] = useState("");
  const [projects, setProjects] = useState([]);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");

  const [coverImage, setCoverImage] = useState(null);
  const [gallery, setGallery] = useState([]);

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // Load token and fetch projects once
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);
    fetchProjects();
  }, []);

  // FETCH PROJECT LIST
  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API}/projects/`);
      setProjects(res.data);
    } catch (err) {
      console.error("FETCH PROJECTS ERROR:", err);
    }
  };

  // Delete project
  const deleteProject = async (id) => {
    if (!window.confirm("Are you sure want to delete?")) return;

    try {
      await axios.delete(`${API}/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProjects();
    } catch (err) {
      console.error("DELETE ERROR:", err);
    }
  };

  // Handle files
  const handleCoverChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0]);
    }
  };

  const handleGalleryChange = (e) => {
    if (e.target.files) {
      setGallery([...e.target.files]);
    }
  };

  // SUBMIT PROJECT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    if (!token) {
      setMsg("No token found. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("subtitle", subtitle);
      formData.append("description", description);

      if (coverImage) {
        formData.append("coverImage", coverImage);
      }
      gallery.forEach((img) => {
        formData.append("gallery", img);
      });

      await axios.post(`${API}/projects/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMsg("Project Added Successfully!");

      // reset form
      setTitle("");
      setSubtitle("");
      setDescription("");
      setCoverImage(null);
      setGallery([]);

      // reload projects
      fetchProjects();
    } catch (err) {
      console.error("UPLOAD ERROR:", err.response?.data || err);
      setMsg("Error adding project!");
    }

    setLoading(false);
  };

  return (
    <div style={{ width: "95%", margin: "20px auto", fontFamily: "Inter" }}>
      {/* Top Right Bar */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
        <input
          type="text"
          placeholder="Search by title"
          style={{
            padding: "10px 14px",
            borderRadius: 8,
            border: "1px solid #ccc",
            width: 260,
          }}
        />

        <button
          onClick={fetchProjects}
          style={{
            padding: "10px 18px",
            borderRadius: 8,
            border: "1px solid #aaa",
            background: "#f2f2f2",
            cursor: "pointer",
          }}
        >
          Refresh
        </button>

        <button
          style={{
            padding: "10px 18px",
            borderRadius: 8,
            background: "#000",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => {
            // maybe scroll to form or clear form for new item
            setTitle("");
            setSubtitle("");
            setDescription("");
            setCoverImage(null);
            setGallery([]);
            setMsg("");
          }}
        >
          New Item
        </button>
      </div>

      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        {/* Left Side — Project List */}
        <div
          style={{
            flex: 1,
            background: "white",
            padding: 25,
            borderRadius: 12,
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ marginBottom: 10 }}>Project List</h2>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: 10,
            }}
          >
            <thead>
              <tr style={{ background: "#f4f4f4" }}>
                <th style={th}>Cover</th>
                <th style={th}>Title</th>
                <th style={th}>Subtitle</th>
                <th style={th}>Created</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {projects.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    style={{ padding: 20, textAlign: "center", color: "#777" }}
                  >
                    No projects yet — add a new project.
                  </td>
                </tr>
              )}

              {projects.map((project) => (
                <tr key={project._id}>
                  <td style={td}>
                    {project.coverImage ? (
                      <img
                        src={`${STATIC_BASE}/${project.coverImage}`}
                        alt={project.title}
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 6,
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <span style={{ color: "#777" }}>No image</span>
                    )}
                  </td>

                  <td style={td}>{project.title}</td>
                  <td style={td}>{project.subtitle}</td>
                  <td style={td}>
                    {new Date(project.createdAt).toLocaleDateString()}
                  </td>

                  <td style={td}>
                    <button
                      onClick={() => deleteProject(project._id)}
                      style={{
                        background: "#d9534f",
                        border: "none",
                        color: "white",
                        padding: "6px 12px",
                        borderRadius: 6,
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Side — Add Project Form */}
        <div
          style={{
            width: 420,
            background: "white",
            padding: 25,
            borderRadius: 12,
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          <h2>Add Project</h2>

          {msg && (
            <p style={{ marginBottom: 15, color: "green", fontWeight: 600 }}>
              {msg}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={title}
              placeholder="Project Title"
              required
              onChange={(e) => setTitle(e.target.value)}
              style={input}
            />

            <input
              type="text"
              value={subtitle}
              placeholder="Subtitle"
              onChange={(e) => setSubtitle(e.target.value)}
              style={input}
            />

            <textarea
              rows={4}
              value={description}
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              style={textarea}
            />

            <label
              style={{ marginTop: 10, display: "block", fontWeight: 600 }}
            >
              Cover Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverChange}
            />

            {coverImage && (
              <img
                src={URL.createObjectURL(coverImage)}
                alt="preview"
                style={{
                  width: "100%",
                  marginTop: 10,
                  borderRadius: 8,
                }}
              />
            )}

            <label
              style={{ marginTop: 15, display: "block", fontWeight: 600 }}
            >
              Gallery Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleGalleryChange}
            />

            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                marginTop: 10,
              }}
            >
              {gallery.map((img, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(img)}
                  alt={`gallery-${i}`}
                  style={{
                    width: 70,
                    height: 70,
                    objectFit: "cover",
                    borderRadius: 6,
                  }}
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: 15,
                width: "100%",
                padding: 12,
                background: "black",
                color: "white",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              {loading ? "Uploading…" : "Add Project"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* Reusable Styles */
const th = {
  padding: 12,
  textAlign: "left",
  fontWeight: 600,
  fontSize: 14,
  borderBottom: "2px solid #ddd",
};

const td = {
  padding: 12,
  fontSize: 14,
  borderBottom: "1px solid #eee",
};

const input = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 8,
  border: "1px solid #ccc",
  marginBottom: 12,
  fontSize: 15,
};

const textarea = {
  width: "100%",
  padding: 12,
  borderRadius: 8,
  border: "1px solid #ccc",
  marginBottom: 12,
  fontSize: 15,
};
