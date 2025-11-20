// AdminMessages.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminMessages.css";

const API = "http://157.173.219.218:5008/api/contact";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Fetch all messages
  const loadMessages = async () => {
    try {
      const res = await axios.get(API);
      setMessages(res.data);
    } catch (err) {
      console.error("Load Error:", err);
    }
  };

  // Mark as read
  const markRead = async (id) => {
    try {
      await axios.put(`${API}/read/${id}`);
      loadMessages();
    } catch (err) {
      console.error("Mark Read Error:", err);
    }
  };

  // Delete
  const deleteMessage = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    try {
      await axios.delete(`${API}/${id}`);
      loadMessages();
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  // ---------------- FILTERED DATA ----------------
  const filteredMessages = messages.filter((msg) => {
    const textMatch =
      msg.name.toLowerCase().includes(search.toLowerCase()) ||
      msg.phone.toLowerCase().includes(search.toLowerCase()) ||
      msg.message.toLowerCase().includes(search.toLowerCase());

    let dateMatch = true;

    const msgDate = new Date(msg.createdAt);

    if (fromDate) {
      dateMatch = msgDate >= new Date(fromDate);
    }

    if (toDate && dateMatch) {
      dateMatch = msgDate <= new Date(toDate + "T23:59:59");
    }

    return textMatch && dateMatch;
  });
  // -------------------------------------------------

  return (
    <div className="admin-messages">
      <h2>User Messages</h2>

      {/* 🔎 FILTER BAR */}
      <div className="filter-box">
        <input
          type="text"
          placeholder="Search name / phone / message"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="date-filter">
          <label>From:</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />

          <label>To:</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
      </div>

      {/* LIST */}
      {filteredMessages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <div className="msg-list">
          {filteredMessages.map((msg) => (
            <div
              key={msg._id}
              className={`msg-card ${msg.isRead ? "read" : "unread"}`}
            >
              <h3>{msg.name}</h3>
              <p><b>Phone:</b> {msg.phone}</p>
              <p>{msg.message}</p>

              <div className="msg-actions">
                {!msg.isRead && (
                  <button className="mark-btn" onClick={() => markRead(msg._id)}>
                    Mark Read
                  </button>
                )}

                <button className="del-btn" onClick={() => deleteMessage(msg._id)}>
                  Delete
                </button>
              </div>

              <span className="date">
                {new Date(msg.createdAt).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
