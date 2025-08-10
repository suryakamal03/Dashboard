import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Time from "./Time.jsx";
import Priority from "./priority.jsx";
import Daily from "./Daily.jsx";

function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // For loading state
  const [user, setUser] = useState(null); // Store user data

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (!token) {
      navigate("/login"); // No token → go to login
      return;
    }

    fetch("https://dashboard-6ay3.onrender.com/api/auth/verify", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Send token to backend
      },
    })
      .then((res) => {
        if (!res.ok) {
          navigate("/login"); // Invalid/expired token → go to login
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data.user); // Save user data from backend
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        navigate("/login");
      });
  }, [navigate]);

  if (loading) {
    return <p>Loading...</p>; // Prevent flicker before data loads
  }

  return (
    <>

      <Time />
      <Priority />
      <Daily />
    </>
  );
}

export default Dashboard;
