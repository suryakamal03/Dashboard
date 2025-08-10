import React, { useState, useEffect } from "react";
import styles from "./Priority.module.css"; // Correct relative import

function Priority() {
    const [priority, setPriority] = useState("");
    const [getPriority, setGetPriority] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("userToken");
                if (!token) return;

                const response = await fetch("http://localhost:5000/api/priority", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) throw new Error("Failed to fetch priorities");

                const data = await response.json();
                setGetPriority(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    const addItem = async (e) => {
        e.preventDefault();
        if (priority.trim() === "") return;

        try {
            const token = localStorage.getItem("userToken");
            const response = await fetch("http://localhost:5000/api/priority", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ text: priority })
            });

            if (!response.ok) throw new Error("Failed to add priority");

            const newData = await response.json();
            setGetPriority([...getPriority, newData]);
            setPriority("");
        } catch (err) {
            console.error("Failed to add priority:", err);
        }
    };

    const deleteItem = async (id) => {
        try {
            const token = localStorage.getItem("userToken");
            await fetch(`http://localhost:5000/api/priority/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            setGetPriority(getPriority.filter(item => item._id !== id));
        } catch (err) {
            console.error("Failed to delete priority:", err);
        }
    };

    const handleToggleComplete = async (id) => {
        try {
            const itemToUpdate = getPriority.find(item => item._id === id);
            if (!itemToUpdate) return;

            const token = localStorage.getItem("userToken");
            await fetch(`http://localhost:5000/api/priority/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ completed: !itemToUpdate.completed })
            });

            setGetPriority(getPriority.map(item =>
                item._id === id ? { ...item, completed: !item.completed } : item
            ));
        } catch (err) {
            console.error("Failed to update priority:", err);
        }
    };

    return (
        <div className={styles.priority}>
            <h3 className={styles.heading}>Weekly Priorities</h3>
            <ul className={styles.listOfPriority}>
                {getPriority.map((item) => (
                    <li key={item._id} className={styles.listItem}>
                        <input
                            type="checkbox"
                            checked={item.completed || false}
                            onChange={() => handleToggleComplete(item._id)}
                        />
                        <span
                            className={`${styles.priorityText} ${item.completed ? styles.completed : ""}`}
                        >
                            {item.text}
                        </span>
                        <button
                            className={styles.priorityDelete}
                            onClick={() => deleteItem(item._id)}
                        >
                            X
                        </button>
                    </li>
                ))}
            </ul>
            <form className={styles.priorityForm} onSubmit={addItem}>
                <input
                    type="text"
                    placeholder="Enter new priority..."
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className={styles.priorityInput}
                />
                <button type="submit" className={styles.priorityAdd}>Add</button>
            </form>
        </div>
    );
}

export default Priority;
