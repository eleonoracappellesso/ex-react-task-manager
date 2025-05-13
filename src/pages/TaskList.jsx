import { useContext, useState, useMemo, useCallback } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import TaskRow from "../components/TaskRow";

// Funzione di debounce
function debounce(callback, delay) {
    let timer;
    return (value) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(value);
        }, delay)
    }
}

export default function TaskList() {
    const { tasks } = useContext(GlobalContext);
    console.log("tasks:", tasks);

    const [searchQuery, setSearchQuery] = useState("");
    const debounceSetSearchQuery = useCallback(debounce(setSearchQuery, 500), []);

    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState(1);

    const sortIcon = sortOrder === 1 ? "⬇️" : "⬆️";

    const handleSort = (f) => {
        if (sortBy === f) {
            setSortOrder(prev => prev * -1);
        } else {
            setSortBy(f);
            setSortOrder(1);
        }
    }

    const filteredAndSortedTasks = useMemo(() => {
        return [...tasks]
            .filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .sort((a, b) => {
                let comparison;

                if (sortBy === "title") {
                    comparison = a.title.localeCompare(b.title);
                } else if (sortBy === "status") {
                    const statusOptions = ["To do", "Doing", "Done"];
                    comparison = statusOptions.indexOf(a.status) - statusOptions.indexOf(b.status);
                } else if (sortBy === "createdAt") {
                    const dateA = new Date(a.createdAt).getTime();
                    const dateB = new Date(b.createdAt).getTime();
                    comparison = dateA - dateB;
                }

                return comparison * sortOrder;
            });
    }, [tasks, sortBy, sortOrder, searchQuery]);

    return (
        <div className="container">
            <h1>Lista delle task</h1>

            <input
                className="search-input"
                type="text"
                placeholder="Cerca task..."
                onChange={e => debounceSetSearchQuery(e.target.value)}
            />

            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort("title")}>
                            Nome {sortBy === "title" && sortIcon}
                        </th>
                        <th onClick={() => handleSort("status")}>
                            Stato {sortBy === "status" && sortIcon}
                        </th>
                        <th onClick={() => handleSort("createdAt")}>
                            Data Creazione {sortBy === "createdAt" && sortIcon}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAndSortedTasks.map(task => (
                        <TaskRow key={task.id} task={task} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}