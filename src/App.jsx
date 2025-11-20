import React from "react";
import { Routes, Route } from "react-router-dom";

import Hero from "./pages/Hero/Hero";
import AboutPage from "./pages/AboutPage/AboutPage";
import ProjectsPage from "./pages/ProjectsPage/ProjectsPage";
import CatalogPage from "./pages/CatalogPage/CatalogPage";
import FurniturePage from "./pages/FurniturePage/FurniturePage";
import ShowroomPage from "./pages/ShowroomPage/ShowroomPage";
import ServicesPage from "./pages/ServicesPage/ServicesPage";
import ContactsPage from "./pages/ContactsPage/ContactsPage";

import ProjectDetail from "./pages/ProjectDetails/ProjectDetails.jsx";

import AdminLogin from "./components/AdminPage/AdminLogin/AdminLogin";
import AdminProfile from "./components/AdminPage/AdminProfile/AdminProfile";

import useToken from "./utils/useToken";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  const { token, setToken, clearToken } = useToken();

  return (
    <Routes>

      {/* Public pages */}
      <Route path="/" element={<Hero />} />
      <Route path="/about" element={<AboutPage />} />

      {/* Projects */}
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/projects/:id" element={<ProjectDetail />} />

      <Route path="/CatalogPage" element={<CatalogPage />} />
      <Route path="/Furniture" element={<FurniturePage />} />
      <Route path="/Showroom" element={<ShowroomPage />} />
      <Route path="/Services" element={<ServicesPage />} />
      <Route path="/Contacts" element={<ContactsPage />} />

      {/* Admin */}
      <Route path="/AdminLogin" element={<AdminLogin setToken={setToken} />} />

      {/* PROTECTED ROUTE */}
      <Route
        path="/AdminMain"
        element={
          <ProtectedRoute token={token}>
            <AdminProfile token={token} clearToken={clearToken} />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
