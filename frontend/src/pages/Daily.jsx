// src/pages/Daily.jsx

import React from 'react';
import Day from '../components/Day.jsx';
import styles from './Daily.module.css'; // Correct CSS module import

function Daily() {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div className={styles.dailyContainer}>
      {daysOfWeek.map(dayName => (
        <Day key={dayName} day={dayName} />
      ))}
    </div>
  );
}

export default Daily;