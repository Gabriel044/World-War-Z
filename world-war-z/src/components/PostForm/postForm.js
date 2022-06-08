import React, { useRef, useState } from "react";
import Banner from "../../components/Banner/banner";
import "./postForm.css";

export default function PostForm({ user, bunker, setAddPost, getPosts }) {
  const [showBanner, setShowBanner] = useState(false);
  const titleRef = useRef();
  const bodyRef = useRef();

  if (showBanner)
    setTimeout(() => {
      setShowBanner(false);
    }, 10000);

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
    fetch("http://192.168.1.17:5000/blogs", {
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
      {showBanner && (
        <Banner status={false} message={"Fill all the text fields"} />
      )}
      <input
        type="text"
        aria-label="PostTitleInput"
        ref={titleRef}
        className="PostFormInput"
        placeholder="Post Title"
      />
      <textarea
        type="textarea"
        aria-label="PostContentInput"
        ref={bodyRef}
        style={{ padding: "1rem" }}
        className="PostFormInput"
        id="PostFormBody"
        placeholder="Post Content"
      />
      <div id="PostFormFooter">
        <button
          className="PostFormButton"
          aria-label="Post"
          style={{ backgroundColor: "#4aa0eb" }}
          onClick={() => addPost()}
        >
          Post
        </button>
        <button
          className="PostFormButton"
          aria-label="Cancel"
          style={{ backgroundColor: "grey" }}
          onClick={() => cancelPost()}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
