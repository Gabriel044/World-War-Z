import React, { useRef, useState, useEffect } from "react";
import "./postForm.css";

export default function PostForm({ user, bunker, setAddPost, getPosts }) {
  const [showBanner, setShowBanner] = useState(false);
  const titleRef = useRef();
  const bodyRef = useRef();

  function addPost() {
    let date = new Date();
    let title = titleRef.current.value;
    let content = bodyRef.current.value;
    if (title == "" || content == "") {
      setShowBanner(true);
      return;
    }
    let data = {
      author: user,
      bunker: bunker,
      title: title,
      content: content,
      date:
        date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear(),
    };
    fetch("http://localhost:5000/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        setAddPost(false);
        getPosts();
        console.log("Success:", data);
      })
      .catch((e) => console.log(e));
  }

  function cancelPost() {
    setAddPost(false);
  }

  return (
    <div id="PostFormContainer">
      <input
        type="text"
        ref={titleRef}
        className="PostFormInput"
        placeholder="Post Title"
      />
      <textarea
        type="textarea"
        ref={bodyRef}
        style={{ padding: "1rem" }}
        className="PostFormInput"
        id="PostFormBody"
        placeholder="Post Content"
      />
      <div id="PostFormFooter">
        <button
          className="PostFormButton"
          style={{ backgroundColor: "#4aa0eb" }}
          onClick={() => addPost()}
        >
          Post
        </button>
        <button
          className="PostFormButton"
          style={{ backgroundColor: "grey" }}
          onClick={() => cancelPost()}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
