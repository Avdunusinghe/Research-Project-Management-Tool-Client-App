import "./studentGroup-detail.scss";
import SideBar from "./../../../components/sidebar/sidebar";
import NavBar from "./../../../components/navbar/navbar";
import React, { Component, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import studentService from "../../../services/student/studentGroup.service";
import requestService from "../../../services/student/request.service";
import { ToastContainer, toast } from "react-toastify";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Container from "@mui/material/Container";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Modal, Form } from "react-bootstrap";

const theme = createTheme();
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

	let navigate = useNavigate();
	let location = useLocation();

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
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [groupleaderName, setgroupleaderName] = useState("");
	const [groupleaderId, setgroupleaderId] = useState("");
	const [groupleaderEmail, setgroupleaderEmail] = useState("");
	const [group, setgroup] = useState("");
	const [description, setdescription] = useState("");

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
						<ThemeProvider theme={theme}>
							<Container component="main" maxWidth="xl">
								<CssBaseline />
								<Box
									sx={{
										marginTop: 0,
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
									}}
								>
									<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
										<Table>
											<tr>
												<td className="textfield">
													<Grid container spacing={0}>
														<Grid item xs={20}>
															<TextField
																autoComplete="given-name"
																name="groupName"
																required
																value={groupName}
																onChange={(event) => setGroupName(event.target.value)}
																fullWidth
																id="groupName"
																label="Group Name"
																autoFocus
															/>
														</Grid>
													</Grid>
												</td>

												<td className="textfield">
													<Grid container spacing={0}>
														<Grid item xs={20}>
															<TextField
																autoComplete="given-name"
																name="subjectName"
																required
																value={subjectName}
																onChange={(event) => setSubjectName(event.target.value)}
																fullWidth
																id="subjectName"
																label="Subject Name"
																autoFocus
															/>
														</Grid>
													</Grid>
												</td>
											</tr>
										</Table>
										<Table>
											<tr>
												<td>
													<Grid container spacing={2}>
														<Grid item xs={12}>
															<TextField
																autoComplete="given-name"
																name="firstMemberName"
																required
																value={firstMemberName}
																onChange={(event) => setFirstMemberName(event.target.value)}
																fullWidth
																id="firstMemberName"
																label="Group Leader Name"
																autoFocus
															/>
														</Grid>
													</Grid>
												</td>
												<td>
													<Grid container spacing={2}>
														<Grid item xs={12}>
															<TextField
																autoComplete="given-name"
																name="firstMemberEmail"
																required
																value={firstMemberEmail}
																onChange={(event) => setFirstMemberEmail(event.target.value)}
																fullWidth
																id="firstMemberEmail"
																label="Group Member Email"
																autoFocus
															/>
														</Grid>
													</Grid>
												</td>
												<td>
													<Grid container spacing={2}>
														<Grid item xs={12}>
															<TextField
																autoComplete="given-name"
																name="firstMemberRegNumber"
																required
																value={firstMemberRegNumber}
																onChange={(event) => setFirstMemberRegNumber(event.target.value)}
																fullWidth
																id="firstMemberRegNumber"
																label="Group Leader ID"
																autoFocus
															/>
														</Grid>
													</Grid>
												</td>
											</tr>
											<br></br>
											<tr>
												<td>
													<Grid container spacing={2}>
														<Grid item xs={12}>
															<TextField
																autoComplete="given-name"
																name="secondMemberName"
																required
																value={secondMemberName}
																onChange={(event) => setSecondMemberName(event.target.value)}
																fullWidth
																id="secondMemberName"
																label="First Member Name"
																autoFocus
															/>
														</Grid>
													</Grid>
												</td>
												<td>
													<Grid container spacing={2}>
														<Grid item xs={12}>
															<TextField
																autoComplete="given-name"
																name="secondMemberEmail"
																required
																value={secondMemberEmail}
																onChange={(event) => setSecondMemberEmail(event.target.value)}
																fullWidth
																id="secondMemberEmail"
																label=" First Member Email"
																autoFocus
															/>
														</Grid>
													</Grid>
												</td>
												<td>
													<Grid container spacing={2}>
														<Grid item xs={12}>
															<TextField
																autoComplete="given-name"
																name="secondMemberRegNumber"
																required
																value={secondMemberRegNumber}
																onChange={(event) => setSecondMemberRegNumber(event.target.value)}
																fullWidth
																id="secondMemberRegNumber"
																label="First Member ID"
																autoFocus
															/>
														</Grid>
													</Grid>
												</td>
											</tr>
											<br />
											<tr>
												<td>
													<Grid container spacing={2}>
														<Grid item xs={12}>
															<TextField
																autoComplete="given-name"
																name="thirdMemberName"
																required
																value={thirdMemberName}
																onChange={(event) => setThirdMemberName(event.target.value)}
																fullWidth
																id="thirdMemberName"
																label="Second Member Name"
																autoFocus
															/>
														</Grid>
													</Grid>
												</td>
												<td>
													<Grid container spacing={2}>
														<Grid item xs={12}>
															<TextField
																autoComplete="given-name"
																name="thirdMemberEmail"
																required
																value={thirdMemberEmail}
																onChange={(event) => setThirdMemberEmail(event.target.value)}
																fullWidth
																id="thirdMemberEmail"
																label="Second Member Email"
																autoFocus
															/>
														</Grid>
													</Grid>
												</td>
												<td>
													<Grid container spacing={2}>
														<Grid item xs={12}>
															<TextField
																autoComplete="given-name"
																name="thirdMemberRegNumber"
																required
																value={thirdMemberRegNumber}
																onChange={(event) => setThirdMemberRegNumber(event.target.value)}
																fullWidth
																id="thirdMemberRegNumber"
																label="Second Member Reg ID"
																autoFocus
															/>
														</Grid>
													</Grid>
												</td>
											</tr>
											<br />
											<tr>
												<td>
													<Grid container spacing={2}>
														<Grid item xs={12}>
															<TextField
																autoComplete="given-name"
																name="fourthMemberName"
																required
																value={fourthMemberName}
																onChange={(event) => setFourthMemberName(event.target.value)}
																fullWidth
																id="fourthMemberName"
																label="Third Member Name"
																autoFocus
															/>
														</Grid>
													</Grid>
												</td>
												<td>
													<Grid container spacing={2}>
														<Grid item xs={12}>
															<TextField
																autoComplete="given-name"
																name="fourthMemberEmail"
																required
																value={fourthMemberEmail}
																onChange={(event) => setFourthMemberEmail(event.target.value)}
																fullWidth
																id="fourthMemberEmail"
																label="Third Member Email"
																autoFocus
															/>
														</Grid>
													</Grid>
												</td>
												<td>
													<Grid container spacing={2}>
														<Grid item xs={12}>
															<TextField
																autoComplete="given-name"
																name="fourthMemberRegNumber"
																required
																value={fourthMemberRegNumber}
																onChange={(event) => setFourthMemberRegNumber(event.target.value)}
																fullWidth
																id="fourthMemberRegNumber"
																label="Third Member Reg ID"
																autoFocus
															/>
														</Grid>
													</Grid>
												</td>
											</tr>
										</Table>
										<Grid item xs={12}>
											<FormControl>
												<FormLabel id="demo-row-radio-buttons-group-label">Need a Supervisor</FormLabel>
												<RadioGroup
													row
													aria-labelledby="demo-row-radio-buttons-group-label"
													name="controlled-radio-buttons-group"
												>
													<FormControlLabel value="Need" control={<Radio />} label="Yes" onClick={handleShow} />
													<FormControlLabel value="NotNeed" control={<Radio />} label="No" />
												</RadioGroup>
											</FormControl>
										</Grid>
										<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled>
											Submit
										</Button>
									</Box>
								</Box>
							</Container>
						</ThemeProvider>
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
											onChange={(event) => setgroupleaderId(event.target.value)}
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
											onChange={(event) => setgroupleaderName(event.target.value)}
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
											onChange={(event) => setgroupleaderEmail(event.target.value)}
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
											onChange={(event) => setgroup(event.target.value)}
											autoComplete="group"
											autoFocus
										/>
									</Form.Group>
									<Form.Group className="mb-3">
										<Form.Label>
											Description: <br></br>
											Mention whether you need co-supervisor or supervisor in text area.
										</Form.Label>{" "}
										<br />
										<textArea
											rows="5"
											cols="69"
											value={description}
											onChange={(even) => setdescription(e.target.value)}
											autoComplete="description"
											autoFocus
										></textArea>
									</Form.Group>
								</Form>
							</Modal.Body>
							<Modal.Footer>
								<Button variant="contained" color="success">
									REQUEST
								</Button>
							</Modal.Footer>
						</Modal>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StudentGroupDetail;
