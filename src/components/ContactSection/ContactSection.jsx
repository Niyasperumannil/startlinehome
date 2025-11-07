import React from "react";
import { useTranslation } from "react-i18next";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import "./ContactSection.css";

const ContactSection = () => {
  const { t } = useTranslation();

  return (
    <section className="contact-container">
      <div className="contact-left">
        <h1 className="contact-title">{t("contact_title")}</h1>

        <p className="contact-address">{t("contact_address")}</p>
        <p className="contact-phone">{t("contact_phone")}</p>

        <div className="contact-icons">
          <a href="https://wa.me/971586879414" target="_blank" rel="noreferrer">
            <FaWhatsapp className="icon" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram className="icon" />
          </a>
        </div>

        <p className="contact-email">{t("contact_email")}</p>

        <p className="contact-hours">
          {t("contact_hours").split("\n").map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </p>

        <p className="contact-collab">{t("contact_collab")}</p>
      </div>

      <div className="contact-right">
        <form className="contact-form">
          <label>{t("contact_form_name")}</label>
          <input type="text" placeholder={t("contact_form_name")} />

          <label>{t("contact_form_phone")}</label>
          <input type="text" placeholder="+971" />

          <div className="contact-checkbox">
            <input type="checkbox" />
            <label>
              {t("contact_form_privacy")}{" "}
              <a href="#" className="privacy-link">
                {t("privacy_policy")}
              </a>
            </label>
          </div>

          <button type="submit" className="submit-btn">
            {t("contact_form_submit")}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
