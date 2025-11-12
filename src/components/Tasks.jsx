/**
 * Tasks.jsx — Lista de tarefas
 *
 * Responsável por:
 * - Exibir todas as tarefas filtradas e ordenadas
 * - Permitir ações: concluir, editar e excluir
 *
 * Boas práticas:
 * - Usa ícones claros e acessíveis
 * - Destaca tarefas concluídas visualmente
 * - Mantém a lista simples, mas moderna
 */

import React, { useState } from "react";

export default function Tasks({ tasks, toggleTask, deleteTask, editTask }) {
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  /** Inicia modo de edição */
  const startEdit = (task) => {
    setEditingId(task.id);
    setEditValue(task.title);
  };

  /** Confirma alteração */
  const saveEdit = (id) => {
    if (!editValue.trim()) return;
    editTask(id, { title: editValue });
    setEditingId(null);
  };

  /** Cancela modo de edição */
  const cancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  if (tasks.length === 0)
    return (
      <p className="text-center text-gray-400 italic">
        Nenhuma tarefa encontrada 🔎
      </p>
    );

  return (
    <ul className="flex flex-col gap-3">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`flex justify-between items-center p-4 rounded-xl border transition 
          ${
            task.done
              ? "bg-[#042b20]/50 border-green-400/20 line-through text-gray-400"
              : "bg-[#0c1625]/60 border-[#00b4d8]/20"
          }`}
        >
          <div className="flex-1 min-w-0">
            {editingId === task.id ? (
              <input
                className="w-full px-2 py-1 rounded-lg text-black"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={() => saveEdit(task.id)}
                autoFocus
              />
            ) : (
              <>
                <h3 className="font-semibold break-words">{task.title}</h3>
                {task.description && (
                  <p className="text-sm text-gray-400">{task.description}</p>
                )}
                {task.date && (
                  <p className="text-xs text-gray-500 mt-1">
                    📅 {task.date} {task.time && `⏰ ${task.time}`}
                  </p>
                )}
              </>
            )}
          </div>

          <div className="flex gap-2 ml-3">
            {/* Alternar status */}
            <button
              onClick={() => toggleTask(task.id)}
              title="Concluir tarefa"
              className="text-green-400 hover:text-green-300"
            >
              {task.done ? "✔️" : "✅"}
            </button>

            {/* Editar */}
            {editingId === task.id ? (
              <button
                onClick={cancelEdit}
                title="Cancelar edição"
                className="text-yellow-400 hover:text-yellow-300"
              >
                ✖
              </button>
            ) : (
              <button
                onClick={() => startEdit(task)}
                title="Editar tarefa"
                className="text-yellow-400 hover:text-yellow-300"
              >
                ✏️
              </button>
            )}

            {/* Excluir */}
            <button
              onClick={() => deleteTask(task.id)}
              title="Excluir tarefa"
              className="text-red-400 hover:text-red-300"
            >
              🗑️
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
