import React from "react";
import "./post.css";

export default function Post({ post }) {
  console.log(post);
  return (
    <div className="Post">
      <div className="Header">
        <h2>{post.title}</h2>
        <div className="SubHeader">
          <p>{post.author}</p>
          <p>{post.bunker}</p>
          <p>{post.date}</p>
        </div>
      </div>
      <div className="Body">{post.content}</div>
    </div>
  );
}
