import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Hero from './pages/Hero/Hero';
import AboutPage from './pages/AboutPage/AboutPage';
import ProjectsPage from './pages/ProjectsPage/ProjectsPage';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import FurniturePage from './pages/FurniturePage/FurniturePage';
import ShowroomPage from './pages/ShowroomPage/ShowroomPage';
import ServicesPage from './pages/ServicesPage/ServicesPage';
import ContactsPage from './pages/ContactsPage/ContactsPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/CatalogPage" element={<CatalogPage />} />
      <Route path="/Furniture" element={<FurniturePage />} />
      <Route path="/Showroom" element={<ShowroomPage/>} />
      <Route path="/Services" element={<ServicesPage />} />
      <Route path="/Contacts" element={<ContactsPage />} />







    </Routes>
  );
};

export default App;