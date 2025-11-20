import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import "./ContactSection.css";

const API = "http://157.173.219.218:5008"; // ✅ UPDATED VPS URL

const ContactSection = () => {
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [checked, setChecked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !phone || !message) {
      alert("Please fill all fields.");
      return;
    }

    if (!checked) {
      alert("Please accept Privacy Policy.");
      return;
    }

    try {
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          message,
          privacyAccepted: checked,
        }),
      });

      const data = await res.json();
      alert("Message sent successfully!");

      setName("");
      setPhone("");
      setMessage("");
      setChecked(false);
    } catch (error) {
      alert("Error sending message.");
    }
  };

  return (
    <section className="contact-container">

      {/* LEFT INFO */}
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
            <span key={i}>{line}<br /></span>
          ))}
        </p>

        <p className="contact-collab">{t("contact_collab")}</p>
      </div>

      {/* RIGHT FORM */}
      <div className="contact-right">
        <form className="contact-form" onSubmit={handleSubmit}>

          <label>{t("contact_form_name")}</label>
          <input
            type="text"
            placeholder={t("contact_form_name")}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>{t("contact_form_phone")}</label>
          <input
            type="text"
            placeholder="+971"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <label>{t("contact_form_message") || "Message"}</label>
          <textarea
            placeholder={t("contact_form_message") || "Type your message..."}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          <div className="contact-checkbox">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
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
