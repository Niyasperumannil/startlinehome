// src/pages/FurnitureApp.jsx
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

/*
  Single-file Furniture CRUD Admin UI
  - Backend expected at: http://157.173.219.218:5008/api/furniture
  - Token read from localStorage key: "adminToken"
  - Image upload uses FormData with field name "img" (matches backend middleware)
*/

const API_BASE = "http://157.173.219.218:5008/api/furniture";
const TOKEN_KEY = "adminToken";

export default function FurnitureApp() {
  // Data & UI state
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  // Form state
  const [form, setForm] = useState({
    name: "",
    title: "",
    brand: "",
    price: "",
    imgFile: null, // File object
  });

  const [editId, setEditId] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(null);
  const fileInputRef = useRef(null);

  // Inject component CSS
  useEffect(() => {
    const css = `
      .fa-app { font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; padding: 18px; max-width: 1100px; margin: 24px auto; color: #111; }
      .fa-top { display:flex; gap:12px; justify-content:space-between; align-items:center; margin-bottom:18px; }
      .fa-title { font-size:20px; font-weight:700; }
      .fa-controls { display:flex; gap:8px; align-items:center; }
      .fa-search { padding:8px 12px; border-radius:8px; border:1px solid #ddd; min-width:220px; }
      .fa-grid { display:grid; grid-template-columns: 1fr 360px; gap:18px; align-items:start; }
      .fa-list { background:#fff; border-radius:12px; padding:12px; box-shadow:0 6px 18px rgba(16,24,40,0.06); min-height:200px; }
      .fa-item { display:flex; gap:12px; padding:10px; border-bottom:1px solid #f1f1f5; align-items:center; }
      .fa-item:last-child{border-bottom:none;}
      .fa-thumb { width:120px; height:80px; border-radius:8px; object-fit:cover; background:#eee; }
      .fa-meta { flex:1; }
      .fa-name { font-weight:600; font-size:15px; color:#0f172a; }
      .fa-brand { font-size:13px; color:#475569; margin-top:4px; }
      .fa-price { font-size:13px; color:#0ea5a4; margin-top:6px; font-weight:600; }
      .fa-actions { display:flex; gap:8px; }
      .fa-btn { border:1px solid #0f172a; background:transparent; padding:6px 10px; border-radius:8px; cursor:pointer; font-size:13px; }
      .fa-btn.primary { background:#0f172a; color:white; border-color:transparent; }
      .fa-panel { background:#fff; padding:14px; border-radius:12px; box-shadow:0 6px 18px rgba(16,24,40,0.06); }
      .fa-form { display:flex; flex-direction:column; gap:10px; }
      .fa-input, .fa-text { padding:10px 12px; border-radius:8px; border:1px solid #e6e9ef; font-size:14px; width:100%; }
      .fa-file-wrap { display:flex; gap:10px; align-items:center; }
      .fa-preview { width:100%; height:160px; border-radius:8px; object-fit:cover; background:#f8fafc; border:1px dashed #e6e9ef; }
      .fa-row { display:flex; gap:8px; }
      .fa-msg { color:#ef4444; font-size:13px; }
      .fa-info { color:#64748b; font-size:13px; }
      .fa-empty { padding:28px; text-align:center; color:#94a3b8; }
      @media (max-width:900px){
        .fa-grid { grid-template-columns: 1fr; }
        .fa-thumb { width:86px; height:64px; }
      }
    `;
    const id = "fa-styles";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.appendChild(document.createTextNode(css));
      document.head.appendChild(style);
    }
  }, []);

  const loadItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(API_BASE);
      setItems(res.data || []);
    } catch (err) {
      setError("Failed to load furniture. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imgFile") {
      const file = files && files[0] ? files[0] : null;
      setForm((s) => ({ ...s, imgFile: file }));
      if (file) {
        const url = URL.createObjectURL(file);
        setPreviewSrc(url);
      } else {
        setPreviewSrc(null);
      }
    } else {
      setForm((s) => ({ ...s, [name]: value }));
    }
  };

  const validateForm = () => {
    if (!form.name?.trim()) return "Name is required";
    if (!form.title?.trim()) return "Title is required";
    if (!form.brand?.trim()) return "Brand is required";
    if (!form.price?.trim()) return "Price is required";
    if (!editId && !form.imgFile) return "Image is required for new furniture";
    return null;
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const handleSubmit = async () => {
    setError(null);
    const v = validateForm();
    if (v) {
      setError(v);
      return;
    }

    setSubmitLoading(true);
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("title", form.title);
      fd.append("brand", form.brand);
      fd.append("price", form.price);
      if (form.imgFile) fd.append("img", form.imgFile);

      if (editId) {
        await axios.put(`${API_BASE}/${editId}`, fd, {
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axios.post(API_BASE, fd, {
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "multipart/form-data",
          },
        });
      }

      await loadItems();
      resetForm();
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to save furniture";
      setError(msg);
    } finally {
      setSubmitLoading(false);
    }
  };

  const startEdit = (item) => {
    setEditId(item._id);
    setForm({
      name: item.name || "",
      title: item.title || "",
      brand: item.brand || "",
      price: item.price || "",
      imgFile: null,
    });

    setPreviewSrc(item.img ? `http://157.173.219.218:5008${item.img}` : null);

    if (fileInputRef.current) fileInputRef.current.value = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setEditId(null);
    setForm({ name: "", title: "", brand: "", price: "", imgFile: null });
    setPreviewSrc(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setError(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this furniture item? This cannot be undone.")) return;
    try {
      await axios.delete(`${API_BASE}/${id}`, {
        headers: { ...getAuthHeaders() },
      });
      await loadItems();
    } catch (err) {
      setError("Failed to delete item");
    }
  };

  const filtered = items.filter((it) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      (it.name || "").toLowerCase().includes(q) ||
      (it.brand || "").toLowerCase().includes(q) ||
      (it.title || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="fa-app">
      <div className="fa-top">
        <div className="fa-title">Furniture Admin — CRUD</div>

        <div className="fa-controls">
          <input
            className="fa-search"
            placeholder="Search by name, title or brand"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="fa-btn" onClick={loadItems}>Refresh</button>
          <button
            className="fa-btn primary"
            onClick={() => { resetForm(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          >
            New Item
          </button>
        </div>
      </div>

      <div className="fa-grid">
        <div className="fa-list fa-panel">
          <h3 style={{ marginTop: 0, marginBottom: 8 }}>Furniture List {loading ? " (loading...)" : ""}</h3>

          {error && <div className="fa-msg" style={{ marginBottom: 10 }}>{error}</div>}

          {!loading && filtered.length === 0 && (
            <div className="fa-empty">No furniture found. Add a new item using the form.</div>
          )}

          {loading && <div className="fa-info">Loading items...</div>}

          {!loading && filtered.map((it) => (
            <div className="fa-item" key={it._id}>
              <img className="fa-thumb" alt={it.title} src={it.img ? `http://157.173.219.218:5008${it.img}` : undefined} />

              <div className="fa-meta">
                <div className="fa-name">{it.name}</div>
                <div className="fa-brand">{it.brand} • {it.title}</div>
                <div className="fa-price">{it.price}</div>
                <div style={{ marginTop: 6, fontSize: 13, color: "#64748b" }}>ID: {it._id}</div>
              </div>

              <div className="fa-actions">
                <button className="fa-btn" onClick={() => startEdit(it)}>Edit</button>
                <button className="fa-btn" onClick={() => handleDelete(it._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        <div className="fa-panel">
          <h3 style={{ marginTop: 0 }}>{editId ? "Edit Furniture" : "Add Furniture"}</h3>

          <div className="fa-form">
            <input
              className="fa-input"
              name="name"
              placeholder="Name (e.g. BURTON)"
              value={form.name}
              onChange={handleChange}
            />
            <input
              className="fa-input"
              name="title"
              placeholder="Title (e.g. Burton Sofa)"
              value={form.title}
              onChange={handleChange}
            />
            <input
              className="fa-input"
              name="brand"
              placeholder="Brand (e.g. Frigerio)"
              value={form.brand}
              onChange={handleChange}
            />
            <input
              className="fa-input"
              name="price"
              placeholder="Price (e.g. From 24,000 AED)"
              value={form.price}
              onChange={handleChange}
            />

            <div className="fa-file-wrap">
              <input
                ref={fileInputRef}
                type="file"
                name="imgFile"
                accept="image/*"
                onChange={handleChange}
              />
              <div style={{ fontSize: 13, color: "#64748b" }}>
                {editId ? "Leave blank to keep existing image." : "Image required."}
              </div>
            </div>

            {previewSrc && (
              <img alt="preview" className="fa-preview" src={previewSrc} />
            )}

            <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
              <button
                className="fa-btn primary"
                onClick={handleSubmit}
                disabled={submitLoading}
              >
                {submitLoading ? (editId ? "Updating..." : "Adding...") : (editId ? "Update Item" : "Add Item")}
              </button>

              <button
                className="fa-btn"
                onClick={resetForm}
                disabled={submitLoading}
              >
                Cancel
              </button>
            </div>

            <div style={{ marginTop: 8, fontSize: 13, color: "#94a3b8" }}>
              Tip: Make sure your backend server is running and the upload folder exists at <code>/uploads/furniture</code>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
