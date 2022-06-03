import React, { Component, useCallback, useEffect } from "react";
import NavBar from "../../../components/navbar/navbar";
import SideBar from "../../../components/sidebar/sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import "./user.list.scss";
import { ToastContainer, toast } from "react-toastify";
import userService from "../../../services/user/user.service";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Dropdown } from "primereact/dropdown";

import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";
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
	const departmentType = [
		{ name: "IT", code: "IT" },
		{ name: "SE", code: "SE" },
		{ name: "ISE", code: "ISE" },
	];
	const userModel = {
		id: null,
		email: "",
		fullName: "",
		mobileNumber: "",
		password: "",
		department: null,
		isAdmin: false,
		isPanelMember: false,
		isSupervisor: false,
		isLecure: false,
		isCoSupervisor: false,
		isStudent: false,
	};
	const [usereDialog, setUserDialog] = React.useState(false);
	const [users, setUsers] = React.useState([]);
	const [user, setUser] = React.useState(userModel);
	const [submitted, setSubmitted] = React.useState(false);
	const [departments, setDeparments] = React.useState(null);
	const toast = React.useRef(null);

	let navigate = useNavigate();
	let location = useLocation();

	useEffect(() => {
		getAllUsers();
		setDeparments(departmentType);
	}, [getAllUsers]);

	const getAllUsers = useCallback(() => {
		userService.getAllUsers().then((response) => {
			setUsers(response.data);
		});
	}, []);

	const hideDialog = () => {
		setSubmitted(false);
		setUserDialog(false);
	};

	const handleUserSave = (params) => {
		let model = params;
		model.id = params._id;

		for (let index = 0; index < departmentType.length; index++) {
			if (params.department === departmentType[index].name) {
				model.department = departmentType[index];
			}
		}

		setUser({ ...model });
		setUserDialog(true);
	};

	const userDialogFooter = (
		<React.Fragment>
			<Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
			<Button label="Save" icon="pi pi-check" className="p-button-text" onClick={() => saveUser(user)} />
		</React.Fragment>
	);

	const saveUser = () => {
		setSubmitted(true);
		let _user = { ...user };

		const userViewModel = {
			id: _user.id,
			fullName: _user.fullName,
			email: _user.email,
			mobileNumber: _user.mobileNumber,
			department: _user.department.name,
			password: _user.password,
			isAdmin: _user.isAdmin,
			isLecure: _user.isLecure,
			isSupervisor: _user.isSupervisor,
			isCoSupervisor: _user.isCoSupervisor,
			isPanelMember: _user.isPanelMember,
		};

		userService.saveUser(userViewModel).then((response) => {
			if (response.data.isSuccess === true) {
				toast.current.show({ severity: "info", summary: "Success", detail: response.data.message, life: 3000 });
				setUserDialog(false);
				setUser(userModel);
				setSubmitted(true);
				getAllUsers();
			} else {
				toast.current.show({ severity: "error", summary: "Error", detail: response.data.message, life: 3000 });
			}
		});
	};

	const actionColumn = [
		{
			field: "action",
			headerName: "Action",
			width: 200,
			renderCell: (params) => {
				return (
					<div className="cellAction">
						<div className="viewButton" onClick={() => handleUserSave(params.row)}>
							Update
						</div>
						<div className="deleteButton" onClick={() => handleDelete(params.row._id)}>
							Delete
						</div>
					</div>
				);
			},
		},
	];

	const openUserDialog = () => {
		setUser({ ...user });
		setUserDialog(true);
	};

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

	const onInputChange = (event, name) => {
		const value = (event.target && event.target.value) || "";
		let _user = { ...user };
		_user[`${name}`] = value;

		setUser(_user);
	};

	const onDepartmentChange = (event, name) => {
		const department = event.value;
		let _model = { ...user };
		_model[`${name}`] = department;

		setUser(_model);
	};

	const onRoleChange = (event, name) => {
		const _model = { ...user };
		_model[`${name}`] = event.value;

		setUser(_model);
	};

	return (
		<div className="list">
			<SideBar />
			<div className="listContainer">
				<NavBar />
				<div className="datatable">
					<div className="datatableTitle">
						Add New User
						<Button variant="contained" onClick={openUserDialog} className="addNewBtn">
							Add New User
						</Button>
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
			<Dialog
				visible={usereDialog}
				style={{ width: "450px" }}
				header="User Details"
				modal
				className="p-fluid"
				footer={userDialogFooter}
				onHide={hideDialog}
			>
				<div className="field">
					<label htmlFor="fullName">Full Name </label>
					<InputText
						id="fullName"
						value={user.fullName}
						onChange={(event) => onInputChange(event, "fullName")}
						required
						autoFocus
						className={classNames({ "p-invalid": submitted && !user.fullName })}
					/>
					{submitted && !user.fullName && <small className="p-error">Full Name is required.</small>}
				</div>
				<div className="field">
					<label htmlFor="email">Email</label>
					<InputText
						id="email"
						value={user.email}
						onChange={(event) => onInputChange(event, "email")}
						required
						className={classNames({ "p-invalid": submitted && !user.email })}
					/>
					{submitted && !user.email && <small className="p-error">Email is required.</small>}
				</div>
				<div className="field">
					<label htmlFor="mobileNumber">Mobile Number</label>
					<InputText
						id="mobileNumber"
						value={user.mobileNumber}
						onChange={(event) => onInputChange(event, "mobileNumber")}
						required
						className={classNames({ "p-invalid": submitted && !user.mobileNumber })}
					/>
					{submitted && !user.mobileNumber && <small className="p-error">Mobile Number is required.</small>}
				</div>
				{user.id == null && (
					<div className="field">
						<label htmlFor="password">Password</label>
						<InputText
							id="password"
							value={user.password}
							onChange={(event) => onInputChange(event, "password")}
							required
							className={classNames({ "p-invalid": submitted && !user.password })}
						/>
						{submitted && !user.password && <small className="p-error">Mobile Number is required.</small>}
					</div>
				)}
				<div className="field">
					<label htmlFor="department">Department</label>
					<Dropdown
						value={user.department}
						id="department"
						name="department"
						optionLabel="name"
						onChange={(event) => onDepartmentChange(event, "department")}
						options={departments}
						filter
						showClear
						filterBy="name"
					/>
				</div>
				<div className="field">
					<label className="mb-3">Role</label>
					<div className="formgrid grid">
						<div className="field-radiobutton col-6">
							<RadioButton
								inputId="isAdmin"
								name="isAdmin"
								value={true}
								onChange={(event) => onRoleChange(event, "isAdmin")}
								checked={user.isAdmin === true}
							/>
							<label htmlFor="category1">Admin</label>
						</div>
						<div className="field-radiobutton col-6">
							<RadioButton
								inputId="isLecure"
								name="isLecure"
								value={true}
								onChange={(event) => onRoleChange(event, "isLecure")}
								checked={user.isLecure === true}
							/>
							<label htmlFor="isLecure">Lecure</label>
						</div>
						<div className="field-radiobutton col-6">
							<RadioButton
								inputId="isCoSupervisor"
								name="isCoSupervisor"
								value={true}
								onChange={(event) => onRoleChange(event, "isCoSupervisor")}
								checked={user.isCoSupervisor === true}
							/>
							<label htmlFor="isCoSupervisor">Co-Supervisor</label>
						</div>
						<div className="field-radiobutton col-6">
							<RadioButton
								inputId="isPanelMember"
								name="isPanelMember"
								value={true}
								onChange={(event) => onRoleChange(event, "isPanelMember: ")}
								checked={user.isPanelMember === true}
							/>
							<label htmlFor="isPanelMember">Panel Member</label>
						</div>
						<div className="field-radiobutton col-6">
							<RadioButton
								inputId="isSupervisor"
								name="isSupervisor"
								value={true}
								onChange={(event) => onRoleChange(event, "isSupervisor: ")}
								checked={user.isSupervisor === true}
							/>
							<label htmlFor="isSupervisor">Supervisor</label>
						</div>
						<div className="field-radiobutton col-6">
							<RadioButton
								inputId="isStudent"
								name="isStudent"
								value={true}
								onChange={(event) => onRoleChange(event, "isStudent")}
								checked={user.isStudent === true}
							/>
							<label htmlFor="isStudent">Student</label>
						</div>
					</div>
				</div>
			</Dialog>
		</div>
	);
};

export default UserList;
