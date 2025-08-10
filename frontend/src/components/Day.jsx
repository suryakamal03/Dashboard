import React, { useState, useEffect } from 'react';
import styles from './Day.module.css';

function Day({ day }) {
  const [tasks, setTasks] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('userToken');
        if (!token) return;
        const response = await fetch(`https://dashboard-6ay3.onrender.com/api/day/${day}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error(`Failed to fetch tasks for ${day}`);
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTasks();
  }, [day]);

  const addTask = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch(`https://dashboard-6ay3.onrender.com/api/day/${day}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ text: inputText, day })
      });
      if (!response.ok) {
        console.error("Add task failed:", await response.text());
        return;
      }
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
      setInputText('');
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem('userToken');
      await fetch(`https://dashboard-6ay3.onrender.com/api/day/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const token = localStorage.getItem('userToken');
      await fetch(`https://dashboard-6ay3.onrender.com/api/day/${id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setTasks(
        tasks.map(task =>
          task._id === id ? { ...task, completed: !task.completed } : task
        )
      );
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    <div className={styles.dayCard}>
      <h3 className={styles.dayTitle}>{day}</h3>
      <ul className={styles.taskList}>
        {tasks.map(task => (
          <li key={task._id} className={styles.taskItem}>
            <input 
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task._id)}
            />
            <span className={task.completed ? styles.completed : ''}>{task.text}</span>
            <button onClick={() => deleteTask(task._id)} className={styles.deleteBtn}>X</button>
          </li>
        ))}
      </ul>
      <form className={styles.addForm} onSubmit={addTask}>
        <input 
          type="text"
          placeholder="Add a task..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className={styles.taskInput}
        />
        <button type="submit" className={styles.addBtn}>Add</button>
      </form>
    </div>
  );
}

export default Day;