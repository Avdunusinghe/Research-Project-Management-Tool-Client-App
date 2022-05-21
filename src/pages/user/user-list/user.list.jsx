import React, { Component } from "react";
import AdvancedDataTable from "../../../components/advanced-data-table/advance.data.table";
import NavBar from "../../../components/navbar/navbar";
import SideBar from "../../../components/sidebar/sidebar";
import "./user.list.scss";
const UserList = () => {
  return (
    <div className="list">
      <SideBar />
      <div className="listContainer">
        <NavBar />
        <AdvancedDataTable />
      </div>
    </div>
  );
};

export default UserList;
