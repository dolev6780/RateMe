import React, { useState } from 'react'

export default function InputWithIcon({icon,type,setState,isrequired,placeholder}) {
  const [inputText, setInputText] = useState("")
  return (
    <div className="relative flex justify-between items-center">
      <div className="absolute inset-y-0 right-2 top-2 flex items-center">
        <button
          onClick={() => {
            setState(inputText);
          }}
        >
          {icon}
        </button>
      </div>
      <input
        type={type}
        className="p-2 border-2 border-blue-900 mt-2 text-sm rounded-md w-full"
        placeholder={placeholder}
        required={isrequired}
        onChange={(e) => {
          setInputText(e.target.value);
        }}
      />
    </div>
  );
}
