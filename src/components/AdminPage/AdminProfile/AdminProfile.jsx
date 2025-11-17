// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import './AdminProfile.css';
import AdminHero from '../../../components/AdminPage/DashBoard/AdminHeroMain/AdminHero'
const Sidebar = ({ items, current, onSelect }) => (
  <div className="sidebar">
    <h2 className="sidebar-title">Admin Panel</h2>
    <ul className="sidebar-list">
      {items.map(item => (
        <li
          key={item.id}
          className={`sidebar-item ${current === item.id ? 'active' : ''}`}
          onClick={() => onSelect(item.id)}
        >
          {item.label}
        </li>
      ))}
    </ul>
  </div>
);

const AdminProfile = ({ token, clearToken }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5008/api/admin/profile", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }
        return res.json();
      })
      .then((data) => setProfile(data))
      .catch((err) => {
        console.error(err);
        // optional: clearToken() if unauthorized
      });
  }, [token, clearToken]);

  const logout = () => {
    clearToken();
    window.location.href = "/AdminLogin";
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div style={{ padding: "50px" }}>
      <h1>Welcome, {profile.username}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

const Content = ({ current, token, clearToken }) => {
  switch (current) {
    case 'dashboard':
      return (
        <div className="main-content">
          <h3>Dashboard Overview</h3>
          <p>Here is your dashboard content.</p>
          <AdminHero />
        </div>
      );
    case 'users':
      return (
        <div className="main-content">
          <h3>Users Management</h3>
          <p>Here is your users content.</p>
        </div>
      );
    case 'settings':
      return (
        <div className="main-content">
          <h3>Settings</h3>
          <p>Here are your settings.</p>
        </div>
      );
    case 'profile':
      return (
        <div className="main-content">
          <AdminProfile token={token} clearToken={clearToken} />
        </div>
      );
    default:
      return (
        <div className="main-content">
          <h3>Welcome</h3>
          <p>Select a section from the sidebar.</p>
        </div>
      );
  }
};

const Dashboard = ({ token, clearToken }) => {
  const [currentSection, setCurrentSection] = useState('dashboard');
  const items = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'users', label: 'Users' },
    { id: 'settings', label: 'Settings' },
    { id: 'profile', label: 'My Profile' }
  ];

  return (
    <div className="dashboard-container">
      <Sidebar items={items} current={currentSection} onSelect={setCurrentSection} />
      <Content current={currentSection} token={token} clearToken={clearToken} />
    </div>
  );
};

export default Dashboard;
