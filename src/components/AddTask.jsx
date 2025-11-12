/**
 * AddTask.jsx — Formulário de criação de tarefas
 *
 * Responsável por:
 * - Capturar título, descrição e data/hora da tarefa
 * - Enviar os dados para o componente pai (App.jsx)
 *
 * Boas práticas:
 * - Controla os campos via estado local
 * - Validação mínima antes do envio
 * - UI acessível e consistente com o tema neon
 */

import React, { useState } from "react";
import Button from "./Button";
import Input from "./Input";

export default function AddTask({ addTask }) {
  // Estados locais dos campos do formulário
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  /** Envia os dados para o componente pai */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Digite o título da tarefa!");
    addTask(title, description, date, time);

    // Limpa o formulário após adicionar
    setTitle("");
    setDescription("");
    setDate("");
    setTime("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3"
      aria-label="Adicionar nova tarefa"
    >
      <Input
        label="Título"
        placeholder="Ex: Revisar projeto React"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <Input
        label="Descrição"
        placeholder="Opcional — detalhes ou lembrete extra"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="flex gap-3">
        <Input
          label="Data"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Input
          label="Hora"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      <Button type="submit" text="Adicionar Tarefa ➕" />
    </form>
  );
}
