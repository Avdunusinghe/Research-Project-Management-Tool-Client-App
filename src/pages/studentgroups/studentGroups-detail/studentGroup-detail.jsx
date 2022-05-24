import React, { Component, useState } from "react";

import "./studentGroup-detail.scss";
import SideBar from "./../../../components/sidebar/sidebar";
import NavBar from "./../../../components/navbar/navbar";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const StudentGroupDetail = () => {
	const [file, setFile] = useState("");
	return (
		<div className="new">
			<SideBar />
			<div className="newContainer">
				<NavBar />
				<div className="top">
					<h1>Create Student Group</h1>
				</div>
				<div className="bottom">
					<div className="left">
						<img src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg" alt=""></img>
					</div>
					<div className="right">
						<form>
							<div className="formInput">
								<label htmlFor="file">
									<CloudUploadIcon className="icon" />
								</label>
								<input
									type="file"
									id="file"
									onChange={(e) => setFile(e.target.files[0])}
									style={{ display: "none" }}
								></input>
							</div>
							<div className="formInput">
								<label>User Name</label>
								<input type="text" placeholder="Enter User Name"></input>
							</div>

							<div className="formInput">
								<label>User Name</label>
								<input type="text" placeholder="Enter User Name"></input>
							</div>

							<div className="formInput">
								<label>User Name</label>
								<input type="text" placeholder="Enter User Name"></input>
							</div>

							<div className="formInput">
								<label>User Name</label>
								<input type="text" placeholder="Enter User Name"></input>
							</div>

							<div className="formInput">
								<label>User Name</label>
								<input type="text" placeholder="Enter User Name"></input>
							</div>

							<button>Submit</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StudentGroupDetail;
