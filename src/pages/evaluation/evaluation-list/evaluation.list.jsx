import React, { Component, useCallback, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import NavBar from "../../../components/navbar/navbar";
import SideBar from "../../../components/sidebar/sidebar";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import "./evaluation.list.scss";
import moment from "moment";
import evaluationService from "../../../services/evaluation/evaluation.service";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { ToastContainer, toast } from "react-toastify";
import { Toast } from "primereact/toast";

const evaluationcolumns = [
	{ 
        field: "evaluationType", 
        headerName: "Evaluation Type", 
        width: 100 
    },

	{ 
        field: "groupId", 
        headerName: "Group Id", 
        width: 100 
    },

	{
		field: "evaluatorname",
		headerName: "Evaluator Name",
		width: 130,
	},
	{
		field: "evaluatoremail",
		headerName: "Evaluator Email",
		width: 130,
	},
	{
		field: "mark",
		headerName: "Mark",
		width: 130,
	},
	{
		field: "feedback",
		headerName: "Feedback",
		width: 130,
	},
	{
		field: "createOn",
		headerName: "Created On",
		width: 100,
		type: "date",
		valueFormatter: (params) => {
			return moment(params.value).format("YYYY-MM-DD");
		},
	},
];

const EvaluationList = () => {
	const [evaluations, setEvaluations] = React.useState([]);
	const [visible, setVisible] = React.useState(false);
	const toast = React.useRef(null);

	const accept = () => {
		toast.current.show({ severity: "info", summary: "Confirmed", detail: "You have accepted", life: 3000 });
	};

	const reject = () => {
		toast.current.show({ severity: "warn", summary: "Rejected", detail: "You have rejected", life: 3000 });
	};

	useEffect(() => {
		getAllEvaluations();
	}, [getAllEvaluations]);

	const getAllEvaluations = useCallback(() => {
		evaluationService.getAllEvaluationItems().then((response) => {
			setEvaluations(response.data);
		});
	}, []);

	const actionColumn = [
		{
			field: "action",
			headerName: "Action ",
			width: 200,
			renderCell: (params) => {
				return (
					<div className="cellAction">
						<Link to="/evaluationlist/new" style={{ textDecoration: "none" }}>
							<div className="viewButton">
								Re-Evaluate
							</div>
						</Link>
						<div className="deleteButton" onClick={() => handleDelete(params.row._id)}>
							Delete
						</div>
					</div>
				);
			},
		},
	];

	const handleDelete = () => {
		confirmDialog({
			message: "Do you want to delete this record?",
			header: "Delete Confirmation",
			icon: "pi pi-info-circle",
			acceptClassName: "p-button-danger",
			accept,
			reject,
		});
	};

	return (
		
		 <div className="list">
			<SideBar />
			<div className="listContainer">
				<NavBar />
				<div className="datatable">
					<div className="datatableTitle">
						Evaluation Items
						<Link to="/evaluationlist/new" style={{ textDecoration: "none" }}>
							<Button variant="contained" className="addNewBtn">
								Add New Evaluation Item
							</Button>
						</Link>
					</div>
					<DataGrid
						rows={evaluations}
						columns={evaluationcolumns.concat(actionColumn)}
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

export default EvaluationList;