import React, { Component } from "react";
import Chart from "../../components/chart/chart";
import Featured from "../../components/featured/featured";
import NavBar from "../../components/navbar/navbar";
import SideBar from "../../components/sidebar/sidebar";
import Widget from "../../components/widget/widget";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <SideBar />
      <div className="homeContainer">
        <NavBar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="user" />
          <Widget type="user" />
          <Widget type="user" />
        </div>
        <div className="charts">
          <Featured />
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default Home;
