import { useState, useRef } from "react";
import Modal from "./Modal";

export default function EditTaskModal({ show, onClose, task, onSave }) {

    const [editedTask, setEditedTask] = useState(task);
    const editFormRef = useRef();

    const changeEditedTask = (key, e) => {
        setEditedTask(prev => ({ ...prev, [key]: e.target.value }));
    }

    const handleSubmit = e => {
        e.preventDefault();
        onSave(editedTask);
    }

    return (
        <Modal
            title="Modifica task"
            content={
                <form ref={editFormRef} onSubmit={handleSubmit}>
                    <label>
                        Nome Task:
                        <input
                            type="text"
                            value={editedTask.title}
                            onChange={e => changeEditedTask('title', e)}
                        />
                    </label>
                    <label>
                        Descrizione Task:
                        <textarea
                            value={editedTask.description}
                            onChange={e => changeEditedTask('description', e)}
                        />
                    </label>
                    <label>
                        Stato Task:
                        <select
                            value={editedTask.status}
                            onChange={e => changeEditedTask('status', e)}
                        >
                            {["To do", "Doing", "Done"].map((value, index) => (
                                <option value={value} key={index}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </label>
                </form>
            }
            confirmText="Salva"
            show={show}
            onClose={onClose}
            onConfirm={() => editFormRef.current.requestSubmit()}
        />
    )
}