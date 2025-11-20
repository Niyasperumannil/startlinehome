import React, { useEffect, useState } from "react";
import "./ItalianCollection.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function ItalianCollection() {
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const API = "http://localhost:5008/api/furniture";

  // Fetch furniture from backend
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(API);
        const data = await res.json();
        setItems(data);
        setFiltered(data);
      } catch (err) {
        console.error("Failed to fetch furniture", err);
      }
    };
    load();
  }, []);

  // Search filter
  useEffect(() => {
    const s = search.toLowerCase();
    const f = items.filter(
      (p) =>
        p.name?.toLowerCase().includes(s) ||
        p.title?.toLowerCase().includes(s) ||
        p.brand?.toLowerCase().includes(s)
    );
    setFiltered(f);
  }, [search, items]);

  return (
    <div className="italian-collection">
      {/* Header / Title */}
      <header className="ic-header">
        <h1 className="ic-title">Furniture</h1>

        {/* Search + Filters */}
        <div className="ic-controls">
          <div className="ic-search-wrap">
            <span className="ic-search-icon">
              <i className="fas fa-search"></i>
            </span>

            <input
              className="ic-search"
              type="text"
              placeholder="Find italian furniture"
              aria-label="Find italian furniture"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="ic-chips">
            {[
              "Ottomans",
              "Chairs",
              "Lighting",
              "Benches",
              "Tables",
              "Outdoor Furniture",
              "Mirrors",
              "Armchairs",
              "Stools",
              "Finishes",
              "Sofas",
            ].map((c) => (
              <button key={c} className="ic-chip">
                {c}
              </button>
            ))}
          </div>

          <div className="ic-filters-row">
            <div className="ic-select-wrap">
              <label className="ic-select-label">Brand</label>
              <select className="ic-select">
                <option>All brands</option>
                <option>Versace Home</option>
                <option>Frigerio</option>
              </select>
            </div>

            <div className="ic-select-wrap">
              <label className="ic-select-label">Sort by</label>
              <select className="ic-select">
                <option>Sort by popularity</option>
                <option>Price: low to high</option>
                <option>Price: high to low</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Product Grid */}
      <main className="ic-grid-wrap">
        <div className="ic-grid">
          {filtered.map((p) => (
            <article className="ic-card" key={p._id}>
              <div className="ic-image-wrap">
                <img
                  src={`http://localhost:5008${p.img}`}
                  alt={p.title}
                  className="ic-image"
                />
              </div>

              <div className="ic-card-footer">
                <div className="ic-card-info">
                  <div className="ic-product-name">{p.name}</div>
                  <div className="ic-product-meta">
                    <span className="ic-brand">{p.brand}</span>
                    <span className="ic-price">{p.price}</span>
                  </div>
                </div>

                <div className="ic-card-actions">
                  <button className="ic-more">MORE INFO</button>
                  <button className="ic-add">BOOK NOW</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
