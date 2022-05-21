import React, { Component } from "react";
import NavBar from "../../../components/navbar/navbar";
import SideBar from "../../../components/sidebar/sidebar";
import "./user.list.scss";
const UserList = () => {
  return (
    <div className="list">
      <SideBar />
      <div className="listContainer">
        <NavBar />
        Tatatable
      </div>
    </div>
  );
};

export default UserList;
