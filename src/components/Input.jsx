export default function Input({ label, value, onChange }) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="peer w-full border-b-2 border-[#00B4D8]/50 bg-transparent pt-4 pb-1 
        text-gray-100 placeholder-transparent outline-none 
        focus:border-[#00B4D8] transition-all duration-300
        focus:shadow-[0_2px_10px_#00B4D8]"
        placeholder=" "
      />
      <label
        className="absolute left-0 top-1 text-gray-400 text-sm transition-all duration-300 
        peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-500 
        peer-focus:top-1 peer-focus:text-[#00B4D8]"
      >
        {label}
      </label>
    </div>
  );
}


