// Footer.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import "./Footer.css";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Interior Design Portfolio */}
        <div className="footer-col">
          <h3 className="footer-heading">{t("footer_portfolio_title")}</h3>
          <ul className="footer-list">
            <li>{t("footer_portfolio_item1")}</li>
            <li>{t("footer_portfolio_item2")}</li>
            <li>{t("footer_portfolio_item3")}</li>
            <li>{t("footer_portfolio_item4")}</li>
            <li>{t("footer_portfolio_item5")}</li>
            <li>{t("footer_portfolio_item6")}</li>
          </ul>
        </div>

        {/* Furniture Brands */}
        <div className="footer-col">
          <h3 className="footer-heading">{t("footer_brands_title")}</h3>
          <ul className="footer-list">
            <li>{t("footer_brand1")}</li>
            <li>{t("footer_brand2")}</li>
            <li>{t("footer_brand3")}</li>
            <li>{t("footer_brand4")}</li>
            <li>{t("footer_brand5")}</li>
          </ul>
        </div>

        {/* Useful Links */}
        <div className="footer-col">
          <h3 className="footer-heading">{t("footer_links_title")}</h3>
          <ul className="footer-list">
            <li>{t("footer_link_about")}</li>
            <li>{t("footer_link_news")}</li>
            <li>{t("footer_link_services")}</li>
            <li>{t("footer_link_contacts")}</li>
          </ul>
        </div>

        {/* Legal */}
        <div className="footer-col">
          <h3 className="footer-heading">{t("footer_legal_title")}</h3>
          <ul className="footer-list">
            <li>{t("footer_legal_privacy")}</li>
            <li>{t("footer_legal_cookie")}</li>
            <li>{t("footer_legal_warranty")}</li>
            <li>{t("footer_legal_delivery")}</li>
            <li>{t("footer_legal_return")}</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col footer-contact">
          <h3 className="footer-heading">{t("footer_contact_title")}</h3>
          <ul className="footer-contactList">
            <li>
              <i className="fa-solid fa-location-dot"></i>
              <span>{t("footer_contact_address")}</span>
            </li>
            <li>
              <i className="fa-brands fa-whatsapp"></i>
              <span>{t("footer_contact_phone")}</span>
            </li>
            <li>
              <i className="fa-solid fa-envelope"></i>
              <span>{t("footer_contact_email")}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-brand">SOLOMIAHOME</div>
        <div className="footer-social">
          <i className="fa-brands fa-whatsapp"></i>
          <i className="fa-brands fa-instagram"></i>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
