import React from "react";
import CircleAvatar from './CircleAvatar'
export default function Post({ post }) {
  return (
    <div className="shadow-md w-full h-full p-1">
        <div className="m-2 flex items-center gap-2">
        <CircleAvatar content={post.author.userName.slice(0,1).toUpperCase()} styleAddons={"h-8 w-8"} img={post?.authorProfilePic}/>
        <h1>{post.author.userName}</h1>
        </div>
      <img className="w-full h-56" src={post.postPic} alt="" />
      <div>
      <p className="m-2 font-semibold">{post.content}</p>
      </div>
    </div>
  );
}
