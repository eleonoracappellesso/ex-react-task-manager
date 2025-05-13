import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";

export default function TaskDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { tasks, removeTask, updateTask } = useContext(GlobalContext);

    const task = tasks.find(task => task.id === parseInt(id));

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    if (!task) {
        return <h2>Nessuna Task corrispondente a questo id</h2>
    }

    const handleDelete = async () => {
        try {
            await removeTask(task.id);
            alert("Task eliminata corretamente!");
            navigate("/");
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    const handleUpdate = async updatedTask => {
        try {
            await updateTask(updatedTask);
            setShowEditModal(false);
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    return (
        <>
            <div className="container">
                <h1>Dettagli della Task</h1>
                <h2><strong>Titolo: </strong>{task.title}</h2>
                <p><strong>Descrizione: </strong>{task.description}</p>
                <p><strong>Stato: </strong>{task.status}</p>
                <p><strong>Creata il: </strong>{new Date(task.createdAt).toLocaleDateString()}</p>
                <button onClick={() => setShowDeleteModal(true)}>
                    Elimina task
                </button>
                <button onClick={() => setShowEditModal(true)}>
                    Modifica task
                </button>

                <Modal
                    title="Conferma eliminazione task"
                    content={<p>Confermi di voler eliminare questa task?</p>}
                    show={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={handleDelete}
                    confirmText="Elimina"
                />

                <EditTaskModal
                    task={task}
                    show={showEditModal}
                    onClose={() => setShowEditModal(false)} onSave={handleUpdate}
                />
            </div>
        </>
    )

}