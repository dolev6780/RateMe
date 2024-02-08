import React from 'react';

export default function CircleAvatar({ content, styleAddons, img }) {
  return (
    <div className={`relative bg-gray-400 w-10 h-10 rounded-full text-white font-bold flex justify-center items-center ${styleAddons}`}>
      {img ? <img className='w-full h-full rounded-full object-cover' src={img} alt="" /> : <p>{content}</p>}
    </div>
  );
}
