import React, { Component, useCallback, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import NavBar from "../../../components/navbar/navbar";
import SideBar from "../../../components/sidebar/sidebar";
import { Link } from "react-router-dom";
import "./topic-list.scss";
import moment from "moment";
import topicService from "../../../services/student/topic.service";
import { ToggleButton } from "primereact/togglebutton";

const topiccolumns = [
	{ field: "topicName", headerName: "Group name", width: 130 },
	{ field: "subject", headerName: "Subject name", width: 130 },
	{
		field: "groupleadername",
		headerName: "Group Leader Name",
		width: 160,
	},
	{
		field: "groupleaderId",
		headerName: "Group LeaderID",
		width: 160,
	},
	{
		field: "groupleaderEmail",
		headerName: "Group Leader Email",
		width: 160,
	},
	{
		field: "groupName",
		headerName: "Group Name",
		width: 160,
	},
	{
		field: "createOn",
		headerName: "Created On",
		width: 160,
		type: "date",
		valueFormatter: (params) => {
			return moment(params.value).format("YYYY-MM-DD");
		},
	},
];

const TopicList = () => {
	const [topics, setTopics] = React.useState([]);
	const [checked, setChecked] = React.useState(false);

	useEffect(() => {
		getAllTopics();
	}, [getAllTopics]);

	const getAllTopics = useCallback(() => {
		topicService.getAllTopics().then((response) => {
			setTopics(response.data);
		});
	}, []);

	const handleAccept = () => {};

	const actionColumn = [
		{
			field: "view",
			headerName: "View Group ",
			width: 200,
			renderCell: (params) => {
				return (
					<div className="cellAction">
						<Link to="/evaluationlist" style={{ textDecoration: "none" }}>
							<div className="viewButton" onClick={() => handleView(params.row.id)}>
								Evaluate
							</div>
						</Link>
						<Link to="/topicform" style={{ textDecoration: "none" }}>
							<div className="viewButton" onClick={() => handleView(params.row.id)}>
								Register Again
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

				<div className="bottom">
					<div className="datatable">
						<div className="datatableTitle">Registered Topics</div>
						<DataGrid
							rows={topics}
							columns={topiccolumns.concat(actionColumn)}
							pageSize={9}
							getRowId={(row) => row._id}
							rowsPerPageOptions={[10]}
							checkboxSelection
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TopicList;
