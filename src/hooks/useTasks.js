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

    const addTask = () => {
        //operazioni da effettuare
    }

    const removeTask = () => {
        //operazioni da effettuare
    }

    const updateTask = () => {
        //operazioni da effettuare
    }

    return { tasks, addTask, removeTask, updateTask };

}