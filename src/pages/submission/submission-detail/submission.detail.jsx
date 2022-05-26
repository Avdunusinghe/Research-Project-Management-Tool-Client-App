import React, { Component } from "react";
import SideBar from "./../../../components/sidebar/sidebar";
import NavBar from "./../../../components/navbar/navbar";

const SubmissionDetails = () => {
	return (
		<div className="new">
			<SideBar />
			<div className="newContainer">
				<NavBar />
				<div className="top">
					<h1>Add New Submission</h1>
				</div>
				<div className="bottom">
					<div className="left"></div>
				</div>
			</div>
		</div>
	);
};

export default SubmissionDetails;
