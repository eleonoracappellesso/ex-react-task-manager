import { useState, useEffect } from "react";

export default function useTasks() {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks`);
                if (!res.ok) {
                    throw new Error("Errore di risposta della rete");
                }
                const data = await res.json();
                console.log("Dati ricevuti:", data);
                setTasks(data);
            } catch (error) {
                console.error("Errore nel recupero dei task:", error);
            }
        };
        fetchTasks();
    }, []);

    const addTask = async newTask => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(newTask)
        });
        const { success, message, task } = await res.json();

        if (success === false) throw new Error(message);

        setTasks(prev => [...prev, task]);

    }

    const removeTask = async taskId => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`, {
            method: "DELETE",
        });
        const { success, message } = await res.json();

        if (success === false) throw new Error(message);

        setTasks(prev => prev.filter(t => t.id !== taskId));
    }

    const updateTask = async updatedTask => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${updatedTask.id}`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(updatedTask)
        });
        const { success, message, task: newTask } = await res.json();

        if (success === false) throw new Error(message);

        setTasks(prev => prev.map(t => t.id === newTask.id ? newTask : t));
    }

    return { tasks, addTask, removeTask, updateTask };

}