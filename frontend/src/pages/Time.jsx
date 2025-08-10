import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Time.module.css";

function Time() {
  const navigate = useNavigate();
  const [currentDateTime, setCurrentDateTime] = useState({
    time: "",
    dayName: "",
    monthName: "",
    date: "",
    year: ""
  });
  const [user, setUser] = useState(null);

  // Fetch logged-in user info
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:5000/api/auth/verify", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data?.user) {
          setUser(data.user);
        } else {
          localStorage.removeItem("userToken");
          navigate("/login");
        }
      })
      .catch(() => {
        localStorage.removeItem("userToken");
        navigate("/login");
      });
  }, [navigate]);

  // Update time every second
  useEffect(() => {
    const updateDateTime = () => {
      const today = new Date();
      const optionsDay = { weekday: "long", timeZone: "Asia/Kolkata" };
      const optionsMonth = { month: "long", timeZone: "Asia/Kolkata" };
      const optionsTime = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata"
      };

      setCurrentDateTime({
        dayName: today.toLocaleString("en-IN", optionsDay),
        monthName: today.toLocaleString("en-IN", optionsMonth),
        date: today.toLocaleString("en-IN", { day: "numeric", timeZone: "Asia/Kolkata" }),
        year: today.toLocaleString("en-IN", { year: "numeric", timeZone: "Asia/Kolkata" }),
        time: today.toLocaleString("en-IN", optionsTime)
      });
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  function Logout() {
    localStorage.removeItem("userToken");
    navigate("/login");
  }

  return (
    <header className={styles.headerContainer}>
  <h2 className={styles.welcomeText}>Welcome {user?.name}</h2>
  <div style={{ textAlign: "center" }}>
    <p className={styles.title}>My Personal Dashboard</p>
    <span className={styles.time}>
      {currentDateTime.time}, {currentDateTime.dayName}, {currentDateTime.monthName} {currentDateTime.date}, {currentDateTime.year}
    </span>
  </div>
  <button className={styles.logoutButton} onClick={Logout}>Logout</button>
</header>

  );
}

export default Time;
