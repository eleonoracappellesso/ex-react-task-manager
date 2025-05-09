import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import TaskRow from "../components/TaskRow";

export default function TaskList() {
    const { tasks } = useContext(GlobalContext);
    console.log("tasks:", tasks);

    return (
        <div className="container">
            <h1>Lista delle task</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Stato</th>
                        <th>Data Creazione</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <TaskRow key={task.id} task={task} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}