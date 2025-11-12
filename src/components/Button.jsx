/**
 * Button.jsx — Botão padrão do aplicativo
 *
 * Reaproveitado em todo o app para garantir consistência de design.
 *
 * Boas práticas:
 * - Usa cor temática (neon azul)
 * - Acessível (role="button", foco visível)
 * - Suporte a diferentes tipos (submit, button)
 */

import React from "react";

export default function Button({ text, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      role="button"
      className="px-4 py-2 rounded-xl bg-[#00b4d8]/20 border border-[#00b4d8]/40
        text-[#00b4d8] font-semibold hover:bg-[#00b4d8]/30
        focus:outline-none focus:ring-2 focus:ring-[#00b4d8]/40 transition"
    >
      {text}
    </button>
  );
}
