import "./studentGroup-detail.scss";
import SideBar from "./../../../components/sidebar/sidebar";
import NavBar from "./../../../components/navbar/navbar";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { Component, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import studentService from "../../../services/student/studentGroup.service";
import requestService from "../../../services/student/request.service";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Form } from "react-bootstrap";

const StudentGroupDetail = () => {
	const [groupName, setGroupName] = useState("");
	const [subjectName, setSubjectName] = useState("");
	const [firstMemberName, setFirstMemberName] = useState("");
	const [firstMemberEmail, setFirstMemberEmail] = useState("");
	const [firstMemberRegNumber, setFirstMemberRegNumber] = useState("");
	const [secondMemberName, setSecondMemberName] = useState("");
	const [secondMemberEmail, setSecondMemberEmail] = useState("");
	const [secondMemberRegNumber, setSecondMemberRegNumber] = useState("");
	const [thirdMemberName, setThirdMemberName] = useState("");
	const [thirdMemberEmail, setThirdMemberEmail] = useState("");
	const [thirdMemberRegNumber, setThirdMemberRegNumber] = useState("");
	const [fourthMemberName, setFourthMemberName] = useState("");
	const [fourthMemberEmail, setFourthMemberEmail] = useState("");
	const [fourthMemberRegNumber, setFourthMemberRegNumber] = useState("");

	const [groupleaderName, setgroupleaderName] = useState("");
	const [groupleaderId, setgroupleaderId] = useState("");
	const [groupleaderEmail, setgroupleaderEmail] = useState("");
	const [group, setgroup] = useState("");
	const [description, setdescription] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();

		const studentGroupModel = {
			groupName: groupName,
			subjectName: subjectName,
			firstMemberName: firstMemberName,
			firstMemberEmail: firstMemberEmail,
			firstMemberRegNumber: firstMemberRegNumber,
			secondMemberName: secondMemberName,
			secondMemberEmail: secondMemberEmail,
			secondMemberRegNumber: secondMemberRegNumber,
			thirdMemberName: thirdMemberName,
			thirdMemberEmail: thirdMemberEmail,
			thirdMemberRegNumber: thirdMemberRegNumber,
			fourthMemberName: fourthMemberName,
			fourthMemberEmail: fourthMemberEmail,
			fourthMemberRegNumber: fourthMemberRegNumber,
		};

		studentService.saveStudentGroup(studentGroupModel).then((response) => {
			if (response) {
				console.log(response);
				toast(response.data.message);
				navigate("/home" + location.search);
			}
		});
	};

	let navigate = useNavigate();
	let location = useLocation();

	const handleModalSubmit = (event) => {
		event.preventDefault();

		const registerModel = {
			groupleaderName: groupleaderName,
			groupleaderId: groupleaderId,
			groupleaderEmail: groupleaderEmail,
			group: group,
			description: description,
		};

		requestService.requestSupervisor(registerModel).then((response) => {
			if (response) {
				console.log(response);
				toast(response.data.message);
				navigate("/studentGroups" + location.search);
			}
		});
	};
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<div className="new">
			<SideBar />
			<div className="newContainer">
				<NavBar />
				<div className="top">
					<h1>Create Student Group</h1>
				</div>
				<div className="top">
					<h2>Can only have maximum 4 group members</h2>
				</div>
				<div className="bottom">
					<div className="right">
						<form className="needs-validation" onSubmit={handleSubmit} noValidate>
							<div className="formInput">
								<label>Group Name</label>
								<input
									type="text"
									placeholder="Enter Group Name"
									required
									id="groupName"
									name="groupName"
									value={groupName}
									onChange={(e) => setGroupName(e.target.value)}
								></input>
							</div>

							<div className="formInput">
								<label>Subject Name</label>
								<input
									type="text"
									placeholder="Select Group Name"
									required
									id="subjectName"
									name="subjectName"
									value={subjectName}
									onChange={(e) => setSubjectName(e.target.value)}
								></input>
							</div>

							<div className="formInput">
								<label>Group Leader Name</label>
								<input
									type="text"
									placeholder="Enter Group Leader Name"
									required
									id="firstMemberName"
									name="firstMemberName"
									value={firstMemberName}
									onChange={(e) => setFirstMemberName(e.target.value)}
								></input>
							</div>

							<div className="formInput">
								<label>Group Leader Email</label>
								<input
									type="text"
									placeholder="Enter Group Leader Email"
									required
									id="firstMemberEmail"
									name="firstMemberEmail"
									value={firstMemberEmail}
									onChange={(e) => setFirstMemberEmail(e.target.value)}
								></input>
							</div>

							<div className="formInput">
								<label>Group Leader Reg No</label>
								<input
									type="text"
									placeholder="Enter Leader Reg No"
									required
									id="firstMemberRegNumber"
									name="firstMemberRegNumber"
									value={firstMemberRegNumber}
									onChange={(e) => setFirstMemberRegNumber(e.target.value)}
								></input>
							</div>
							<div className="formInput">
								<label>First Member Name</label>
								<input
									type="text"
									placeholder="Enter first Member Name"
									required
									id="secondMemberName"
									name="secondMemberName"
									value={secondMemberName}
									onChange={(e) => setSecondMemberName(e.target.value)}
								></input>
							</div>
							<div className="formInput">
								<label>First Member Email</label>
								<input
									type="text"
									placeholder="Enter first Member Email"
									required
									id="secondMemberEmail"
									name="secondMemberEmail"
									value={secondMemberEmail}
									onChange={(e) => setSecondMemberEmail(e.target.value)}
								></input>
							</div>
							<div className="formInput">
								<label>First Member Reg No</label>
								<input
									type="text"
									placeholder="Enter first Member Reg No"
									required
									id="secondMemberRegNumber"
									name="secondMemberRegNumber"
									value={secondMemberRegNumber}
									onChange={(e) => setSecondMemberRegNumber(e.target.value)}
								></input>
							</div>
							<div className="formInput">
								<label>Second Member Name</label>
								<input
									type="text"
									placeholder="Enter second Member Name"
									required
									id="thirdMemberName"
									name="thirdMemberName"
									value={thirdMemberName}
									onChange={(e) => setThirdMemberName(e.target.value)}
								></input>
							</div>
							<div className="formInput">
								<label>Second Member Email</label>
								<input
									type="text"
									placeholder="Enter second Member Email"
									required
									id="thirdMemberEmail"
									name="thirdMemberEmail"
									value={thirdMemberEmail}
									onChange={(e) => setThirdMemberEmail(e.target.value)}
								></input>
							</div>
							<div className="formInput">
								<label>Second Member Reg No</label>
								<input
									type="text"
									placeholder="Enter second Member Reg No"
									required
									id="thirdMemberRegNumber"
									name="thirdMemberRegNumber"
									value={thirdMemberRegNumber}
									onChange={(e) => setThirdMemberRegNumber(e.target.value)}
								></input>
							</div>

							<div className="formInput">
								<label>Third Member Name</label>
								<input
									type="text"
									placeholder="Enter third Member Name"
									required
									id="fourthMemberName"
									name="fourthMemberName"
									value={fourthMemberName}
									onChange={(e) => setFourthMemberName(e.target.value)}
								></input>
							</div>
							<div className="formInput">
								<label>Third Member Email</label>
								<input
									type="text"
									placeholder="Enter third Member Email"
									required
									id="fourthMemberEmail"
									name="fourthMemberEmail"
									value={fourthMemberEmail}
									onChange={(e) => setFourthMemberEmail(e.target.value)}
								></input>
							</div>
							<div className="formInput">
								<label>Third Member Reg No</label>
								<input
									type="text"
									placeholder="Enter Third Member Reg No"
									required
									id="fourthMemberRegNumber"
									name="fourthMemberRegNumber"
									value={fourthMemberRegNumber}
									onChange={(e) => setFourthMemberRegNumber(e.target.value)}
								></input>
							</div>

							<div className="formInput">
								<label> Need Suppervisor</label> <br />
								<label>
									<input type="radio" name="needSuppervisor" id="needSuppervisor" onClick={handleShow}></input>
									YES
								</label>
								<label style={{ marginLeft: "15px" }}>
									<input type="radio" name="needSuppervisor" id="needSuppervisor" value={"no"}></input>
									NO (ckecked key word eka npmdapan)
								</label>
							</div>

							<div className="formInput">
								<button onClick={handleSubmit}>Submit</button>
							</div>
						</form>

						<Modal show={show} onHide={handleClose}>
							<Modal.Header closeButton>
								<Modal.Title> REQUEST SUPERVISOR/CO-SUPERVISOR</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<Form onSubmit={handleModalSubmit}>
									<Form.Group className="mb-3">
										<Form.Label> Group Leader ID:</Form.Label>
										<Form.Control
											type="text"
											name="groupleaderId"
											id="groupleaderId"
											placeholder="Group Leader Registration Number"
											value={groupleaderId}
											onChange={(e) => setgroupleaderId(e.target.value)}
											autoComplete="groupleaderId"
											autoFocus
										/>
									</Form.Group>
									<Form.Group className="mb-3">
										<Form.Label>Group Leader Name:</Form.Label>
										<Form.Control
											type="text"
											name="groupleaderName"
											id="groupleaderName"
											placeholder="Group Leader Name"
											value={groupleaderName}
											onChange={(e) => setgroupleaderName(e.target.value)}
											autoComplete="groupleaderName"
											autoFocus
										/>
									</Form.Group>
									<Form.Group className="mb-3">
										<Form.Label>Group Leader Email:</Form.Label>
										<Form.Control
											type="email"
											name="groupleaderEmail"
											id="groupleaderEmail"
											placeholder="Group Leader Email"
											value={groupleaderEmail}
											onChange={(e) => setgroupleaderEmail(e.target.value)}
											autoComplete="groupleaderEmail"
											autoFocus
										/>
									</Form.Group>
									<Form.Group className="mb-3">
										<Form.Label>Group Name:</Form.Label>
										<Form.Control
											type="text"
											name="group"
											id="group"
											placeholder="Group Name"
											value={group}
											onChange={(e) => setgroup(e.target.value)}
											autoComplete="groupId"
											autoFocus
										/>
									</Form.Group>
									<Form.Group className="mb-3">
										<Form.Label>Description:</Form.Label> <br />
										<textarea
											rows="5"
											value={description}
											onChange={(e) => setdescription(e.target.value)}
											autoComplete="description"
											autoFocus
										>
											Mention whether you need co-supervisor or supervisor in text area.
										</textarea>
									</Form.Group>
								</Form>
							</Modal.Body>
							<Modal.Footer>
								<Button variant="success">REQUEST</Button>
							</Modal.Footer>
						</Modal>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StudentGroupDetail;
