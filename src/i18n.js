import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },
    detection: {
      order: ["localStorage", "cookie", "htmlTag", "navigator", "path", "subdomain"],
      caches: ["localStorage", "cookie"],
    },
  });

// ✅ Handle RTL/LTR automatically when language changes
i18n.on("languageChanged", (lng) => {
  const isRTL = lng === "ar";

  document.documentElement.lang = lng;
  document.documentElement.dir = isRTL ? "rtl" : "ltr";

  // Optional: adjust text alignment for RTL
  document.body.style.textAlign = isRTL ? "right" : "left";
  document.body.style.direction = isRTL ? "rtl" : "ltr";
});

export default i18n;
