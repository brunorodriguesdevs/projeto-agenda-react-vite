import { CheckCircle, Circle, Trash2, Edit, Save, X } from "lucide-react";
import { useState } from "react";

export default function Tasks({ tasks, toggleTask, deleteTask, editTask }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: "", description: "", time: "" });

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditData({
      title: task.title,
      description: task.description,
      time: task.time || "",
    });
  };

  const saveEdit = () => {
    editTask(editingId, editData);
    setEditingId(null);
  };

  if (tasks.length === 0)
    return (
      <div className="text-center text-gray-500 mt-6 animate-pulse">
        Nenhuma tarefa adicionada ainda 😴
      </div>
    );

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`relative flex flex-col gap-3 bg-[#0B1120] border border-blue-900/50 hover:border-[#00B4D8] 
          rounded-xl p-5 shadow-md shadow-blue-900/20 transition-all duration-300 ${
            task.done
              ? "opacity-80 scale-[0.99] border-green-600/40"
              : "hover:shadow-[#00B4D8]/30"
          }`}
        >
          {editingId === task.id ? (
            <>
              {/* Edição */}
              <input
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                className="w-full bg-[#1E293B] border border-gray-700 rounded-lg p-2 text-gray-100 focus:border-[#00B4D8] focus:ring-1 focus:ring-[#00B4D8] outline-none"
                placeholder="Título"
              />
              <textarea
                value={editData.description}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
                className="w-full bg-[#1E293B] border border-gray-700 rounded-lg p-2 text-gray-100 focus:border-[#00B4D8] focus:ring-1 focus:ring-[#00B4D8] outline-none"
                placeholder="Descrição"
              />
              <input
                type="time"
                value={editData.time}
                onChange={(e) => setEditData({ ...editData, time: e.target.value })}
                className="w-full bg-[#1E293B] border border-gray-700 rounded-lg p-2 text-gray-100 focus:border-[#00B4D8] focus:ring-1 focus:ring-[#00B4D8] outline-none"
              />

              <div className="flex justify-end gap-3 mt-3">
                <button
                  onClick={saveEdit}
                  className="flex items-center gap-2 px-3 py-1 bg-[#00B4D8] hover:bg-[#0096C7] text-white rounded-lg transition"
                >
                  <Save size={16} /> Salvar
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="flex items-center gap-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition"
                >
                  <X size={16} /> Cancelar
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Visualização */}
              <div
                className="flex items-start justify-between cursor-pointer select-none"
                onClick={() => toggleTask(task.id)}
              >
                <div className="flex items-start gap-3">
                  {task.done ? (
                    <CheckCircle
                      size={22}
                      className="text-green-400 cursor-pointer hover:scale-110 transition"
                    />
                  ) : (
                    <Circle
                      size={22}
                      className="text-gray-500 cursor-pointer hover:text-[#00B4D8] hover:scale-110 transition"
                    />
                  )}
                  <div>
                    <h3
                      className={`text-lg font-semibold tracking-tight ${
                        task.done
                          ? "text-green-400 line-through"
                          : "text-[#00B4D8]"
                      }`}
                    >
                      {task.title}
                    </h3>
                    <p className="text-gray-400">{task.description}</p>
                    {task.time && (
                      <p className="text-xs text-gray-500 mt-1">⏰ {task.time}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-3">
                <button
                  onClick={() => startEdit(task)}
                  className="flex items-center gap-2 px-3 py-1 bg-[#0077B6] hover:bg-[#00B4D8] text-white rounded-lg transition"
                >
                  <Edit size={16} /> Editar
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="flex items-center gap-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                >
                  <Trash2 size={16} /> Excluir
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

