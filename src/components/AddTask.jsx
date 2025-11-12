import React, { useState } from "react";
import Button from "./Button";
import Input from "./Input";

export default function AddTask({ addTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(title, description, time);
    setTitle("");
    setDescription("");
    setTime("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-[#0F172A]/60 backdrop-blur-md p-5 rounded-xl border border-[#00B4D8]/20 shadow-[0_0_15px_#00B4D8]/10"
    >
      <Input
        label="Título da Tarefa"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Ex: Estudar React"
      />

      <Input
        label="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Adicione detalhes ou lembretes"
      />

      <div>
        <label className="block text-sm font-medium text-[#00B4D8] mb-1">
          Horário
        </label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full bg-[#0a1120] border border-[#00B4D8]/30 rounded-lg p-2 text-gray-200 placeholder-gray-500
          focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/40 outline-none transition-all duration-300"
        />
      </div>

      <div className="pt-2 flex justify-center">
        <Button text="Adicionar Tarefa 🚀" />
      </div>
    </form>
  );
}
