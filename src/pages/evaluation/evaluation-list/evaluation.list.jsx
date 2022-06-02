import React, { Component, useCallback, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import NavBar from "../../../components/navbar/navbar";
import SideBar from "../../../components/sidebar/sidebar";
import { Link, useLocation, useNavigate  } from "react-router-dom";
import "./evaluation.list.scss";
import moment from "moment";
import evaluationService from "../../../services/evaluation/evaluation.service";
import { ToastContainer, toast } from "react-toastify";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

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
	const evaluationType = [
		{ name: "Topic", code: "Topic" },
		{ name: "Document", code: "Document" },
		{ name: "Student Presentation", code: "Student Presentation" },
	];

	const evaluationModel = {
		id: null,
		evaluationType: null,
		groupId: "",
		evaluatorname: "",
		evaluatoremail: "",
		mark: "",
		feedback: "",
	};

	const [evaluationDialog, setEvaluationDialog] = React.useState(false);
	const [evaluations, setEvaluations] = React.useState([]);
	const [evaluation, setEvaluation] = React.useState(evaluationModel);
	const [submitted, setSubmitted] = React.useState(false);
	const [evaluationTypes, setEvaluationTypes] = React.useState(null);
	const toast = React.useRef(null);

	let navigate = useNavigate();
	let location = useLocation();

	useEffect(() => {
		getAllEvaluations();
		setEvaluationTypes(evaluationType);
	}, [getAllEvaluations]);

	const getAllEvaluations = useCallback(() => {
		evaluationService.getAllEvaluationItems().then((response) => {
			setEvaluations(response.data);
		});
	}, []);

	const hideDialog = () => {
		setSubmitted(false);
		setEvaluationDialog(false);
	};

	const handleEvaluationSave = (params) => {
		let model = params;
		model.id = params._id;

		for (let index = 0; index < evaluationType.length; index++) {
			if (params.evaluationType === evaluationType[index].name) {
				model.evaluationType = evaluationType[index];
			}
		}

		setEvaluation({ ...model });
		setEvaluationDialog(true);
	};

	const evaluationDialogFooter = (
		<React.Fragment>
			<Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
			<Button label="Save" icon="pi pi-check" className="p-button-text" onClick={() => saveEvaluation(evaluation)} />
		</React.Fragment>
	);

	const saveEvaluation = () => {
		setSubmitted(true);
		let _evaluation = { ...evaluation };

		const evaluationViewModel = {
			id: _evaluation.id,
			evaluationType: _evaluation.evaluationType.name,
			groupId: _evaluation.groupId,
			evaluatorname: _evaluation.evaluatorname,
			evaluatoremail: _evaluation.evaluatoremail,
			mark: _evaluation.mark,
			feedback: _evaluation.feedback,
		};

		evaluationService.saveEvaluation(evaluationViewModel).then((response) => {
			if (response.data.isSuccess === true) {
				toast.current.show({ severity: "info", summary: "Success", detail: response.data.message, life: 3000 });
				setEvaluationDialog(false);
				setEvaluation(evaluationModel);
				setSubmitted(true);
				getAllEvaluations();
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
						<div className="viewButton" onClick={() => handleEvaluationSave(params.row)}>
							Re-Evaluate
						</div>
						<div className="deleteButton" onClick={() => handleDelete(params.row._id)}>
							Delete
						</div>
					</div>
				);
			},
		},
	];

	const openEvaluationDialog = () => {
		setEvaluation({ ...evaluation });
		setEvaluationDialog(true);
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
		evaluationService.deleteEvaluation(id).then((response) => {
			if (response.data.isSuccess === true) {
				toast.current.show({ severity: "info", summary: "Confirmed", detail: response.data.message, life: 3000 });
				getAllEvaluations();
			} else {
				toast.current.show({ severity: "error", summary: "Rejected", detail: response.data.message, life: 3000 });
			}
		});
	};

	const reject = () => {
		toast.current.show({ severity: "warn", summary: "Rejected", detail: "You have rejected", life: 3000 });
	};

	const onInputChange = (event, name) => {
		console.log(event, name);
		const value = (event.target && event.target.value) || "";
		let _evaluation = { ...evaluation };
		_evaluation[`${name}`] = value;

		setEvaluation(_evaluation);
	};

	const onEvaluationTypeChange = (event, name) => {
		const evaluationType = event.value;
		let _model = { ...evaluation };
		_model[`${name}`] = evaluationType;

		setEvaluation(_model);
	};

	return (
		 <div className="list">
			<SideBar />
			<div className="listContainer">
				<NavBar />
				<div className="datatable">
					<div className="datatableTitle">
						Evaluation Items
						<Button variant="contained" onClick={openEvaluationDialog} className="addNewBtn">
							Add New Evaluation Item
						</Button>
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
			<Dialog
				visible={evaluationDialog}
				style={{ width: "450px" }}
				header="Evaluation Form"
				modal
				className="p-fluid"
				footer={evaluationDialogFooter}
				onHide={hideDialog}
			>
				<div className="field">
					<label htmlFor="evaluationType">Evaluation Type</label>
					<Dropdown
						value={evaluation.evaluationType}
						id="evaluationType"
						name="evaluationType"
						optionLabel="name"
						onChange={(event) => onEvaluationTypeChange(event, "evaluationType")}
						options={evaluationTypes}
						filter
						showClear
						filterBy="name"
					/>
				</div>
				<div className="field">
					<label htmlFor="groupId">Group ID</label>
					<InputText
						id="groupId"
						value={evaluation.groupId}
						onChange={(event) => onInputChange(event, "groupId")}
						required
						className={classNames({ "p-invalid": submitted && !evaluation.groupId })}
					/>
					{submitted && !evaluation.groupId && <small className="p-error">Group ID is required.</small>}
				</div>
				<div className="field">
					<label htmlFor="evaluatorname">Evaluator Name</label>
					<InputText
						id="evaluatorname"
						value={evaluation.evaluatorname}
						onChange={(event) => onInputChange(event, "evaluatorname")}
						required
						className={classNames({ "p-invalid": submitted && !evaluation.evaluatorname })}
					/>
					{submitted && !evaluation.evaluatorname && <small className="p-error">Evaluator Name is required.</small>}
				</div>
				<div className="field">
					<label htmlFor="evaluatoremail">Evaluator Email</label>
					<InputText
						id="evaluatoremail"
						value={evaluation.evaluatoremail}
						onChange={(event) => onInputChange(event, "evaluatoremail")}
						required
						className={classNames({ "p-invalid": submitted && !evaluation.evaluatoremail })}
					/>
					{submitted && !evaluation.evaluatoremail && <small className="p-error">Evaluator Email is required.</small>}
				</div>
				<div className="field">
					<label htmlFor="mark">Mark</label>
					<InputText
						id="mark"
						value={evaluation.mark}
						onChange={(event) => onInputChange(event, "mark")}
						required
						className={classNames({ "p-invalid": submitted && !evaluation.mark })}
					/>
					{submitted && !evaluation.mark && <small className="p-error">Mark is required.</small>}
				</div>
				<div className="field">
					<label htmlFor="feedback">FeedBack</label>
					<InputText
						id="feedback"
						value={evaluation.feedback}
						onChange={(event) => onInputChange(event, "feedback")}
						required
						className={classNames({ "p-invalid": submitted && !evaluation.feedback })}
					/>
					{submitted && !evaluation.feedback && <small className="p-error">FeedBack is required.</small>}
				</div>
			</Dialog>
		</div> 
	);
};

export default EvaluationList;