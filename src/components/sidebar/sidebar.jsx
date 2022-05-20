import React, { Component } from "react";
import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">AF</span>
      </div>
      <hr></hr>
      <div className="center">
        <ul>
          <li>
            <DashboardIcon></DashboardIcon>
            <span>Dashboard</span>
          </li>
          <li>
            <span>Users</span>
          </li>
          <li>
            <span>Dashboard</span>
          </li>
          <li>
            <span>Dashboard</span>
          </li>
          <li>
            <span>Dashboard</span>
          </li>
        </ul>
      </div>
      <div className="bottom">mode</div>
    </div>
  );
};

export default SideBar;
