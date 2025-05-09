import { useParams } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

export default function TaskDetail() {
    const { id } = useParams();
    const { tasks } = useContext(GlobalContext);

    const task = tasks.find(task => task.id === parseInt(id));

    if (!task) {
        return <h2>Nessuna Task corrispondente a questo id</h2>
    }

    const handleDelete = () => {
        console.log("Task eliminata con successo!")
    }

    return (
        <>
            <div className="container">
                <h1>Dettagli della Task</h1>
                <h2><strong>Titolo: </strong>{task.title}</h2>
                <p><strong>Descrizione: </strong>{task.description}</p>
                <p><strong>Stato: </strong>{task.status}</p>
                <p><strong>Creata il: </strong>{new Date(task.createdAt).toLocaleDateString()}</p>
                <button onClick={handleDelete}>
                    Elimina task
                </button>
            </div>
        </>
    )

}