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
import { Dropdown } from "primereact/dropdown";

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
		researchArea: "",
		panelMember: null,
	};
	const [requestDialog, setRequestDialog] = React.useState(false);
	const [requests, setRequests] = React.useState([]);
	const toast = React.useRef(null);
	const [submitted, setSubmitted] = React.useState(false);
	const [panelMembers, setPanelMembers] = React.useState(null);
	const [request, setRequest] = React.useState(initialRequestModel);

	let navigate = useNavigate();
	let location = useLocation();

	useEffect(
		() => {
			getAllSupervisorRequests();
			getPanelMemberMasterData();
		},
		[getAllSupervisorRequests],
		[getPanelMemberMasterData]
	);

	const getAllSupervisorRequests = useCallback(() => {
		requestService.getAllSupervisorRequests().then((response) => {
			setRequests(response.data);
		});
	}, []);

	const getPanelMemberMasterData = useCallback(() => {
		requestService
			.getPanelMemberMasterData()
			.then((response) => {
				let memebers = [];
				for (let index = 0; index < response.data.length; index++) {
					memebers.push({ name: response.data[index].fullName, id: response.data[index]._id });
				}

				setPanelMembers(memebers);
			}, [])
			.catch((error) => {});
	});

	const onPanelMemberChanged = (event, name) => {
		const member = event.value;
		let _request = { ...request };
		_request[`${name}`] = member;

		setRequest(d);
	};
	const actionColumn = [
		{
			field: "action",
			headerName: "Action",
			width: 200,
			renderCell: (params) => {
				return (
					<div className="cellAction">
						<Button
							icon="pi pi-pencil"
							onClick={() => handleSelectPanelMember(params.row)}
							className="p-button-rounded p-button-success mr-2"
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

	const allocatePanelMember = () => {
		setSubmitted(true);

		let _request = { ...request };

		console.log(_request);

		const allocatePanelMemberModel = {
			panelMember: _request.panelMember.name,
			isAccept: true,
		};

		requestService
			.allocatePanelMember(allocatePanelMemberModel)
			.then((response) => {
				if (response.data.isSuccess === true) {
					toast.current.show({ severity: "info", summary: "Success", detail: response.data.message, life: 3000 });
				} else {
					toast.current.show({ severity: "error", summary: "Error", detail: response.data.message, life: 3000 });
				}
			})
			.catch((error) => {
				toast.current.show({
					severity: "error",
					summary: "Error",
					detail: "Error has been occured,please try again",
					life: 3000,
				});
			});

		setRequestDialog(false);
		setRequest(initialRequestModel);
	};

	const requestDialogFooter = (
		<React.Fragment>
			<Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
			<Button label="Save" icon="pi pi-check" className="p-button-text" onClick={allocatePanelMember} />
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
				<div className="field">
					<label htmlFor="description">Research Area</label>
					<InputText id="description" value={request.researchArea} disabled />
				</div>
				<div className="field">
					<Dropdown
						value={request.panelMember}
						id="panelMember"
						name="panelMember"
						options={panelMembers}
						optionLabel="name"
						onChange={(event) => onPanelMemberChanged(event, "panelMember")}
						filter
						showClear
						filterBy="name"
					/>
				</div>
			</Dialog>
			<Toast ref={toast}></Toast>
		</div>
	);
};

export default RequestList;
