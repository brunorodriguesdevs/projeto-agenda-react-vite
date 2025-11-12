import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  CheckCircle2,
  Edit3,
  Trash2,
  PlusCircle,
  Clock,
  Filter,
} from "lucide-react";

function Tasks({ tasks, setTasks }) {
  const [editingTask, setEditingTask] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [newSubtask, setNewSubtask] = useState("");
  const [filter, setFilter] = useState("todas");

  // ✅ Marcar tarefa como concluída
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed ? new Date() : null,
            }
          : task
      )
    );
  };

  // 📝 Iniciar edição
  const startEditing = (task) => {
    setEditingTask(task.id);
    setEditedTitle(task.title);
  };

  // 💾 Salvar edição
  const saveEdit = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: editedTitle } : task
      )
    );
    setEditingTask(null);
    setEditedTitle("");
  };

  // ❌ Excluir tarefa
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // ✅ Adicionar subtarefa
  const addSubtask = (id) => {
    if (newSubtask.trim() === "") return;
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              subtasks: [
                ...(task.subtasks || []),
                { id: crypto.randomUUID(), title: newSubtask, done: false },
              ],
            }
          : task
      )
    );
    setNewSubtask("");
  };

  // ✅ Marcar subtarefa como concluída
  const toggleSubtask = (taskId, subtaskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.map((s) =>
                s.id === subtaskId ? { ...s, done: !s.done } : s
              ),
            }
          : task
      )
    );
  };

  // 🧹 Filtragem de tarefas
  const filteredTasks =
    filter === "todas"
      ? tasks
      : filter === "concluidas"
      ? tasks.filter((t) => t.completed)
      : tasks.filter((t) => !t.completed);

  return (
    <div className="w-full max-w-2xl mx-auto mt-6 p-4 rounded-xl bg-[#1E293B]/60 shadow-lg backdrop-blur-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-blue-300 font-semibold">
          🗂️ Suas Tarefas
        </h2>

        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Filter size={18} />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-transparent border border-blue-700/40 text-gray-300 rounded px-2 py-1 focus:outline-none"
          >
            <option value="todas">Todas</option>
            <option value="concluidas">Concluídas</option>
            <option value="pendentes">Pendentes</option>
          </select>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <p className="text-gray-400 text-center py-6">
          Nenhuma tarefa encontrada 😴
        </p>
      ) : (
        <ul className="space-y-3">
          <AnimatePresence>
            {filteredTasks.map((task) => (
              <motion.li
                key={task.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className={`flex flex-col gap-3 bg-[#0F172A] p-4 rounded-lg border ${
                  task.completed
                    ? "border-green-500/40 bg-green-900/20"
                    : "border-blue-700/40"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    {editingTask === task.id ? (
                      <input
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        className="w-full bg-transparent border-b border-blue-400 text-gray-100 focus:outline-none focus:border-blue-300 transition"
                        autoFocus
                      />
                    ) : (
                      <span
                        className={`text-lg ${
                          task.completed
                            ? "line-through text-gray-400"
                            : "text-gray-100"
                        }`}
                      >
                        {task.title}
                      </span>
                    )}

                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                      <Clock size={14} />
                      <span>
                        Criada:{" "}
                        {new Date(task.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      {task.completedAt && (
                        <span>
                          • Concluída:{" "}
                          {new Date(task.completedAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    {editingTask === task.id ? (
                      <button
                        onClick={() => saveEdit(task.id)}
                        className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-500 text-white rounded transition"
                      >
                        💾 Salvar
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => toggleComplete(task.id)}
                          className="text-green-400 hover:text-green-300 transition"
                          title="Concluir"
                        >
                          <CheckCircle2 size={22} />
                        </button>

                        <button
                          onClick={() => startEditing(task)}
                          className="text-blue-400 hover:text-blue-300 transition"
                          title="Editar"
                        >
                          <Edit3 size={22} />
                        </button>

                        <button
                          onClick={() => deleteTask(task.id)}
                          className="text-red-400 hover:text-red-300 transition"
                          title="Excluir"
                        >
                          <Trash2 size={22} />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* ✅ Subtarefas */}
                {task.subtasks && task.subtasks.length > 0 && (
                  <div className="pl-4 border-l border-blue-700/30 mt-2 space-y-1">
                    {task.subtasks.map((sub) => (
                      <div
                        key={sub.id}
                        className="flex items-center gap-2 text-sm text-gray-300"
                      >
                        <input
                          type="checkbox"
                          checked={sub.done}
                          onChange={() => toggleSubtask(task.id, sub.id)}
                          className="accent-blue-500"
                        />
                        <span
                          className={`${
                            sub.done
                              ? "line-through text-gray-500"
                              : "text-gray-200"
                          }`}
                        >
                          {sub.title}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* ➕ Adicionar nova subtarefa */}
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    placeholder="Nova subtarefa..."
                    value={newSubtask}
                    onChange={(e) => setNewSubtask(e.target.value)}
                    className="flex-1 bg-transparent border-b border-blue-400 text-gray-100 focus:outline-none focus:border-blue-300 transition text-sm"
                  />
                  <button
                    onClick={() => addSubtask(task.id)}
                    className="text-blue-400 hover:text-blue-300 transition"
                    title="Adicionar subtarefa"
                  >
                    <PlusCircle size={22} />
                  </button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}

export default Tasks;
