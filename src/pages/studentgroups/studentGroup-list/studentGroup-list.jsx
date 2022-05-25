import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import NavBar from "../../../components/navbar/navbar";
import SideBar from "../../../components/sidebar/sidebar";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import "./studentGroup-list.scss";

const columns = [
	{ field: "id", headerName: "ID", width: 70 },
	{ field: "groupName", headerName: "Group name", width: 130 },
	{ field: "subjectName", headerName: "Subject name", width: 130 },
	{
		field: "groupleaderID",
		headerName: "Group Leader ID",
		width: 130,
	},
	{
		field: "GroupLeaderName",
		headerName: "Group Leader Name",
		width: 160,
	},
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

const rows = [
	{ id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
	{ id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
	{ id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
	{ id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
	{ id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
	{ id: 6, lastName: "Melisandre", firstName: null, age: 150 },
	{ id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
	{ id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
	{ id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const StudentGroupList = () => {
	React.useEffect;
	return (
		<div className="list">
			<SideBar />
			<div className="listContainer">
				<NavBar />

				<div className="datatable">
					<div className="datatableTitle">Registered Student Groups</div>
					<DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} checkboxSelection />
				</div>
			</div>
		</div>
	);
};
export default StudentGroupList;
