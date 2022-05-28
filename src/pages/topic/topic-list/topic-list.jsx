import React, { Component, useCallback, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import NavBar from "../../../components/navbar/navbar";
import SideBar from "../../../components/sidebar/sidebar";
import { Link } from "react-router-dom";
import "./topic-list.scss";
import moment from "moment";
import topicService from "../../../services/student/topic.service";

const topiccolumns = [
	{ field: "topicName", headerName: "Group name", width: 100 },
	{ field: "subject", headerName: "Subject name", width: 100 },
	{
		field: "groupleadername",
		headerName: "Group Leader Name",
		width: 130,
	},
	{
		field: "groupleaderId",
		headerName: "Group LeaderID",
		width: 130,
	},
	{
		field: "groupleaderEmail",
		headerName: "Group Leader Email",
		width: 130,
	},
	{
		field: "groupName",
		headerName: "Group Name",
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
	{
		field: "isAccept",
		headerName: "Status",
		width: 130,
		renderCell: (params) => {
			if (params.row.isAccept == false) {
				return <div className={`cellWithStatus ${params.row.isAccept}`}>pending</div>;
			} else {
				return <div className={`cellWithStatus ${params.row.isAccept}`}>accept</div>;
			}
		},
	},
];

const TopicList = () => {
	const [topics, setTopics] = React.useState([]);

	useEffect(() => {
		getAllTopics();
	}, [getAllTopics]);

	const getAllTopics = useCallback(() => {
		topicService.getAllTopics().then((response) => {
			setTopics(response.data);
			console.log(topics);
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
						<div className="viewButton" onClick={() => handleView(params.row.id)}>
							Evaluate
						</div>
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
	);
};

export default TopicList;
