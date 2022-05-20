import React, { Component } from "react";
import SideBar from "../../components/sidebar/sidebar";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <SideBar />
      <div className="homeContainer">container</div>
    </div>
  );
};

export default Home;
