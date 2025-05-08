import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";
import { GlobalProvider } from "./contexts/GlobalContext";

export default function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>

        <nav>
          <NavLink to="/taskList" className="nav-link">Lista Task</NavLink>
          <NavLink to="/addTask" className="nav-link">Aggiungi Task</NavLink>
        </nav>

        <Routes>
          <Route path="/taskList" element={<TaskList />} />
          <Route path="/addTask" element={<AddTask />} />
          <Route path="/" element={<TaskList />} /> {/* homepage */}
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}