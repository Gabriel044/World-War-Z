import React, { useEffect, useState } from "react";
import Post from "../../components/Post/post";
import "./blog.css";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  console.log(typeof posts);
  useEffect(() => {
    console.log("Hi there");
    fetch("http://localhost:5000/blogs")
      .then((res) => {
        res
          .json()
          .then((object) => {
            console.log(JSON.parse(object.blogs));
            setPosts(JSON.parse(object.blogs));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div id="BlockContainer">
      <div id="MainHeader">News Feedback</div>
      <div id="FeedContainer">
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </div>
    </div>
  );
}
