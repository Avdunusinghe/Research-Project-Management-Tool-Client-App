import { Button } from "primereact/button";
import SideBar from "./../../../components/sidebar/sidebar";
import NavBar from "./../../../components/navbar/navbar";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import "primeflex/primeflex.css";
import { FileUpload } from "primereact/fileupload";
import "./assignment.detail.scss";
import submissionService from "../../../services/submission/submission.service";
import { storage } from "../../../../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import StudentSubmissionService from "../../../services/studentsubmission/studentsubmission.service";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";

const AssignmentDetail = () => {
	const [submisstions, setSubmisstions] = React.useState([]);
	const [submissionanswers, setSubmissionanswers] = React.useState([]);
	const [activeIndex, setActiveIndex] = useState(null);
	const toast = useRef(null);
	const fileDownloadRef = useRef();
	const [file, setFile] = useState("");
	const [studentAnswerfile, setStudentAnswerfile] = useState("");
	const [marks, setMarks] = useState("");
	const [feedBack, setFeedBack] = useState("");

	const [submitted, setSubmitted] = React.useState(false);
	const [evaluateDialog, setEvaluateDialog] = React.useState(false);
	const [submissionId, setSubmissionId] = React.useState("");
	//const [evaluate, setEvaluate] = React.useState(initialEvaluateModel);

	const downloadTask = (url) => {
		const storage = getStorage();
		const downloads = ref(storage, url);

		getDownloadURL(downloads)
			.then((url) => {
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

	const onSubmit = (id) => {
		const currentUser = JSON.parse(localStorage.getItem("currentUser"));

		const studentsubmissionModel = {
			studentAnswerfile: studentAnswerfile,
			submissionId: id,
			submittedById: currentUser.userId,
		};

		StudentSubmissionService.saveStudentSubmission(studentsubmissionModel).then((response) => {
			if (response.data.isSuccess === true) {
				toast.current.show({ severity: "success", summary: "Success", detail: "Student Submission sent" });
			}
		});
	};

	let initialEvaluateModel = {
		id: null,
		marks: "",
		feedBack: "",
	};

	const OnDialogBoxOpen = (id) => {
		const currentUser = JSON.parse(localStorage.getItem("currentUser"));

		const studentanswerModel = {
			submissionId: id,
			submittedById: currentUser.userId,
		};

		//setEvaluate({ initialEvaluateModel });
		setSubmitted(true);
		setEvaluateDialog(true);
		StudentSubmissionService.getAllStudentEvaluationByStudent(studentanswerModel).then((response) => {
			console.log(response);
			setMarks(response.data.marks);
			setFeedBack(response.data.feedBack);
		});
	};

	const hideDialog = () => {
		setSubmitted(false);
		setEvaluateDialog(false);
	};

	const evaluateDialogFooter = (
		<React.Fragment>
			<Button label="OK" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
		</React.Fragment>
	);

	return (
		<div className="new">
			<SideBar />
			<div className="newContainer">
				<NavBar />
				<div className="top">
					<h1>Assignments</h1>
				</div>
				<div className="bottom">
					<Button className="p-button-success"></Button>
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
																		onClick={() => downloadTask(item.submissionfile)}
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
													<tr>
														<td>
															<div className="formgrid grid rane4">
																<div className="flex align-items-center export-buttons alignments">
																	<Button
																		label="Get Evaluation"
																		onClick={() => OnDialogBoxOpen(item._id)}
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

				<Dialog
					visible={evaluateDialog}
					style={{ width: "500px" }}
					header="Assignment Evaluation"
					modal
					className="p-fluid"
					onHide={hideDialog}
					footer={evaluateDialogFooter}
				>
					<div className="field">
						<label htmlFor="marks">Marks </label>
						<InputText id="marks" value={marks} />
					</div>
					<div className="field">
						<label htmlFor="feedBack">FeedBack</label>
						<InputTextarea id="feedBack" value={feedBack} />
					</div>
				</Dialog>

				<Toast ref={toast}></Toast>
			</div>
		</div>
	);
};
export default AssignmentDetail;
