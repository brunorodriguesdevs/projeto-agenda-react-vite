import React, { useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import Title from "./components/Title";

export default function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (title, description, time) => {
    if (!title.trim()) return;
    const newTask = {
      id: Date.now(),
      title,
      description,
      time,
      done: false,
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const editTask = (id, updated) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, ...updated } : t)));
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-10 px-4 bg-gradient-to-b from-[#0f172a] via-[#0a1120] to-[#020617] text-gray-100 transition-all duration-500">
      <div className="text-center mb-6 animate-fadeIn">
        <Title text="🚀 Gerenciador de Tarefas " />
        <p className="text-gray-400 text-sm mt-1">Organize seu Dia</p>
      </div>

      <div className="bg-[#1E293B]/80 backdrop-blur-lg p-6 rounded-2xl shadow-[0_0_15px_#00B4D8] w-full max-w-xl mt-4 border border-[#00B4D8]/30 animate-slideUp">
        <AddTask addTask={addTask} />
      </div>

      <div className="w-full max-w-xl mt-6 animate-slideUp delay-200">
        <Tasks
          tasks={tasks}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      </div>
    </div>
  );
}

