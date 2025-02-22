import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const Selector = ({ setCity }) => {
  const [text, setText] = useState("");

  const handleSearch = () => {
    if (text.trim()) setCity(text);
  };

  return (
    <div className="flex items-center justify-center mb-6">
      <input
        className="w-[350px] p-3 rounded-l-full border-none outline-none shadow-md text-black"
        onChange={(e) => setText(e.target.value)}
        placeholder="🌍 Enter city, region, or postal code"
        value={text}
        type="text"
      />
      <button
        className="bg-blue-500 text-white px-4 py-3 rounded-r-full hover:bg-blue-600"
        onClick={handleSearch}
      >
        <FaSearch />
      </button>
      {text && (
        <button
          className="ml-2 text-red-500 hover:text-red-700"
          onClick={() => setText("")}
        >
          <FaTimes />
        </button>
      )}
    </div>
  );
};

export default Selector;
