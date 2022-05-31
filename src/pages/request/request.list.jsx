import "./request.list.scss";
import { DataGrid } from "@mui/x-data-grid";
import NavBar from "./../../components/navbar/navbar";
import SideBar from "./../../components/sidebar/sidebar";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useCallback } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import requestService from "../../services/student/request.service";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
const requestColoumns = [
	{
		field: "groupName",
		headerName: "Group Name",
		width: 100,
	},
	{
		field: "firstmemberName",
		headerName: "Group Leader",
		width: 200,
	},
	{
		field: "firstmemberRegNumber",
		headerName: "Leader Register Id",
		width: 200,
	},
];
const RequestList = () => {
	let initialRequestModel = {
		id: null,
		groupName: "",
		firstmemberName: "",
		firstmemberEmail: "",
		firstmemberRegNumber: "",
		description: "",
	};
	const [requestDialog, setRequestDialog] = React.useState(false);
	const [requests, setRequests] = React.useState([]);
	const toast = React.useRef(null);
	const [submitted, setSubmitted] = React.useState(false);
	const [request, setRequest] = React.useState(initialRequestModel);

	let navigate = useNavigate();
	let location = useLocation();

	useEffect(() => {
		getAllSupervisorRequests();
	}, [getAllSupervisorRequests]);

	const getAllSupervisorRequests = useCallback(() => {
		requestService.getAllSupervisorRequests().then((response) => {
			console.log(response);
			setRequests(response.data);
		});
	}, []);

	const getPanelMemberMasterData = () => {};

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
						<Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" />
						<Button
							icon="pi pi-trash"
							onClick={() => handleSelectPanelMember(params.row)}
							className="p-button-rounded p-button-warning"
						/>
					</div>
				);
			},
		},
	];

	const handleSelectPanelMember = (params) => {
		let model = params;
		model.id = params._id;
		setRequest({ ...model });
		setRequestDialog(true);
	};

	const requestDialogFooter = (
		<React.Fragment>
			<Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
			<Button label="Save" icon="pi pi-check" className="p-button-text" />
		</React.Fragment>
	);

	const hideDialog = () => {
		setSubmitted(false);
		setRequestDialog(false);
	};

	return (
		<div className="list">
			<SideBar />
			<div className="listContainer">
				<NavBar />
				<div className="datatable">
					<div className="datatableTitle">Request List</div>
					<DataGrid
						rows={requests}
						columns={requestColoumns.concat(actionColumn)}
						pageSize={9}
						getRowId={(row) => row._id}
						rowsPerPageOptions={[10]}
						checkboxSelection
					/>
				</div>
			</div>
			<Toast ref={toast} />
			<ConfirmDialog />
			<Dialog
				visible={requestDialog}
				style={{ width: "500px" }}
				header="Panel Member Request Details"
				modal
				className="p-fluid"
				footer={requestDialogFooter}
				onHide={hideDialog}
			>
				<div className="field">
					<label htmlFor="name">Name</label>
					<InputText id="name" value={request.groupName} disabled />
				</div>
				<div className="field">
					<label htmlFor="description">Description</label>
					<InputTextarea id="description" value={request.description} disabled rows={3} cols={20} />
				</div>
			</Dialog>
		</div>
	);
};

export default RequestList;
