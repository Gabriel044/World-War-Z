import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import "./profile.css";

export default function Profile({ username, bunker }) {
  const [user, setUser] = useState();
  useEffect(() => {
    fetch(`http://localhost:5000/users/${username}`)
      .then((res) => {
        res.json().then((object) => {
          setUser(object.user);
        });
      })
      .catch();
  }, []);
  console.log(user);
  return (
    <div id="ProfileCard">
      <FaUser style={{ fontSize: 100, margin: "auto" }} />
      <p>Username: {username}</p>
      <p>Bunker: {bunker}</p>
      <p>Located at </p>
      <p>Joined in {user ? user.joinedDate : ""}</p>
    </div>
  );
}
