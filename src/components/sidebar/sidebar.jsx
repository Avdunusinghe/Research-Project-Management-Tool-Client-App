import React, { Component, useEffect } from "react";
import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddCardIcon from "@mui/icons-material/AddCard";
import TopicIcon from "@mui/icons-material/Topic";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const SideBar = () => {
	const currentUser = JSON.parse(localStorage.getItem("currentUser"));

	let navigate = useNavigate();
	let location = useLocation();

	const logOut = () => {
		localStorage.removeItem("currentUser");
		navigate("/" + location.search);
	};

	return (
		<div className="sidebar">
			<div className="top">
				<Link to="/home" style={{ textDecoration: "none" }}>
					<span className="logo">FOC Research Project</span>
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
					{currentUser.isAdmin === true && (
						<li>
							<Link to="/users" style={{ textDecoration: "none" }}>
								<PersonOutlineOutlinedIcon className="icon" />
								<span>Users</span>
							</Link>
						</li>
					)}
					{currentUser.isAdmin === true && (
						<li>
							<Link to="/studentGroupslist" style={{ textDecoration: "none" }}>
								<GroupsRoundedIcon className="icon" />
								<span>Student Groups</span>
							</Link>
						</li>
					)}
					{currentUser.isAdmin === true && (
						<li>
							<Link to="/request" style={{ textDecoration: "none" }}>
								<GroupsRoundedIcon className="icon" />
								<span>Panel Member Request</span>
							</Link>
						</li>
					)}

					<li>
						<Link to="/topiclist" style={{ textDecoration: "none" }}>
							<TopicIcon className="icon" />
							<span>Registered Topic</span>
						</Link>
					</li>

					{currentUser.isAdmin === true && (
						<li>
							<Link to="/evaluationlist" style={{ textDecoration: "none" }}>
								<TopicIcon className="icon" />
								<span>Evaluation</span>
							</Link>
						</li>
					)}

					{currentUser.isStudent === true && (
						<li>
							<Link to="/studentGroups" style={{ textDecoration: "none" }}>
								<GroupAddIcon className="icon" />
								<span>Register Groups</span>
							</Link>
						</li>
					)}

					{currentUser.isAdmin === true && (
						<li>
							<Link to="/submission" style={{ textDecoration: "none" }}>
								<FileCopyOutlinedIcon className="icon" />
								<span>Submission</span>
							</Link>
						</li>
					)}

					{currentUser.isStudent === true && (
						<li>
							<Link to="/topicform" style={{ textDecoration: "none" }}>
								<TopicIcon className="icon" />
								<span>Topic Registration</span>
							</Link>
						</li>
					)}

					{currentUser.isStudent === true && (
						<li>
							<Link to="/assignmentlist" style={{ textDecoration: "none" }}>
								<TopicIcon className="icon" />
								<span>Assignments</span>
							</Link>
						</li>
					)}

					<p className="title">SETTINGS</p>
					<li>
						<AccountCircleOutlinedIcon className="icon" />
						<span>Profile</span>
					</li>
					<li onClick={() => logOut()}>
						<PowerSettingsNewOutlinedIcon className="icon" />
						<span>LogOut</span>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default SideBar;
