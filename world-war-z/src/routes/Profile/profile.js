import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import "./profile.css";

export default function Profile({ username, bunker }) {
  const [user, setUser] = useState();
  const [bunkerData, setBunkerData] = useState();
  useEffect(() => {
    fetch(`http://192.168.1.17:5000/users/${username}`)
      .then((res) => {
        res.json().then((object) => {
          setUser(object.user);
        });
      })
      .catch((e) => console.log(e));
    fetch(`http://192.168.1.17:5000/bunkers/${bunker}`)
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
    <div id="ProfileCard" aria-label="Profile">
      <FaUser style={{ fontSize: 100, margin: "auto" }} />
      <p aria-label="Username">Username: {username}</p>
      <p aria-label="Bunker">
        In bunker {bunker} with status{" "}
        {bunkerData ? (bunkerData.isAlive ? "alive" : "death") : "..."}
      </p>
      <p aria-label="latitud and longitud">
        Located at{" "}
        {bunkerData ? `lat: ${bunkerData.lat} long: ${bunkerData.long}` : "..."}
      </p>
      <p aria-label="joined in">Joined in {user ? user.joinedDate : ""}</p>
    </div>
  );
}
