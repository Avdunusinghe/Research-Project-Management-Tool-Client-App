import React, { Component, useState } from "react";

import "./user.detail.scss";
import SideBar from "./../../../components/sidebar/sidebar";
import NavBar from "./../../../components/navbar/navbar";
import CloudUploadIcon from "@mui/icons-material/Cloud";
import TextField from "@mui/material/TextField";
//import { ValidatorForm, TextValidator } from "react-mui-ui-form-validator";
const UserDetail = () => {
	const [file, setFile] = React.useState("");
	const [firstName, setFirstName] = React.useState("");
	const [lastName, setLadtName] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [mobileNumber, setMobileNumber] = React.useState("");
	const [roles, setRoles] = React.useState([]);

	const handleRoleChange = (event) => {
		const {
			target: { value },
		} = event;
		setRoles(typeof value === "string" ? value.split(",") : value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
	};
	return (
		<div className="new">
			<SideBar />
			<div className="newContainer">
				<NavBar />
				<div className="top">
					<h1>Add New User</h1>
				</div>
				<div className="bottom">
					<div className="left">
						<img src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg" alt=""></img>
					</div>
					<div className="right"></div>
				</div>
			</div>
		</div>
	);
};

export default UserDetail;
