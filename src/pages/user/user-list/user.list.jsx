import React, { Component, useCallback, useEffect } from "react";
import NavBar from "../../../components/navbar/navbar";
import SideBar from "../../../components/sidebar/sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import moment from "moment";
import "./user.list.scss";
import { ToastContainer, toast } from "react-toastify";
import userService from "../../../services/user/user.service";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

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
	const [visible, setVisible] = React.useState(false);
	const toast = React.useRef(null);

	let navigate = useNavigate();
	let location = useLocation();

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

	const handleDelete = (id) => {
		confirmDialog({
			message: "Do you want to delete this record?",
			header: "Delete Confirmation",
			icon: "pi pi-info-circle",
			acceptClassName: "p-button-danger",
			accept: () => acceptFunc(id),
			reject,
		});
	};

	const acceptFunc = (id) => {
		userService.deleteUser(id).then((response) => {
			if (response.data.isSuccess === true) {
				toast.current.show({ severity: "info", summary: "Confirmed", detail: response.data.message, life: 3000 });
				getAllUsers();
			} else {
				toast.current.show({ severity: "error", summary: "Rejected", detail: response.data.message, life: 3000 });
			}
		});
	};

	const reject = () => {
		toast.current.show({ severity: "warn", summary: "Rejected", detail: "You have rejected", life: 3000 });
	};

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
					<ToastContainer />
				</div>
			</div>
			<Toast ref={toast} />
			<ConfirmDialog />
		</div>
	);
};

export default UserList;
