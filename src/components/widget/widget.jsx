import React, { Component } from "react";
import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
const Widget = () => {
  return (
    <div className="widget">
      <div className="left">
        <span className="title">USERS</span>
        <span className="counter">24</span>
        <span className="link">See All Users</span>
      </div>
      <div className="right">
        <KeyboardArrowUpIcon />
        <div className="percentage positive">20%</div>
        <PersonOutlineIcon className="icon" />
      </div>
    </div>
  );
};

export default Widget;
