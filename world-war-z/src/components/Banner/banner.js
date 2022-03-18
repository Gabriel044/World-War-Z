import React from "react";
import "./banner.css";

export default function Banner({ status, message }) {
  return (
    <div className={status ? "success banner" : "danger banner"}>{message}</div>
  );
}
