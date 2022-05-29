import React, { Component, useCallback, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import NavBar from "../../../components/navbar/navbar";
import SideBar from "../../../components/sidebar/sidebar";
import { Link } from "react-router-dom";
import "./evaluation.list.scss";
import moment from "moment";
import evaluationService from "../../../services/evaluation/evaluation.service";

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

	useEffect(() => {
		getAllEvaluations();
	}, [getAllEvaluations]);

	const getAllEvaluations = useCallback(() => {
		evaluationService.getAllEvaluations().then((response) => {
			setEvaluations(response.data);
		});
	}, []);

	const actionColumn = [
		{
			field: "view",
			headerName: "View Group ",
			width: 200,
			renderCell: (params) => {
				return (
					<div className="cellAction">
						<Link to="/evaluateform" style={{ textDecoration: "none" }}>
							<div className="viewButton" onClick={() => handleView(params.row.id)}>
								Evaluate
							</div>
						</Link>
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
					<div className="datatableTitle">Evaluation Items</div>
					<DataGrid
						rows={evaluations}
						columns={evaluationcolumns.concat(actionColumn)}
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

export default EvaluationList;