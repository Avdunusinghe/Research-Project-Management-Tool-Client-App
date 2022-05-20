import React, { Component } from "react";
import "./sidebar.scss";
const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">AF</span>
      </div>
      <div className="center">list</div>
      <div className="bottom">mode</div>
    </div>
  );
};

export default SideBar;
