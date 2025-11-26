import React, { useState, useEffect } from "react";
import "./BeforeAfterSection.css";

const DashboardStats = () => {
  // Static data
  const projects = [
    { id: 1, name: "Project A", status: "completed" },
    { id: 2, name: "Project B", status: "ongoing" },
    { id: 3, name: "Project C", status: "completed" },
    { id: 4, name: "Project D", status: "ongoing" },
  ];

  const customers = [
    { id: 1, name: "Customer 1" },
    { id: 2, name: "Customer 2" },
    { id: 3, name: "Customer 3" },
  ];

  const [stats, setStats] = useState({
    completedProjects: 0,
    ongoingProjects: 0,
    customers: 0,
  });

  useEffect(() => {
    const completedProjects = projects.filter(
      (p) => p.status === "completed"
    ).length;

    const ongoingProjects = projects.filter(
      (p) => p.status === "ongoing"
    ).length;

    setStats({
      completedProjects,
      ongoingProjects,
      customers: customers.length,
    });
  }, []);

  return (
    <section className="dashboard-stats">
      <div className="stat-card">
        <h2>{stats.completedProjects}</h2>
        <p>Completed Projects</p>
      </div>
      <div className="stat-card">
        <h2>{stats.ongoingProjects}</h2>
        <p>Ongoing Projects</p>
      </div>
      <div className="stat-card">
        <h2>{stats.customers}</h2>
        <p>Customers</p>
      </div>
    </section>
  );
};

export default DashboardStats;
