import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await fetch(`${import.meta.env.API_URL}/tasks`);
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

    return (
        <GlobalContext.Provider value={{ tasks, setTasks }}>
            {children}
        </GlobalContext.Provider>
    );
}