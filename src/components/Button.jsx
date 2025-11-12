export default function Button({ text }) {
  return (
    <button
      type="submit"
      className="w-full bg-gradient-to-r from-[#00B4D8] to-[#0077B6] 
      text-white font-semibold py-2.5 rounded-xl transition-all duration-300 
      hover:from-[#48CAE4] hover:to-[#00B4D8] 
      hover:shadow-[0_0_15px_#00B4D8] 
      hover:scale-[1.04] active:scale-[0.98] 
      shadow-[0_0_10px_#00B4D8]/40"
    >
      {text}
    </button>
  );
}

