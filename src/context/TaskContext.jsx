import { createContext, useContext, useEffect, useState } from "react";
import { getTasks, saveTasks } from "../utilities/localStorage.jsx";

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(getTasks);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (task) => {
    setTasks((current) => [
      ...current,
      {
        ...task,
        id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
        createdAt: new Date().toISOString().slice(0, 10),
        status: "new",
      },
    ]);
  };

  const updateTaskStatus = (taskId, status) => {
    setTasks((current) =>
      current.map((task) => (task.id === taskId ? { ...task, status } : task))
    );
  };

  const deleteTask = (taskId) => {
    setTasks((current) => current.filter((task) => task.id !== taskId));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTaskStatus, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);
