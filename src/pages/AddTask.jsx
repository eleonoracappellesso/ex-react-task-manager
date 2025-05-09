import { useState, useRef, useMemo } from "react"

const symbols = `!@#$%^&*()-_=+[]{}|;:'\\",.<>?/\`~"`;

export default function AddTask() {

    const [taskName, setTaskName] = useState("");
    const descriptionRef = useRef();
    const statusRef = useRef();

    const handleSubmit = e => {
        e.preventDefault();
        if (nameError)
            return;

        const newTask = {
            title: taskName.trim(),
            description: descriptionRef.current.value,
            status: statusRef.current.value
        };

        console.log("Nuova Task:", newTask)
    }

    const nameError = useMemo(() => {
        if (!taskName.trim()) {
            return "E' obbligatorio inserire un titolo per la task!";
        }
        else if ([...taskName].some(char => symbols.includes(char))) {
            return "Il titolo non deve contenere simboli!";
        } else {
            return "";
        }

    }, [taskName]);

    return (
        <div className="container">
            <h1>Aggiungi una Task</h1>
            <form onSubmit={handleSubmit}>
                <label>Titolo della task:
                    <input
                        type="text"
                        value={taskName}
                        placeholder="Inserisci un nome per la task..."
                        onChange={e => setTaskName(e.target.value)}
                    />
                </label>

                {nameError &&
                    <p style={{ color: "red" }}>{nameError}</p>
                }

                <label>Descrizione:
                    <textarea
                        placeholder="Inserisci una descrizione della task..."
                        ref={descriptionRef}
                    >
                    </textarea>
                </label>
                <label>Stato:
                    <select
                        ref={statusRef}
                        defaultValue="To Do"
                    >
                        {["To Do", "Doing", "Done"].map((value, index) => (
                            <option key={index} value={value}>{value}</option>
                        ))}
                    </select>
                </label>
                <button
                    type="submit"
                >
                    Aggiungi Task
                </button>
            </form>
        </div >
    )
}