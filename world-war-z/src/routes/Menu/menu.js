import React from "react";
import { Routes, Route } from "react-router-dom";
import { IoMapSharp, IoHome, IoPersonSharp } from "react-icons/io5";
import Blog from "../Blog/blog";
import BunkerMap from "../BunkerMap/bunkerMap";
import "./menu.css";

const sections = [
  { sectionName: "Blog", icon: <IoHome style={{ fill: "white" }} /> },
  { sectionName: "Maps", icon: <IoMapSharp style={{ fill: "white" }} /> },
  { sectionName: "Profile", icon: <IoPersonSharp style={{ fill: "white" }} /> },
];

export default function Menu({ props }) {
  console.log(props);
  return (
    <div id="ContainerMenu">
      <div id="SideBar">
        {sections.map((section, index) => (
          <div className="Sections">
            {section.icon}
            <button className="SectionsButton" key={index}>
              {section.sectionName}
            </button>
          </div>
        ))}
        <button id="LogOut">Log Out</button>
      </div>
      <Routes>
        <Route path="/blog" element={<Blog />} />
        <Route path="/map" element={<BunkerMap />} />
      </Routes>
    </div>
  );
}
