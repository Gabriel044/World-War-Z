import React from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { IoMapSharp, IoHome, IoPersonSharp } from "react-icons/io5";
import { GiRaiseZombie } from "react-icons/gi";
import Blog from "../Blog/blog";
import BunkerMap from "../BunkerMap/bunkerMap";
import Profile from "../Profile/profile";
import "./menu.css";

const sections = [
  { sectionName: "Blog", icon: <IoHome style={{ fill: "white" }} /> },
  { sectionName: "Maps", icon: <IoMapSharp style={{ fill: "white" }} /> },
  { sectionName: "Profile", icon: <IoPersonSharp style={{ fill: "white" }} /> },
];

export default function Menu() {
  const { state } = useLocation();
  const { username, bunker } = state;
  const navigate = useNavigate();

  function logOut() {
    navigate("/", { replace: true });
  }

  return (
    <div id="ContainerMenu">
      <nav id="SideBar">
        <div id="SideBarHeader">
          <GiRaiseZombie style={{ fontSize: 40, margin: "auto" }} />
          <p style={{ width: "fit-content", margin: 0 }}>Survivors Community</p>
        </div>
        {sections.map((section, index) => (
          <div className="Sections" key={index}>
            {section.icon}
            <button
              className="SectionsButton"
              onClick={() => {
                navigate(`/menu/${section.sectionName.toLowerCase()}`, {
                  state: {
                    username: username,
                    bunker: bunker,
                  },
                  replace: true,
                });
              }}
            >
              {section.sectionName}
            </button>
          </div>
        ))}
        <div id="Footer">
          <p>
            <b>User: </b>
            {username}
          </p>
          <p>
            <b>From: </b>
            {bunker}
          </p>
          <button id="LogOut" onClick={() => logOut()}>
            Log Out
          </button>
        </div>
      </nav>
      <div id="scroll">
        <Routes>
          <Route
            path="/blog"
            element={<Blog username={username} bunker={bunker} />}
          />
          <Route
            path="/maps"
            element={<BunkerMap username={username} bunker={bunker} />}
          />
          <Route
            path="/profile"
            element={<Profile username={username} bunker={bunker} />}
          />
        </Routes>
      </div>
    </div>
  );
}
