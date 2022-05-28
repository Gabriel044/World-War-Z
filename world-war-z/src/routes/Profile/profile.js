import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import "./profile.css";

export default function Profile({ username, bunker }) {
  const [user, setUser] = useState();
  const [bunkerData, setBunkerData] = useState();
  useEffect(() => {
    fetch(`http://localhost:5000/users/${username}`)
      .then((res) => {
        res.json().then((object) => {
          setUser(object.user);
        });
      })
      .catch((e) => console.log(e));
    fetch(`http://localhost:5000/bunkers/${bunker}`)
      .then((res) => {
        console.log(res);
        res.json().then((object) => {
          console.log(object);
          setBunkerData(object.bunker);
        });
      })
      .catch((e) => console.log(e));
  }, []);
  console.log(bunkerData);
  return (
    <div id="ProfileCard">
      <FaUser style={{ fontSize: 100, margin: "auto" }} />
      <p>Username: {username}</p>
      <p>
        In bunker {bunker} with status{" "}
        {bunkerData ? (bunkerData.isAlive ? "alive" : "death") : "..."}
      </p>
      <p>
        Located at{" "}
        {bunkerData ? `lat: ${bunkerData.lat} long: ${bunkerData.long}` : "..."}
      </p>
      <p>Joined in {user ? user.joinedDate : ""}</p>
    </div>
  );
}
