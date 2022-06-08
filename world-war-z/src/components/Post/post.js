import React from "react";
import "./post.css";

export default function Post({ post }) {
  console.log(post);
  return (
    <div className="Post" aria-label="Post">
      <div className="Header">
        <h2 aria-label="Post Title">{post.title}</h2>
        <div className="SubHeader">
          <p aria-label="author">{post.author}</p>
          <p aria-label="bunker">{post.bunker}</p>
          <p aria-label="date">{post.date}</p>
        </div>
      </div>
      <div className="Body">{post.content}</div>
    </div>
  );
}
