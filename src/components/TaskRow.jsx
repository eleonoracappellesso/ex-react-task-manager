import { memo } from "react";

function TaskRow({ task }) {

    const statusClass = task.status.replace(" ", "").toLowerCase();

    return (
        <tr>
            <td>{task.title}</td>
            <td className={statusClass}>{task.status}</td>
            <td>{new Date(task.createdAt).toLocaleDateString()}</td>
        </tr>
    )
}

export default memo(TaskRow);