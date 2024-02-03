import React from 'react'

export default function SignButton({ text, onClickFunc, styleAddons }) {
  return (
    <div>
      <button
        onClick={onClickFunc}
        className={`py-1 px-4 rounded font-bold text-white bg-blue-500 shadow-xl active:shadow-none active:scale-95 hover:scale-105 hover:bg-opacity-95 ${styleAddons}`}
      >
        {text}
      </button>
    </div>
  );
}
