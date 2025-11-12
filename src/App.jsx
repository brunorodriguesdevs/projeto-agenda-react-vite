/**
 * App.jsx — Gerenciador de Tarefas Neon Pro
 * Autor: Bruno Rodrigues
 *
 * Objetivo:
 * Um gerenciador de tarefas moderno, com visual neon e recursos úteis:
 * - Persistência com LocalStorage
 * - Filtro e busca dinâmica
 * - Notificações automáticas por data/hora
 * - Design responsivo (mobile-first)
 *
 * Este código demonstra boas práticas de React:
 * - Componentização clara (AddTask, Tasks, Title)
 * - Hooks para estado e efeitos (useState, useEffect)
 * - Separação de responsabilidades (UI, lógica e persistência)
 */

import React, { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import Title from "./components/Title";

// Som opcional de lembrete (coloque o arquivo em public/notify.mp3)
const NOTIFY_SOUND = "/notify.mp3";

export default function App() {
  // Estado principal: lista de tarefas
  const [tasks, setTasks] = useState([]);

  // Estado da busca e filtro de status
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // all | done | pending

  /**
   * 🔹 Carrega as tarefas do LocalStorage ao iniciar o app
   */
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  /**
   * 🔹 Atualiza o LocalStorage sempre que o estado de tarefas mudar
   */
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  /**
   * 🔔 Sistema simples de notificação de horário
   * A cada 20 segundos verifica se há tarefas programadas para o minuto atual.
   */
  useEffect(() => {
    const check = () => {
      const now = new Date();
      tasks.forEach((t) => {
        if (!t.date) return;

        const dt = new Date(`${t.date}T${t.time || "00:00"}`);

        // Verifica se a tarefa está no mesmo minuto e ainda não foi notificada
        if (
          Math.abs(now.getTime() - dt.getTime()) < 60000 &&
          !t.notified &&
          !t.done
        ) {
          // Toca som (se disponível)
          try {
            const audio = new Audio(NOTIFY_SOUND);
            audio.play().catch(() => {});
          } catch (e) {}

          // Exibe lembrete
          alert(`⏰ Lembrete: ${t.title} — ${dt.toLocaleString()}`);

          // Marca como notificada
          setTasks((prev) =>
            prev.map((p) => (p.id === t.id ? { ...p, notified: true } : p))
          );
        }
      });
    };

    check();
    const id = setInterval(check, 20000);
    return () => clearInterval(id);
  }, [tasks]);

  // ---------------------- CRUD de Tarefas ---------------------- //

  /** Adiciona nova tarefa */
  const addTask = (title, description, date, time) => {
    if (!title?.trim()) return;
    const newTask = {
      id: Date.now(),
      title,
      description,
      date: date || null,
      time: time || null,
      done: false,
      notified: false,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  /** Alterna status de conclusão */
  const toggleTask = (id) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );

  /** Exclui tarefa */
  const deleteTask = (id) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  /** Edita tarefa existente */
  const editTask = (id, updated) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updated } : t)));

  // ---------------------- Filtros e Ordenação ---------------------- //

  const normalizedSearch = search.trim().toLowerCase();

  // Filtra por status e texto
  const filtered = tasks
    .filter((t) => {
      if (filterStatus === "done") return t.done;
      if (filterStatus === "pending") return !t.done;
      return true;
    })
    .filter((t) => {
      if (!normalizedSearch) return true;
      return (
        t.title.toLowerCase().includes(normalizedSearch) ||
        (t.description || "").toLowerCase().includes(normalizedSearch)
      );
    })
    // Ordena por data/hora (tarefas futuras primeiro)
    .sort((a, b) => {
      if (!a.date && !b.date) return b.id - a.id;
      if (!a.date) return 1;
      if (!b.date) return -1;
      const da = new Date(`${a.date}T${a.time || "00:00"}`);
      const db = new Date(`${b.date}T${b.time || "00:00"}`);
      return da - db;
    });

  // ---------------------- Renderização ---------------------- //

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 sm:px-6 bg-gradient-to-b from-[#0f172a] via-[#051028] to-[#000000] text-gray-100">
      <div className="w-full max-w-xl">
        {/* Cabeçalho */}
        <header className="text-center mb-6">
          <Title text="⚡ Gerenciador de Tarefas Neon Pro" />
          <p className="text-gray-400 mt-1 text-sm">
            Organize seu dia — responsivo e prático
          </p>
        </header>

        {/* Barra de busca e filtro */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Buscar por título ou descrição..."
            className="flex-1 w-full px-4 py-2 rounded-xl bg-[#0b1420] border border-[#00b4d8]/20 placeholder-gray-400 text-gray-100
              focus:outline-none focus:ring-2 focus:ring-[#00b4d8]/40 transition"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#0b1420] border border-[#00b4d8]/20 text-gray-100"
          >
            <option value="all">Todas</option>
            <option value="pending">Pendentes</option>
            <option value="done">Concluídas</option>
          </select>
        </div>

        {/* Formulário de criação */}
        <div className="bg-[#0f1b2a]/60 backdrop-blur-sm p-5 rounded-2xl border border-[#00b4d8]/20 shadow-[0_0_18px_#00b4d8]/6 mb-6">
          <AddTask addTask={addTask} />
        </div>

        {/* Lista de tarefas */}
        <Tasks
          tasks={filtered}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          editTask={editTask}
        />

        {/* Rodapé */}
        <footer className="text-center text-gray-500 text-sm mt-8">
          Desenvolvido por{" "}
          <span className="text-[#00b4d8] font-semibold">Bruno Rodrigues</span>
        </footer>
      </div>
    </div>
  );
}
