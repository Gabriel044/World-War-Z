import React, { useEffect, useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import Post from "../../components/Post/post";
import PostForm from "../../components/PostForm/postForm.js";
import "./blog.css";

export default function Blog({ username, bunker }) {
  const [posts, setPosts] = useState([]);
  const [addPost, setAddPost] = useState(false);
  console.log(typeof posts);

  function getStoredPosts() {
    var storedPosts = localStorage.getItem("POSTS")

    if (storedPosts !== null){
      console.log("Tenemos una respuesta guardada")
      var res = JSON.parse(storedPosts)
      console.log("el parse está asi: ")
      console.log(JSON.parse(res))
      return JSON.parse(res)
    }

    console.log("No tenemos ningún post guardado")
    return []
  } 

  function getPosts() {
    fetch("http://localhost:5000/blogs")
      .then((res) => {
        res
          .json()
          .then((object) => {
            console.log(JSON.parse(object.blogs));
            var userPosts = JSON.stringify(object.blogs) // Convertir object a string
            localStorage.setItem("POSTS", userPosts); // Guardar string en localStorge
            setPosts(JSON.parse(object.blogs));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log("Hubo un error al solicitar los posts del blog: " + err)
        // solicitar posts de local storage
        setPosts(getStoredPosts())
    });
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div id="BlockContainer">
      <div id="MainHeader">The End News</div>
      <div id="FeedContainer">
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </div>
      <IoAddCircleSharp id="AddPost" onClick={() => setAddPost(true)} />
      {addPost && (
        <PostForm
          user={username}
          bunker={bunker}
          setAddPost={setAddPost}
          getPosts={getPosts}
        />
      )}
    </div>
  );
}
