import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./Navbar.css";
import { FiPhone, FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const newLng = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLng);
  };

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="logo">{t("logo")}</div>
        <button className="lang-btn mobile-lang-btn" onClick={toggleLanguage}>
              {i18n.language === "en" ? t("lang_ar") : t("lang_en")}
            </button>
        {/* Hamburger Button */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
            
        {/* Desktop Navigation */}
        <nav className="nav-links desktop-nav">
          <a href="/about">{t("about")}</a>
          <a href="projects">{t("projects")}</a>
          <a href="CatalogPage">{t("catalog")}</a>
          <a href="Furniture">{t("furniture")}</a>
          <a href="Showroom">{t("showroom")}</a>
          <a href="Services">{t("services")}</a>
          <a href="Contacts">{t("contacts")}</a>
        </nav>

        <div className="nav-right">
          <button className="talk-btn">
            <FiPhone className="phone-icon" />
            <span>{t("letsTalk")}</span>
          </button>
          
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <nav className="nav-links mobile-nav">
          <a href="#about" onClick={() => setMenuOpen(false)}>
            {t("about")}
          </a>
          <a href="#projects" onClick={() => setMenuOpen(false)}>
            {t("projects")}
          </a>
          <a href="#catalog" onClick={() => setMenuOpen(false)}>
            {t("catalog")}
          </a>
          <a href="#furniture" onClick={() => setMenuOpen(false)}>
            {t("furniture")}
          </a>
          <a href="#showroom" onClick={() => setMenuOpen(false)}>
            {t("showroom")}
          </a>
          <a href="#services" onClick={() => setMenuOpen(false)}>
            {t("services")}
          </a>
          <a href="#contacts" onClick={() => setMenuOpen(false)}>
            {t("contacts")}
          </a>

          {/* ✅ Centered Let's Talk and Language buttons for mobile */}
          <div className="mobile-buttons">
            <button className="talk-btn">
              <FiPhone className="phone-icon" />
              <span>{t("letsTalk")}</span>
            </button>
            {/* <button className="lang-btn mobile-lang-btn" onClick={toggleLanguage}>
              {i18n.language === "en" ? t("lang_ar") : t("lang_en")}
            </button> */}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
