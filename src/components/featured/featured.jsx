import React, { Component } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./featured.scss";
const Featured = () => {
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Student</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart"></div>
      </div>
    </div>
  );
};

export default Featured;
