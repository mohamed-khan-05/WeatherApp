import React, { useState } from "react";

const Selector = (props) => {
  const { setCity } = props;
  const [text, setText] = useState("");
  const handleClick = () => {
    setCity(text);
  };
  return (
    <div className="absolute top-[100px] text-[1.2rem]">
      <input
        className="w-[300px] border-b-2 pl-5"
        onChange={(e) => {
          setText(e.target.value);
        }}
        placeholder="Enter a City, Region or Code"
        value={text}
        type="text"
      />
      <button
        className="ml-3 border-2 p-1 rounded-md"
        onClick={() => {
          handleClick();
        }}
      >
        Search
      </button>
      <button
        onClick={() => {
          setText("");
        }}
        className="ml-3 border-2 p-1 rounded-md"
      >
        Clear
      </button>
    </div>
  );
};

export default Selector;
