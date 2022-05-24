import React, { Component } from "react";
import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import { Link } from "react-router-dom";
const SideBar = () => {
	return (
		<div className="sidebar">
			<div className="top">
				<Link to="/home" style={{ textDecoration: "none" }}>
					<span className="logo">Application Framworks</span>
				</Link>
			</div>
			<hr />
			<div className="center">
				<ul>
					<p className="title">MAIN</p>
					<li>
						<DashboardIcon className="icon" />
						<span>Dashboard</span>
					</li>
					<p className="title">CORE MODULES</p>
					<li>
						<Link to="/users" style={{ textDecoration: "none" }}>
							<PersonOutlineOutlinedIcon className="icon" />
							<span>Users</span>
						</Link>
					</li>
					<li>
						<Link to="/studentGroups" style={{ textDecoration: "none" }}>
							<GroupsRoundedIcon className="icon" />
							<span>Student Groups</span>
						</Link>
					</li>
					<p className="title">SETTINGS</p>
					<li>
						<AccountCircleOutlinedIcon className="icon" />
						<span>Profile</span>
					</li>
					<li>
						<PowerSettingsNewOutlinedIcon className="icon" />
						<span>LogOut</span>
					</li>
				</ul>
			</div>
			<div className="bottom">
				<div className="colorOption"></div>
				<div className="colorOption"></div>
			</div>
		</div>
	);
};

export default SideBar;
