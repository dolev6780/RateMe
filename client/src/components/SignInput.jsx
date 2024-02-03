import React from 'react'

export default function SignInput({text, setState}) {
  return (
    <div className="grid">
      <label className="text-left px-1">{text}</label>
      <input
        type="text"
        className="border-2 border-blue-500 rounded py-1 bg-gray-100 text-orange-300 font-semibold pl-2"
        onChange={(e) => {
          setState(e.target.value);
        }}
      />
    </div>
  );
}
