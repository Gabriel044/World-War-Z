import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { IoMapSharp, IoHome, IoPersonSharp } from "react-icons/io5";
import { GiRaiseZombie } from "react-icons/gi";
import Blog from "../Blog/blog";
import BunkerMap from "../BunkerMap/bunkerMap";
import "./menu.css";

const sections = [
  { sectionName: "Blog", icon: <IoHome style={{ fill: "white" }} /> },
  { sectionName: "Maps", icon: <IoMapSharp style={{ fill: "white" }} /> },
  { sectionName: "Profile", icon: <IoPersonSharp style={{ fill: "white" }} /> },
];

export default function Menu() {
  const { state } = useLocation();
  const { username, bunker } = state;
  return (
    <div id="ContainerMenu">
      <div id="SideBar">
        <div id="SideBarHeader">
          <GiRaiseZombie style={{ fontSize: 40, margin: "auto" }} />
          <p style={{ width: "fit-content", margin: 0 }}>Survivors Community</p>
        </div>
        {sections.map((section, index) => (
          <div className="Sections" key={index}>
            {section.icon}
            <button className="SectionsButton">{section.sectionName}</button>
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
          <button id="LogOut">Log Out</button>
        </div>
      </div>
      <Routes>
        <Route path="/blog" element={<Blog />} />
        <Route path="/map" element={<BunkerMap />} />
      </Routes>
    </div>
  );
}
