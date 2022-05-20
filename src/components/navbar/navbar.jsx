import React from "react";
import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
const NavBar = () => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search"></input>
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon />
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon />
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon />
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon />
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon />
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon />
            English
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
