import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import "./App.css";
import Task from "./Components/Task_folder/Task";
import Author from "./Components/Author_folder/Author";
import MuvieList from "./Components/Muvielist_folder/Muvielist";
import MuvieOpenPage from "./Components/Muvie_open_page_folder/Muvie_open_page";

const App: React.FC = () => {
  return (
    <Router>
      <div className="nav-wrapper">
        <NavLink to="/">Task</NavLink>
        <NavLink to="/Author">Author</NavLink>
        <NavLink to="/MuvieList">Movie List</NavLink>
      </div>
      <Routes>
        <Route path="/" element={<Task />} />
        <Route path="/movie/:id" element={<MuvieOpenPage />} />
        <Route path="/MuvieList" element={<MuvieList />} />
        <Route path="/Author" element={<Author />} />
      </Routes>
    </Router>
  );
};

export default App;
