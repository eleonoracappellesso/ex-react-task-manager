import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";
import TaskDetail from "./pages/TaskDetail";
import { GlobalProvider } from "./contexts/GlobalContext";

export default function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>

        <nav>
          <NavLink to="/" className="nav-link">Lista Task</NavLink>
          <NavLink to="/addTask" className="nav-link">Aggiungi Task</NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/addTask" element={<AddTask />} />
          <Route path="/task/:id" element={<TaskDetail />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}