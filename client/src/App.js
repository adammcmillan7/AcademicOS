import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";

import AddTask from "./components/add-task-component";
import TasksList from "./components/task-list-component";
import Task from "./components/task-component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/tasks" className="navbar-brand">
            &nbsp;&nbsp;AcademicLifeOS
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/tasks"} className="nav-link">
                Tasks
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<TasksList/>} />
            <Route path="/tasks" element={<TasksList/>} />
            <Route path="/add" element={<AddTask/>} />
            <Route path="/tutorials/:id" element={<Task/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
