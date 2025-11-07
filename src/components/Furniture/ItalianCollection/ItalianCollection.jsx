import React from "react";
import "./ItalianCollection.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const PRODUCTS = [
  {
    id: 1,
    name: "BURTON",
    title: "Burton Sofa",
    brand: "Frigerio",
    price: "From 24,000 AED",
    img: "https://www.solomia-home.ae/storage/frigerio/frigerio-burton-1-640w.jpg"
  },
  {
    id: 2,
    name: "VERSACE GALAXY SUSPENSION",
    title: "Versace Galaxy Suspension",
    brand: "Versace Home",
    price: "From 5,300 AED",
    img: "https://www.solomia-home.ae/storage/Versace%20Home/versace-galaxy-suspension/versace-home-versace-galaxy-suspension-lamp-01-off.jpg"
  },
  {
    id: 3,
    name: "HAREM ARMCHAIR",
    title: "Harem Armchair",
    brand: "Versace Home",
    price: "From 3,400 AED",
    img: "https://www.solomia-home.ae/storage/Versace%20Home/haremarmchair/versace-home-harem-armchair-aqua.webp"
  },
  {
    id: 4,
    name: "ACANTHO ARMCHAIR",
    title: "Acantho Armchair",
    brand: "Versace Home",
    price: "From 2,700 AED",
    img: "https://www.solomia-home.ae/storage/Versace%20Home/acanthoarmchair/versace-home-acantho-armchair.jpg"
  }
];

export default function ItalianCollection() {
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
            />
          </div>

          <div className="ic-chips">
            {/* category chips — keep some examples, change as needed */}
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
              "Sofas"
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
          {PRODUCTS.map((p) => (
            <article className="ic-card" key={p.id}>
              <div className="ic-image-wrap">
                <img src={p.img} alt={p.title} className="ic-image" />
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
                  <button className="ic-add">ADD TO CART</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
