/**
 * Input.jsx — Campo de formulário reutilizável
 *
 * Objetivo:
 * Facilitar a consistência visual e acessibilidade dos inputs do app.
 * 
 * Boas práticas:
 * - Controlado via props (value, onChange, type)
 * - Label opcional para acessibilidade
 * - Design responsivo e foco suave
 */

import React from "react";

export default function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
}) {
  return (
    <label className="flex flex-col text-sm font-medium text-gray-200">
      {label && <span className="mb-1">{label}</span>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="px-3 py-2 rounded-xl bg-[#0b1420] border border-[#00b4d8]/20
          placeholder-gray-400 text-gray-100 focus:outline-none focus:ring-2
          focus:ring-[#00b4d8]/40 transition"
      />
    </label>
  );
}
