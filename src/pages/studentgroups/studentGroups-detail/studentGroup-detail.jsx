import "./studentGroup-detail.scss";
import SideBar from "./../../../components/sidebar/sidebar";
import NavBar from "./../../../components/navbar/navbar";
import React, { Component, useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import studentService from "../../../services/student/studentGroup.service";
import requestService from "../../../services/student/request.service";
import { Toast } from "primereact/toast";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Modal, Form } from "react-bootstrap";
import { padding } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const theme = createTheme();
const StudentGroupDetail = () => {
	const [groupName, setGroupName] = useState("");
	const [firstmemberName, setFirstMemberName] = useState("");
	const [firstmemberEmail, setFirstMemberEmail] = useState("");
	const [firstmemberRegNumber, setFirstMemberRegNumber] = useState("");
	const [researchArea, setResearchArea] = useState("");
	const [description, setdescription] = useState("");
	const [status, setStatus] = useState(null);

	let navigate = useNavigate();
	let location = useLocation();

	const types = [
		{ name: "SE", code: "SE" },
		{ name: "AF", code: "AF" },
		{ name: "ESD", code: "ESD" },
		{ name: "SA", code: "SA" },
		{ name: "DS", code: "DS" },
		{ name: "NDM", code: "NDM" },
		{ name: "PAF", code: "PAF" },
		{ name: "ITP", code: "ITP" },
	];

	const [formData, setFormData] = useState({});
	const [subjectName, setSubjectName] = useState({});
	const [file, setFile] = useState("");
	const toast = useRef(null);

	useEffect(() => {
		setSubjectName(types);
	}, []);

	const formik = useFormik({
		initialValues: {
			groupName: "",
			subjectName: null,
			firstmemberName: "",
			firstmemberEmail: "",
			firstmemberRegNumber: "",
			secondmemberName: "",
			secondmemberEmail: "",
			secondmemberRegNumber: "",
			thirdmemberName: "",
			thirdmemberEmail: "",
			thirdmemberRegNumber: "",
			fourthmemberName: "",
			fourthmemberEmail: "",
			fourthmemberRegNumber: "",
		},
		validate: (data) => {
			let errors = {};

			if (!data.groupName) {
				errors.groupName = "Group Name is required.";
			}
			if (!data.firstmemberName) {
				errors.firstmemberName = "Group Leader Name is required.";
			}
			if (!data.firstmemberEmail) {
				errors.firstmemberEmail = "Group Leader Email is required.";
			}
			if (!data.firstmemberRegNumber) {
				errors.firstmemberRegNumber = "Group Leader ID is required.";
			}
			if (!data.secondmemberName) {
				errors.secondmemberName = "First Member Name is required.";
			}
			if (!data.secondmemberEmail) {
				errors.secondmemberEmail = "First Member Email is required.";
			}
			if (!data.secondmemberRegNumber) {
				errors.secondmemberRegNumber = "First Member ID is required.";
			}
			if (!data.thirdmemberName) {
				errors.thirdmemberName = "Second Member Name is required.";
			}
			if (!data.thirdmemberEmail) {
				errors.thirdmemberEmail = "second Member Email is required.";
			}
			if (!data.thirdmemberRegNumber) {
				errors.thirdmemberRegNumber = "Second Member ID is required.";
			}
			if (!data.fourthmemberName) {
				errors.fourthmemberName = "Third Member Name is required.";
			}
			if (!data.fourthmemberEmail) {
				errors.fourthmemberEmail = "Third Member Email is required.";
			}
			if (!data.fourthmemberRegNumber) {
				errors.fourthmemberRegNumber = "Third Member ID is required.";
			}

			return errors;
		},

		onSubmit: (data) => {
			setFormData(data);

			const studentGroupModel = {
				groupName: data.groupName,
				subjectName: data.subjectName.name,
				firstmemberName: data.firstmemberName,
				firstmemberEmail: data.firstmemberEmail,
				firstmemberRegNumber: data.firstmemberRegNumber,
				secondmemberName: data.secondmemberName,
				secondmemberEmail: data.secondmemberEmail,
				secondmemberRegNumber: data.secondmemberRegNumber,
				thirdmemberName: data.thirdmemberName,
				thirdmemberEmail: data.thirdmemberEmail,
				thirdmemberRegNumber: data.thirdmemberRegNumber,
				fourthmemberName: data.fourthmemberName,
				fourthmemberEmail: data.fourthmemberEmail,
				fourthmemberRegNumber: data.fourthmemberRegNumber,
			};

			studentService.saveStudentGroup(studentGroupModel).then((response) => {
				if (response.data.isSuccess === true) {
					toast.current.show({ severity: "success", summary: "Success", detail: "Student Group Saved Successfully" });
				} else {
					toast.current.show({
						severity: "success",
						summary: "Success",
						detail: "Student Group Not Saved Successfully",
					});
				}
			});

			formik.resetForm();

			navigate("/home" + location.search);
		},
	});

	const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
	const getFormErrorMessage = (name) => {
		return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
	};

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleModalSubmit = (event) => {
		event.preventDefault();

		const registerModel = {
			groupName: groupName,
			firstmemberName: firstmemberName,
			firstmemberEmail: firstmemberEmail,
			firstmemberRegNumber: firstmemberRegNumber,
			researchArea: researchArea,
			description: description,
			isAccept: false,
		};

		requestService.requestSupervisor(registerModel).then((response) => {
			handleClose();
			toast.current.show({ severity: "success", summary: "Success", detail: "Request send" });
		});
	};

	return (
		<div className="new">
			<SideBar />
			<div className="newContainer">
				<NavBar />
				<div className="top colorheading">
					<h1>CREATE STUDENT GROUPS</h1>
				</div>
				<div className="top">
					<h5>CAN ONLY HAVE 4 MEMBERS FOR THE GROUP</h5>
				</div>
				<div className="bottom">
					<div>
						<form onSubmit={formik.handleSubmit} className="p-fluid form-config">
							<div className="formgrid grid">
								<div className="field col">
									<span className="p-float-label">
										<InputText
											id="groupName"
											name="groupName"
											value={formik.values.groupName}
											onChange={formik.handleChange}
											autoFocus
											className={classNames({ "p-invalid": isFormFieldValid("groupName") })}
										/>
										<label htmlFor="groupName" className={classNames({ "p-error": isFormFieldValid("groupName") })}>
											Group Name
										</label>
									</span>
									{getFormErrorMessage("groupName")}
								</div>
								<div className="field col">
									<span className="p-float-label">
										<Dropdown
											id="subjectName"
											name="subjectName"
											value={formik.values.subjectName}
											onChange={formik.handleChange}
											options={subjectName}
											optionLabel="name"
										/>
										<label htmlFor="subjectName">Subject</label>
									</span>
								</div>
							</div>
							<br />
							<div className="formgrid grid">
								<div className="field col">
									<span className="p-float-label">
										<InputText
											id="firstmemberName"
											name="firstmemberName"
											value={formik.values.firstmemberName}
											onChange={formik.handleChange}
											className={classNames({ "p-invalid": isFormFieldValid("firstmemberName") })}
										/>
										<label
											htmlFor="firstmemberName"
											className={classNames({ "p-error": isFormFieldValid("firstmemberName") })}
										>
											Group Leader Name
										</label>
									</span>
									{getFormErrorMessage("firstmemberName")}
								</div>
								<div className="field col">
									<span className="p-float-label">
										<InputText
											id="firstmemberEmail"
											name="firstmemberEmail"
											value={formik.values.firstmemberEmail}
											onChange={formik.handleChange}
											className={classNames({ "p-invalid": isFormFieldValid("firstmemberEmail") })}
										/>
										<label
											htmlFor="firstMemberEmail"
											className={classNames({ "p-error": isFormFieldValid("firstmemberEmail") })}
										>
											Group Leader Email
										</label>
									</span>
									{getFormErrorMessage("firstmemberEmail")}
								</div>
								<div className="field col">
									<span className="p-float-label">
										<InputText
											id="firstmemberRegNumber"
											name="firstmemberRegNumber"
											value={formik.values.firstmemberRegNumber}
											onChange={formik.handleChange}
											className={classNames({ "p-invalid": isFormFieldValid("firstmemberRegNumber") })}
										/>
										<label
											htmlFor="firstmemberRegNumber"
											className={classNames({ "p-error": isFormFieldValid("firstmemberRegNumber") })}
										>
											Group Leader ID
										</label>
									</span>
									{getFormErrorMessage("firstmemberRegNumber")}
								</div>
							</div>
							<br />
							<div className="formgrid grid">
								<div className="field col">
									<span className="p-float-label">
										<InputText
											id="secondmemberName"
											name="secondmemberName"
											value={formik.values.secondmemberName}
											onChange={formik.handleChange}
											className={classNames({ "p-invalid": isFormFieldValid("secondmemberName") })}
										/>
										<label
											htmlFor="secondmemberName"
											className={classNames({ "p-error": isFormFieldValid("secondmemberName") })}
										>
											First Member Name
										</label>
									</span>
									{getFormErrorMessage("secondmemberName")}
								</div>
								<div className="field col">
									<span className="p-float-label">
										<InputText
											id="secondmemberEmail"
											name="secondmemberEmail"
											value={formik.values.secondmemberEmail}
											onChange={formik.handleChange}
											className={classNames({ "p-invalid": isFormFieldValid("secondmemberEmail") })}
										/>
										<label
											htmlFor="secondMemberEmail"
											className={classNames({ "p-error": isFormFieldValid("secondmemberEmail") })}
										>
											First Member Email
										</label>
									</span>
									{getFormErrorMessage("secondmemberEmail")}
								</div>
								<div className="field col">
									<span className="p-float-label">
										<InputText
											id="secondmemberRegNumber"
											name="secondmemberRegNumber"
											value={formik.values.secondmemberRegNumber}
											onChange={formik.handleChange}
											className={classNames({ "p-invalid": isFormFieldValid("secondmemberRegNumbere") })}
										/>
										<label
											htmlFor="secondmemberRegNumber"
											className={classNames({ "p-error": isFormFieldValid("secondmemberRegNumber") })}
										>
											First Member ID
										</label>
									</span>
									{getFormErrorMessage("secondmemberRegNumber")}
								</div>
							</div>
							<br />
							<div className="formgrid grid">
								<div className="field col">
									<span className="p-float-label">
										<InputText
											id="thirdmemberName"
											name="thirdmemberName"
											value={formik.values.thirdmemberName}
											onChange={formik.handleChange}
											className={classNames({ "p-invalid": isFormFieldValid("thirdmemberName") })}
										/>
										<label
											htmlFor="thirdmemberName"
											className={classNames({ "p-error": isFormFieldValid("thirdmemberName") })}
										>
											Second Member Name
										</label>
									</span>
									{getFormErrorMessage("thirdmemberName")}
								</div>
								<div className="field col">
									<span className="p-float-label">
										<InputText
											id="thirdmemberEmail"
											name="thirdmemberEmail"
											value={formik.values.thirdmemberEmail}
											onChange={formik.handleChange}
											className={classNames({ "p-invalid": isFormFieldValid("thirdmemberEmail") })}
										/>
										<label
											htmlFor="thirdmemberEmail"
											className={classNames({ "p-error": isFormFieldValid("thirdmemberEmail") })}
										>
											Second Member Email
										</label>
									</span>
									{getFormErrorMessage("thirdmemberEmail")}
								</div>
								<div className="field col">
									<span className="p-float-label">
										<InputText
											id="thirdmemberRegNumber"
											name="thirdmemberRegNumber"
											value={formik.values.thirdmemberRegNumber}
											onChange={formik.handleChange}
											className={classNames({ "p-invalid": isFormFieldValid("thirdmemberRegNumber") })}
										/>
										<label
											htmlFor="thirdmemberRegNumber"
											className={classNames({ "p-error": isFormFieldValid("thirdmemberRegNumber") })}
										>
											Second Member ID
										</label>
									</span>
									{getFormErrorMessage("thirdmemberRegNumber")}
								</div>
							</div>
							<br />
							<div className="formgrid grid">
								<div className="field col">
									<span className="p-float-label">
										<InputText
											id="fourthmemberName"
											name="fourthmemberName"
											value={formik.values.fourthmemberName}
											onChange={formik.handleChange}
											className={classNames({ "p-invalid": isFormFieldValid("fourthmemberName") })}
										/>
										<label
											htmlFor="fourthmemberName"
											className={classNames({ "p-error": isFormFieldValid("fourthmemberName") })}
										>
											Third Member Name
										</label>
									</span>
									{getFormErrorMessage("fourthmemberName")}
								</div>
								<div className="field col">
									<span className="p-float-label">
										<InputText
											id="fourthmemberEmail"
											name="fourthmemberEmail"
											value={formik.values.fourthmemberEmail}
											onChange={formik.handleChange}
											className={classNames({ "p-invalid": isFormFieldValid("fourthmemberEmail") })}
										/>
										<label
											htmlFor="fourthmemberEmail"
											className={classNames({ "p-error": isFormFieldValid("fourthmemberEmail") })}
										>
											Third Member Email
										</label>
									</span>
									{getFormErrorMessage("fourthmemberEmail")}
								</div>
								<div className="field col">
									<span className="p-float-label">
										<InputText
											id="fourthmemberRegNumber"
											name="fourthmemberRegNumber"
											value={formik.values.fourthmemberRegNumber}
											onChange={formik.handleChange}
											className={classNames({ "p-invalid": isFormFieldValid("fourthmemberRegNumber") })}
										/>
										<label
											htmlFor="fourthmemberRegNumber"
											className={classNames({ "p-error": isFormFieldValid("fourthmemberRegNumber") })}
										>
											Third Member ID
										</label>
									</span>
									{getFormErrorMessage("fourthmemberRegNumber")}
								</div>
							</div>
							<br />
							<div className="formgrid grid">
								<div className="field col"></div>
								<div className="field col rane">
									<FormControl>
										<FormLabel id="demo-row-radio-buttons-group-label">Need a Supervisor/ Co-Supervisor</FormLabel>
										<br />
										<FormLabel id="demo-row-radio-buttons-group-label" style={{ color: "red" }}>
											(cannot request a supervisor/co-supervisor later)
										</FormLabel>
										<RadioGroup
											row
											aria-labelledby="demo-row-radio-buttons-group-label"
											name="controlled-radio-buttons-group"
											className="rane1"
										>
											<FormControlLabel
												value="Need"
												name="radioname"
												control={<Radio />}
												label="Yes"
												onClick={handleShow}
											/>
											<FormControlLabel value="NotNeed" name="radioname" control={<Radio />} label="No" />
										</RadioGroup>
									</FormControl>
								</div>
								<div className="field col"></div>
							</div>

							<div className="formgrid grid">
								<div className="field col"></div>
								<div className="field col">
									<Button type="submit" label="Submit" className="mt-2" />
								</div>
								<div className="field col"></div>
							</div>
						</form>
					</div>
					<Modal show={show} onHide={handleClose}>
						<Modal.Header closeButton>
							<Modal.Title> REQUEST SUPERVISOR/CO-SUPERVISOR</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Form onSubmit={handleClose}>
								<Form.Group className="mb-3">
									<Form.Label> Group Leader ID:</Form.Label>
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
								</Form.Group>
								<Form.Group className="mb-3">
									<TextField
										autoComplete="given-name"
										name="firstmemberName"
										required
										value={firstmemberName}
										onChange={(event) => setFirstMemberName(event.target.value)}
										fullWidth
										id="firstmemberName"
										label="Group Leader Name"
									/>
								</Form.Group>
								<Form.Group className="mb-3">
									<TextField
										autoComplete="given-name"
										name="firstmemberEmail"
										required
										value={firstmemberEmail}
										onChange={(event) => setFirstMemberEmail(event.target.value)}
										fullWidth
										id="firstmemberEmail"
										label="Group Member Email"
									/>
								</Form.Group>
								<Form.Group className="mb-3">
									<TextField
										autoComplete="given-name"
										name="firstmemberRegNumber"
										required
										value={firstmemberRegNumber}
										onChange={(event) => setFirstMemberRegNumber(event.target.value)}
										fullWidth
										id="firstmemberRegNumber"
										label="Group Leader ID"
									/>
								</Form.Group>
								<Form.Group className="mb-3">
									<TextField
										autoComplete="given-name"
										name="researchArea"
										required
										value={researchArea}
										onChange={(event) => setResearchArea(event.target.value)}
										fullWidth
										id="researchArea"
										label="Research Area"
									/>
								</Form.Group>
								<Form.Group className="mb-3">
									<TextField
										autoComplete="given-name"
										name="description"
										required
										multiline={true}
										rows={6}
										value={description}
										onChange={(event) => setdescription(event.target.value)}
										fullWidth
										label="
										Mention whether you need co-supervisor or supervisor here."
										id="description"
									/>
								</Form.Group>
							</Form>
						</Modal.Body>
						<Modal.Footer>
							<Button onClick={handleModalSubmit} variant="contained" color="success">
								REQUEST
							</Button>
						</Modal.Footer>
					</Modal>
				</div>
				<Toast ref={toast}></Toast>
			</div>
		</div>
	);
};

export default StudentGroupDetail;
