/**
 * Title.jsx — Cabeçalho principal do app
 *
 * Componente simples, usado para destacar o nome da aplicação.
 * 
 * Boas práticas:
 * - Tipografia consistente
 * - Reutilizável para seções futuras
 */

import React from "react";

export default function Title({ text }) {
  return (
    <h1 className="text-2xl sm:text-3xl font-extrabold bg-clip-text text-transparent 
      bg-gradient-to-r from-[#00b4d8] to-[#90e0ef] drop-shadow-lg">
      {text}
    </h1>
  );
}
