import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Blog from "../Blog/blog";
import BunkerMap from "../BunkerMap/bunkerMap";
import "./menu.css";

const sections = ["Maps", "Blog"];

export default function Menu({ props }) {
  console.log(props);
  return (
    <div id="ContainerMenu">
      <div id="SideBar">
        {sections.map((section, index) => (
          <button key={index}>{section}</button>
        ))}
      </div>
      <Routes>
        <Route path="/blog" element={<Blog />} />
        <Route path="/map" element={<BunkerMap />} />
      </Routes>
    </div>
  );
}
