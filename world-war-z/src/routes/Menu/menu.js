import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Blog from "../Blog/blog";
import BunkerMap from "../BunkerMap/bunkerMap";
import "./menu.css";

export default function Menu({ props }) {
  console.log(props);
  return (
    <div id="Container">
      <div id="SideBar">Sidebar</div>
      <Routes>
        <Route path="/blog" element={<Blog />} />
        <Route path="/map" element={<BunkerMap />} />
      </Routes>
    </div>
  );
}
