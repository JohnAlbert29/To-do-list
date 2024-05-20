// Retiza, John Albert J. BSIS NS 3A//
import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedText, setEditedText] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const updateTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: editedText } : task
    );
    setTasks(updatedTasks);
    setEditingTaskId(null);
    setEditedText("");
  };

  const startEditing = (id, text) => {
    setEditingTaskId(id);
    setEditedText(text);
  };

  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditedText("");
  };

  const deleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  return (
    <div className="app">
      <h1>Retiza Todo List</h1>
      <div className="add-task">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="task-container">
        <ul className="task-list">
          {tasks.map((task, index) => (
            <li
              key={task.id}
              className={`task-item ${task.completed ? "completed" : ""}`}
            >
              <span className="task-number">{`Task ${index + 1}:`}</span>
              {editingTaskId === task.id ? (
                <>
                  <input
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    placeholder="Edit task..."
                  />
                  <button onClick={() => updateTask(task.id)}>Update</button>
                  <button onClick={cancelEditing}>Cancel</button>
                </>
              ) : (
                <>
                  <span onClick={() => startEditing(task.id, task.text)}>
                    {task.text}
                  </span>
                  <div className="actions">
                    <button onClick={() => startEditing(task.id, task.text)}>
                      Edit
                    </button>
                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
