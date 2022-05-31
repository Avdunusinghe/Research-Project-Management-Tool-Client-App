import { Card } from "primereact/card";
import { Button } from "primereact/button";
import SideBar from "./../../../components/sidebar/sidebar";
import NavBar from "./../../../components/navbar/navbar";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import { useFormik } from "formik";
import { FileUpload } from "primereact/fileupload";
import "./assignment.detail.scss";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import submissionService from "../../../services/submission/submisstion.service";
import ReactDOM from "react-dom";
import { storage } from "../../../../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { fontStyle, style } from "@mui/system";
import { CardHeader, getScopedCssBaselineUtilityClass } from "@mui/material";
import StudentSubmissionService from "../../../services/studentsubmission/studentsubmission.service";
import { Modal, Form } from "react-bootstrap";

const AssignmentDetail = () => {
	const [submisstions, setSubmisstions] = React.useState([]);
	const [activeIndex, setActiveIndex] = useState(null);
	const toast = useRef(null);
	const fileDownloadRef = useRef();
	const [file, setFile] = useState("");
	const [studentAnswerfile, setStudentAnswerfile] = useState("");

	const downloadTask = (url) => {
		console.log(url);
		const storage = getStorage();
		const downloads = ref(storage, url);

		getDownloadURL(downloads)
			.then((url) => {
				//<a href="file:///C:/Users/Dell/Downloads"></a>;

				const xhr = new XMLHttpRequest();
				xhr.responseType = "file";
				xhr.onload = (event) => {
					const file = xhr.response;
				};
				xhr.open("GET", url);
				xhr.send();
			})
			.catch((error) => {
				switch (error.code) {
					case "storage/object-not-found":
						console.log("storage/object-not-found");
						break;
					case "storage/unauthorized":
						console.log("storage/unauthorized");
						break;
					case "storage/canceled":
						console.log("storage/canceled");
						break;

					case "storage/unknown":
						console.log("storage/unknown");
						break;
				}
			});
	};

	useEffect(() => {
		getAllSubmissions();
	}, [getAllSubmissions]);

	const getAllSubmissions = useCallback(() => {
		submissionService
			.getAllUnHideSubmissions()
			.then((response) => {
				setSubmisstions(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const onClick = (itemIndex) => {
		let _activeIndex = activeIndex ? [...activeIndex] : [];

		if (_activeIndex.length === 0) {
			_activeIndex.push(itemIndex);
		} else {
			const index = _activeIndex.indexOf(itemIndex);
			if (index === -1) {
				_activeIndex.push(itemIndex);
			} else {
				_activeIndex.splice(index, 1);
			}
		}

		setActiveIndex(_activeIndex);
	};

	const onUpload = (data) => {
		const name = new Date().getTime() + data.files[0].name;

		const file = data.files[0];

		const storageRef = ref(storage, name);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log("Upload is " + progress + "% done");
				switch (snapshot.state) {
					case "paused":
						console.log("Upload is paused");
						break;
					case "running":
						console.log("Upload is running");
						break;
					default:
						break;
				}
			},
			(error) => {
				console.log(error);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setStudentAnswerfile(downloadURL);
					toast.current.show({ severity: "success", summary: "Success", detail: "File Uploaded" });
				});
			}
		);
	};

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	/* 
	const formik = useFormik({
		initialValues: {
			groupleaderRegNo: "",
			groupleaderEmail: "",
			groupName: "",
			studentAnswerfile: "",
		},
		validate: (data) => {
			let errors = {};

			if (!data.groupleaderRegNo) {
				errors.groupleaderRegNo = "Group LeaderID is required.";
			}
			if (!data.groupleaderEmail) {
				errors.groupleaderEmail = "Group Leader Email is required.";
			}
			if (!data.groupName) {
				errors.groupName = "Group Name is required.";
			}

			return errors;
		},

		onSubmit: (data) => {
			setFormData(data);

			const currentUser = JSON.parse(localStorage.getItem("currentUser"));

			const studentsubmissionModel = {
				groupleaderRegNo: data.groupleaderRegNo,
				groupleaderEmail: data.groupleaderEmail,
				groupName: data.groupName,
				studentAnswerfile: data.studentAnswerfile,
				currentUserId: currentUser.userId,
			};
			console.log(studentsubmissionModel);

			studentsubmissionservice.saveStudentSubmisstion(studentsubmissionModel).then((response) => {
				if (response.data.isSuccess === true) {
					toast.current.show({ severity: "success", summary: "Success", detail: "Student Submission  uploaded" });
				}
			});
			handleClose();
			formik.resetForm();
		},
	});

	const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
	const getFormErrorMessage = (name) => {
		return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
	};
 */

	const onSubmit = (id) => {
		const currentUser = JSON.parse(localStorage.getItem("currentUser"));

		const studentsubmissionModel = {
			studentAnswerfile: studentAnswerfile,
			submissionId: id,
			submittedById: currentUser.userId,
		};

		StudentSubmissionService.saveStudentSubmission(studentsubmissionModel).then((response) => {
			if (response.data.isSuccess === true) {
				console.log("model", response.data);
				console.log("haai", studentsubmissionModel);
				toast.current.show({ severity: "success", summary: "Success", detail: "Student Submission sent" });
			}
		});
	};

	return (
		<div className="new">
			<SideBar />
			<div className="newContainer">
				<NavBar />
				<div className="top">
					<h1>Assignments</h1>
				</div>
				<div className="bottom">
					<div className="AccordingConfig">
						{submisstions.map((item, key) => (
							<Accordion multiple activeIndex={0}>
								<AccordionTab key={key} header={item.submissionName}>
									<div className="formgrid grid">
										<div className="field col">
											<table className="table">
												<thead>
													<h2>{item.submissionName}</h2>
												</thead>
												<tbody>
													<tr>
														<td className="rane3">SUBMISSION STATUS</td>
													</tr>
													<tr>
														<td>
															<div className="formgrid grid  rane2">
																<div className="field col ">
																	<p>SUBMISSION TYPE</p>
																</div>
																<div className="field col">
																	<p>{item.submissionType}</p>
																</div>
															</div>
														</td>
													</tr>
													<tr>
														<td>
															<div className="formgrid grid rane2">
																<div className="field col">
																	<p>SUBMISSION DATE</p>
																</div>
																<div className="field col">
																	<p>{item.fromDate}</p>
																</div>
															</div>
														</td>
													</tr>
													<tr>
														<td>
															<div className="formgrid grid rane2">
																<div className="field col">
																	<p>DUE DATE</p>
																</div>
																<div className="field col">
																	<p>{item.toDate}</p>
																</div>
															</div>
														</td>
													</tr>
													<tr>
														<td>
															<div className="formgrid grid rane4">
																<div className="flex align-items-center export-buttons">
																	<p>ASSIGNMENT FILES </p>
																</div>
																<div className="flex align-items-center export-buttons alignments">
																	<Button
																		type="button"
																		icon="pi pi-file-pdf"
																		onClick={(e) => downloadTask(item.submisstionfile)}
																		className="p-button-warning mr-2"
																		data-pr-tooltip="PDF"
																	/>
																</div>
															</div>
														</td>
													</tr>
													<tr>
														<td>
															<div className="formgrid grid rane4">
																<div className="flex align-items-center export-buttons ">
																	<p>SUBMISSION FILES </p>
																</div>

																<div className="flex align-items-center export-buttons alignments">
																	<FileUpload
																		mode="basic"
																		name="demo[]"
																		onChange={(e) => setFile(e.target.files[0])}
																		accept="All Files/*"
																		uploadHandler={onUpload}
																		customUpload
																	/>

																	<Button
																		label="Submit Assignment"
																		onClick={() => onSubmit(item._id)}
																		className="p-button-success "
																		style={{ marginLeft: "8px" }}
																	/>
																</div>
															</div>
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</AccordionTab>
							</Accordion>
						))}
					</div>
				</div>

				{/* 	<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title className="heading">SUBMIT ASSIGNMENT HERE</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<form onSubmit={formik.handleSubmit} className="p-fluid form-config">
							<div className="formgrid grid p-fluid form-config">
								<div className="field col  ">
									<span className="p-float-label">
										<InputText
											id="groupleaderRegNo"
											name="groupleaderRegNo"
											value={formik.values.groupleaderRegNo}
											onChange={formik.handleChange}
											autoFocus
											className={classNames({ "p-invalid": isFormFieldValid("groupleaderRegNo") })}
										/>
										<label
											htmlFor="groupleaderRegNo"
											className={classNames({ "p-error": isFormFieldValid("groupleaderRegNo") })}
										>
											Group Leader ID
										</label>
									</span>
									{getFormErrorMessage("groupleaderRegNo")}
								</div>
							</div>
							<br />

							<div className="formgrid grid p-fluid form-config">
								<div className="field col  ">
									<span className="p-float-label fieldwidth">
										<InputText
											id="groupleaderEmail"
											name="groupleaderEmail"
											value={formik.values.groupleaderEmail}
											onChange={formik.handleChange}
											autoFocus
											className={classNames({ "p-invalid": isFormFieldValid("groupleaderEmail") })}
										/>
										<label
											htmlFor="groupleaderEmail"
											className={classNames({ "p-error": isFormFieldValid("groupleaderEmail") })}
										>
											Group Leader Email
										</label>
									</span>
									{getFormErrorMessage("groupleaderEmail")}
								</div>
							</div>
							<br />
							<div className="formgrid grid p-fluid form-config">
								<div className="field col  ">
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
							</div>
							<br />
							<div className="formgrid grid p-fluid form-config ">
								<div className="field col   ">
									<FileUpload
										mode="basic"
										name="demo[]"
										onChange={(e) => setFile(e.target.files[0])}
										accept="All Files/*"
										uploadHandler={onUpload}
										customUpload
									/>
								</div>
								<div className="field col  ">
									<Button label="Submit" type="submit" icon="pi pi-check" className="p-button-success" />
								</div>
							</div>

							<br />
						</form>
					</Modal.Body>
				</Modal> */}
				<Toast ref={toast}></Toast>
			</div>
		</div>
	);
};
export default AssignmentDetail;
