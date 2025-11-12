export default function Title({ text }) {
  return (
    <h1
      className="text-4xl font-extrabold bg-gradient-to-r from-[#00B4D8] to-[#0077B6] 
      text-transparent bg-clip-text drop-shadow-[0_0_8px_#00B4D8] tracking-tight text-center"
    >
      {text}
    </h1>
  );
}


