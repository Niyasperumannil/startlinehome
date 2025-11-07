// UpdatedSection.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import './UpdatedSection.css';

const UpdatedSection = () => {
  const { t } = useTranslation();

  return (
    <section className="us-section">
      <div className="us-inner">
        <h1 className="us-title">
          <span className="us-titleBold">{t('about_title_line1')}</span> {t('about_title_line2_home')}
        </h1>
        <p className="us-text">
          {/* If you want the “Versace Home” link text to be translated */}
          <a href="#" className="us-link">{t('logo')}</a> {t('about_paragraph1')}
        </p>
      </div>
      <div className="us-buttonGroup">
        <button className="us-btn us-btnOutline us-btnViewAll">{t('projects_button')}</button>
        <button className="us-btn us-btnOutline us-btnFindStore">{t('about_button')}</button>
      </div>
    </section>
  );
};

export default UpdatedSection;
