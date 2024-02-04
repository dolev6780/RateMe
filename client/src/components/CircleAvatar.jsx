import React from 'react'

export default function CircleAvatar({content,styleAddons}) {
  return (
    <div className={`bg-gray-400 w-10 h-10 rounded-full text-white font-bold flex justify-center items-center ${styleAddons} `}>
        {content}
    </div>
  )
}
