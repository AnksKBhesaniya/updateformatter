'use client'
import React, { useState, useEffect, ChangeEvent } from "react";

type Task = string;

type Tasks = {
  [developerName: string]: Task[];
};

const formatTime = (timeStr: string): string => {
  if (!timeStr) return "[0 min]";
  const [hr = 0, min = 0] = timeStr.split(":").map(Number);
  if (hr && min) return `[${hr} hr ${min} min]`;
  if (hr) return `[${hr} hour]`;
  if (min) return `[${min} min]`;
  return "[0 min]";
};

const MultiUserToDoGenerator: React.FC = () => {
  const [developerName, setDeveloperName] = useState<string>("");
  const [taskId, setTaskId] = useState<string>("");
  const [taskLabel, setTaskLabel] = useState<string>("");
  const [taskTime, setTaskTime] = useState<string>("");
  const [tasks, setTasks] = useState<Tasks>({});
  const [editTaskIndex, setEditTaskIndex] = useState<number | null>(null); // Track which task is being edited
  const [editedTaskValue, setEditedTaskValue] = useState<string>("");

  // Load developer name from localStorage if available
  useEffect(() => {
    const savedDeveloperName = localStorage.getItem("developerName");
    if (savedDeveloperName) {
      setDeveloperName(savedDeveloperName);
    }
  }, []);

  const handleAddTask = () => {
    if (!developerName || !taskId || !taskLabel || !taskTime) return;
    const formatted = `${taskId} : ${taskLabel} ${formatTime(taskTime)}`;
    setTasks((prev) => ({
      ...prev,
      [developerName]: [...(prev[developerName] || []), formatted],
    }));
    setTaskId("");
    setTaskLabel("");
    setTaskTime("");
  };

  const handleDeleteTask = (developerName: string, taskIndex: number) => {
    setTasks((prev) => {
      const updatedTasks = { ...prev };
      updatedTasks[developerName].splice(taskIndex, 1);
      if (updatedTasks[developerName].length === 0) {
        delete updatedTasks[developerName];
      }
      return updatedTasks;
    });
  };

  const handleEditTask = (task: string, developerName: string, taskIndex: number) => {
    setEditTaskIndex(taskIndex);
    setEditedTaskValue(task);
  };

  const handleSaveEdit = (developerName: string) => {
    if (editTaskIndex !== null) {
      setTasks((prev) => {
        const updatedTasks = { ...prev };
        updatedTasks[developerName][editTaskIndex] = editedTaskValue;
        return updatedTasks;
      });
    }
    setEditTaskIndex(null);
    setEditedTaskValue("");
  };

  const handleDeveloperNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setDeveloperName(name);
    localStorage.setItem("developerName", name);
  };

  // Generate the formatted output
  const formattedOutput = Object.entries(tasks)
    .map(([dev, taskList]) => {
      const date = new Date().toLocaleDateString("en-GB").replace(/\//g, "-");
      return `To-Do List (${date})\n-------------------------------------------\nDeveloper Name:- ${dev}\n` +
        taskList.map((t) => t).join("\n");
    })
    .join("\n\n");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter(e.target.value);
  };

  return (
    <div className="container">
      <div className="add-task-card">
        <h3>Add Task</h3>
        <div>
          <label>
            Developer Name:
            <input
              type="text"
              placeholder="Developer Name"
              value={developerName}
              onChange={handleDeveloperNameChange}
            />
          </label>
        </div>
        <div className="grid">
          <div>
            <label>
              Task ID:
              <input
                type="text"
                placeholder="Task ID"
                value={taskId}
                onChange={(e) => handleInputChange(e, setTaskId)}
              />
            </label>
          </div>
          <div>
            <label>
              Task Label:
              <input
                type="text"
                placeholder="Task Label"
                value={taskLabel}
                onChange={(e) => handleInputChange(e, setTaskLabel)}
              />
            </label>
          </div>
          <div>
            <label>
              Time:
              <input
                type="text"
                placeholder="Time"
                value={taskTime}
                onChange={(e) => handleInputChange(e, setTaskTime)}
              />
            </label>
          </div>
        </div>
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <div className="tasks-list">
        <h3>Tasks</h3>
        {Object.entries(tasks).map(([dev, taskList]) => (
          <div key={dev} className="task-list">
            <div><strong>{dev}</strong></div>
            <div>
              {taskList.map((task, index) => (
                <div key={index} className="task-item">
                  {editTaskIndex === index ? (
                    <div className="edit-task">
                      <input
                        type="text"
                        value={editedTaskValue}
                        onChange={(e) => setEditedTaskValue(e.target.value)}
                      />
                      <button onClick={() => handleSaveEdit(dev)}>Save</button>
                    </div>
                  ) : (
                    <div className="task-text">
                      <span>{task}</span>
                      <button onClick={() => handleEditTask(task, dev, index)}>Edit</button>
                      <button onClick={() => handleDeleteTask(dev, index)}>Delete</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="formatted-output">
        <h3>Formatted To-Do List</h3>
        <textarea
          value={formattedOutput}
          readOnly
        />
      </div>
    </div>
  );
};

export default MultiUserToDoGenerator;
