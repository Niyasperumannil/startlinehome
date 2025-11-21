// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import './AdminProfile.css';

import AdminHero from '../../../components/AdminPage/DashBoard/AdminHeroMain/AdminHero';
import AddProject from '../AddProject/AddProject';
import AddSevice from '../AddService/AddService';
import NewsPanel from '../NewsPanel/NewsPanel';
import FurnitureApp from '../FurnitureApp/FurnitureApp';
import AdminMessages from '../AdminMessages/AdminMessages';

// ------------------ SIDEBAR ------------------
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

          {/* 🔴 Show unread badge */}
          {item.unread > 0 && (
            <span className="unread-badge">{item.unread}</span>
          )}
        </li>
      ))}
    </ul>
  </div>
);

// ------------------ PROFILE ------------------
const AdminProfile = ({ token, clearToken }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch("https://starlinegroup.ae/api/admin/profile", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.error(err));
  }, [token]);

  const logout = () => {
    clearToken();
    window.location.href = "/AdminLogin";
  };

  if (!profile) return <p>Loading...</p>;

  return (
 <div
  style={{
    padding: "50px",
    fontFamily: "Inter",
    lineHeight: 1.6,
  }}
>
  <h1 style={{ fontSize: "28px", marginBottom: "10px" }}>
    Welcome, {profile.username}
  </h1>

  {/* Company Details */}
  <div
    style={{
      marginTop: "20px",
      padding: "20px",
      background: "#f7f7f7",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      maxWidth: "500px",
    }}
  >
    <h3 style={{ marginBottom: "10px" }}>Company Details</h3>

    <p style={{ margin: "6px 0" }}>
      <strong>Company Name:</strong> Your Company Name
    </p>

    <p style={{ margin: "6px 0" }}>
      <strong>Email:</strong> yourcompany@email.com
    </p>

    <p style={{ margin: "6px 0" }}>
      <strong>Address:</strong> 123 Example Street, City, Country
    </p>

    <p style={{ margin: "6px 0" }}>
      <strong>Permanent Address:</strong> Full Permanent Address Here
    </p>
  </div>

  <button
    onClick={logout}
    style={{
      marginTop: "25px",
      padding: "10px 20px",
      background: "black",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
    }}
  >
    Logout
  </button>
</div>

  );
};

// ------------------ CONTENT SWITCH ------------------
const Content = ({ current, token, clearToken }) => {
  switch (current) {
    case 'dashboard':
      return (
        <div className="main-content">
          <h3>Dashboard Overview</h3>
          <AdminHero />
        </div>
      );

    case 'users':
      return (
        <div className="main-content">
          <h3>Projects Management</h3>
          <AddProject />
        </div>
      );

    case 'settings':
      return (
        <div className="main-content">
          <h3>Services Management</h3>
          <AddSevice />
        </div>
      );

    case 'news':
      return (
        <div className="main-content">
          <h3>News Management</h3>
          <NewsPanel />
        </div>
      );

    case 'furniture':
      return (
        <div className="main-content">
          <h3>Furniture Management</h3>
          <FurnitureApp />
        </div>
      );

    case 'messages':
      return (
        <div className="main-content">
          <h3>User Messages</h3>
          <AdminMessages />
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

// ------------------ MAIN DASHBOARD ------------------
const Dashboard = ({ token, clearToken }) => {
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [unreadMessages, setUnreadMessages] = useState(0);

  // 🔥 Fetch unread message count every 3 seconds
  useEffect(() => {
    const fetchUnread = () => {
      fetch("https://starlinegroup.ae/api/contact/notifications")
        .then(res => res.json())
        .then(data => setUnreadMessages(data.unread || 0))
        .catch(() => {});
    };

    fetchUnread();
    const interval = setInterval(fetchUnread, 3000);
    return () => clearInterval(interval);
  }, []);

  const items = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'users', label: 'Projects' },
    { id: 'settings', label: 'Services' },
    { id: 'news', label: 'News' },
    { id: 'furniture', label: 'Furniture' },

    // ⭐ Show unread bubble on sidebar
    { id: 'messages', label: 'Messages', unread: unreadMessages },

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
