import React, { Component, useCallback, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import NavBar from "../../../components/navbar/navbar";
import SideBar from "../../../components/sidebar/sidebar";
import { Link } from "react-router-dom";
import "./studentGroup-list.scss";
import moment from "moment";
import studentService from "../../../services/student/studentGroup.service";

const groupcolumns = [
	{ field: "groupName", headerName: "Group name", width: 160 },
	{ field: "subjectName", headerName: "Subject name", width: 160 },
	{
		field: "firstMemberName",
		headerName: "Group Leader Name",
		width: 180,
	},
	{
		field: "firstMemberRegNumber",
		headerName: "Group LeaderID",
		width: 160,
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
];

const StudentGroupList = () => {
	const [studentgroups, setStudentgroups] = React.useState([]);

	useEffect(() => {
		getAllStudentsGroups();
	}, [getAllStudentsGroups]);

	const getAllStudentsGroups = useCallback(() => {
		studentService.getAllStudentsGroups().then((response) => {
			setStudentgroups(response.data);
			//console.log(response);
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
						<Link to="/studentGroups" style={{ textDecoration: "none" }}>
							<div className="viewButton" onClick={() => handleView(params.row.id)}>
								View
							</div>
						</Link>
						<div className="deleteButton" onClick={() => handleDelete(params.row.id)}>
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
					<div className="datatableTitle">Registered Student Groups</div>
					<DataGrid
						rows={studentgroups}
						columns={groupcolumns.concat(actionColumn)}
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
export default StudentGroupList;
