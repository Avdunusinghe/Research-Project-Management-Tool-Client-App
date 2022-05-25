import React, { Component, useCallback, useEffect } from "react";
import NavBar from "../../../components/navbar/navbar";
import SideBar from "../../../components/sidebar/sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import moment from "moment";
import "./user.list.scss";
import userService from "../../../services/user/user.service";

const userColumns = [
	{
		field: "fullName",
		headerName: "Full Name",
		width: 150,
	},
	{
		field: "email",
		headerName: "Email",
		width: 150,
	},
	{
		field: "mobileNumber",
		headerName: "Mobile Number",
		width: 150,
		type: "date",
	},
	{
		field: "createOn",
		headerName: "Created On",
		width: 150,
		type: "date",
		valueFormatter: (params) => {
			return moment(params.value).format("YYYY-MM-DD");
		},
	},
	{
		field: "updatedOn",
		headerName: "Updated On",
		width: 150,
		valueFormatter: (params) => {
			return moment(params.value).format("YYYY-MM-DD");
		},
	},
];

const UserList = () => {
	const [users, setUsers] = React.useState([]);

	useEffect(() => {
		getAllUsers();
	}, [getAllUsers]);

	const getAllUsers = useCallback(() => {
		userService.getAllUsers().then((response) => {
			setUsers(response.data);
		});
	}, []);

	const actionColumn = [
		{
			field: "action",
			headerName: "Action",
			width: 200,
			renderCell: (params) => {
				return (
					<div className="cellAction">
						<Link to="/users/test" style={{ textDecoration: "none" }}>
							<div className="viewButton">Update</div>
						</Link>
						<div className="deleteButton" onClick={() => handleDelete(params.row._id)}>
							Delete
						</div>
					</div>
				);
			},
		},
	];
	return (
		<div className="list">
			<SideBar />
			<div className="listContainer">
				<NavBar />
				<div className="datatable">
					<div className="datatableTitle">
						Add New User
						<Link to="/users/new" style={{ textDecoration: "none" }}>
							<Button variant="contained" className="addNewBtn">
								Add New User
							</Button>
						</Link>
					</div>
					<DataGrid
						rows={users}
						columns={userColumns.concat(actionColumn)}
						pageSize={9}
						getRowId={(row) => row._id}
						rowsPerPageOptions={[10]}
						checkboxSelection
					/>
				</div>
			</div>
		</div>
	);
};

export default UserList;
