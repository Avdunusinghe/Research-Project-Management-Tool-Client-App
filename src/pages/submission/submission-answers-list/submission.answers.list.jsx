import "./submission.answers.list.scss";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import moment from "moment";
import { storage } from "../../../../firebase";
import { Accordion, AccordionTab } from "primereact/accordion";
import SideBar from "../../../components/sidebar/sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import NavBar from "./../../../components/navbar/navbar";
import { InputSwitch } from "primereact/inputswitch";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import submissionService from "../../../services/submission/submission.service";
import { classNames } from "primereact/utils";
const SubmissionAnswersList = () => {
	let initialEvaluateModel = {
		id: null,
		marks: "",
		feedBack: "",
	};
	const [evaluateDialog, setEvaluateDialog] = React.useState(false);
	const [evaluate, setEvaluate] = React.useState(initialEvaluateModel);
	const [submitted, setSubmitted] = React.useState(false);
	const [submissionAnswers, setSubmissionAnswers] = React.useState([]);
	const [submissionId, setSubmissionId] = React.useState("");
	const toast = useRef(null);

	let navigate = useNavigate();
	let location = useLocation();
	let params = useParams();

	useEffect(() => {
		getSubmissionAnswers();
	}, [getSubmissionAnswers]);

	const getSubmissionAnswers = useCallback(() => {
		submissionService
			.getSubmissionAnswers(params.id)
			.then((response) => {
				console.log(response);
				setSubmissionAnswers(response.data);
			})
			.catch((error) => {});
	}, []);

	const hideDialog = () => {
		setSubmitted(false);
		setEvaluateDialog(false);
	};

	const handleEvaluateSubmission = (id) => {
		setSubmissionId(id);
		setEvaluate({ initialEvaluateModel });
		setSubmitted(true);
		setEvaluateDialog(true);
	};

	const saveEvalution = () => {
		setSubmitted(false);

		let _evaluationDetails = { ...evaluate };

		console.log(_evaluationDetails);

		let evaluateModel = {
			id: submissionId,
			marks: _evaluationDetails.marks,
			feedBack: _evaluationDetails.feedBack,
		};

		submissionService.evaluateStudentSubmission(evaluateModel).then((response) => {
			if (response.data.isSuccess === true) {
				toast.current.show({ severity: "info", summary: "Success", detail: response.data.message, life: 3000 });
				setEvaluateDialog(false);
				setEvaluate(initialEvaluateModel);
				setSubmitted(true);
				getSubmissionAnswers();
			} else {
				toast.current.show({ severity: "error", summary: "Error", detail: response.data.message, life: 3000 });
			}
		});
	};

	const handleStudentSubmissionDownload = (url) => {
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

	const evaluateDialogFooter = (
		<React.Fragment>
			<Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
			<Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveEvalution} />
		</React.Fragment>
	);

	const onInputChange = (event, name) => {
		const value = (event.target && event.target.value) || "";
		let _evaluate = { ...evaluate };
		_evaluate[`${name}`] = value;

		setEvaluate(_evaluate);
	};

	return (
		<div className="new">
			<SideBar />
			<div className="newContainer">
				<NavBar />
				<div className="top">
					<h1>Student Submissions</h1>
				</div>
				<div className="bottom">
					<div className="AccordingConfig">
						{submissionAnswers.map((rowData, key) => (
							<Accordion multiple activeIndex={0}>
								<AccordionTab
									key={key}
									header={
										"Submission : " +
										rowData.submissionId?.submissionName +
										" | " +
										"Student Name : " +
										rowData.submittedById?.fullName
									}
								>
									<div className="formgrid grid">
										<div className="field col">
											<table className="table">
												<thead>
													<h2>{rowData.submissionId?.submissionName}</h2>
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
																	<p>{rowData.submissionId?.submissionType}</p>
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
																	<p>{moment(rowData.submissionId?.fromDate).format("YYYY-MM-DDTHH:mm")}</p>
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
																	<p>{moment(rowData.submissionId?.toDate).format("YYYY-MM-DDTHH:mm")}</p>
																</div>
															</div>
														</td>
													</tr>
													<tr>
														<td>
															<div className="formgrid grid rane2">
																<div className="field col">
																	<p>STUDENT SUBMITTED DATE</p>
																</div>
																<div className="field col">
																	<p>{moment(rowData.submissionId?.submitedOn).format("YYYY-MM-DDTHH:mm")}</p>
																</div>
															</div>
														</td>
													</tr>
													<tr>
														<td>
															<div className="formgrid grid rane4">
																<div className="field col">
																	<p>ACTION </p>
																</div>
																<div className="field col">
																	<div className="flex align-items-center export-buttons">
																		{rowData.submissionId?.submissionfile != null && (
																			<Button
																				type="button"
																				icon="pi pi-file-pdf"
																				className="p-button-warning mr-2"
																				data-pr-tooltip="PDF"
																				onClick={() =>
																					handleStudentSubmissionDownload(rowData.submissionId?.submissionfile)
																				}
																			/>
																		)}

																		<Button
																			type="button"
																			icon="pi pi-trash"
																			className="p-button-danger mr-2"
																			onClick={() => handleSubmissionDelete(rowData._id)}
																		/>
																	</div>
																</div>
															</div>
														</td>
													</tr>
													<tr>
														<td>
															<div className="formgrid grid rane4">
																<div className="field col">
																	<p>{rowData?.marks != null ? "UPDATE EVALUATION" : "EVALUATE SUBMISSION"}</p>
																</div>
																<div className="field col">
																	<Button
																		type="button"
																		icon="pi pi-file"
																		onClick={() => handleEvaluateSubmission(rowData._id)}
																		className="p-button-success mr-2"
																	/>
																</div>
															</div>
														</td>
													</tr>
													<tr>
														<td>
															<div className="formgrid grid rane2">
																<div className="field col">
																	<p>MARKS</p>
																</div>
																<div className="field col">
																	<p>{rowData?.marks != null ? rowData?.marks : "NOT GRADED"}</p>
																</div>
															</div>
														</td>
													</tr>
													<tr>
														<td>
															<div className="formgrid grid rane2">
																<div className="field col">
																	<p>FEEDBACK</p>
																</div>
																<div className="field col">
																	<p>{rowData?.feedBack != null ? rowData?.feedBack : "NOT GRADED"}</p>
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
					header="Evaluate Submisstion"
					modal
					className="p-fluid"
					footer={evaluateDialogFooter}
					onHide={hideDialog}
				>
					<div className="field">
						<label htmlFor="marks">Marks </label>
						<InputText
							id="marks"
							value={evaluate.marks}
							onChange={(e) => onInputChange(e, "marks")}
							required
							autoFocus
							className={classNames({ "p-invalid": submitted && !evaluate.marks })}
						/>
						{submitted && !evaluate.marks && <small className="p-error">Marks is required.</small>}
					</div>
					<div className="field">
						<label htmlFor="feedBack">FeedBack</label>
						<InputTextarea
							id="feedBack"
							value={evaluate.feedBack}
							onChange={(e) => onInputChange(e, "feedBack")}
							rows={3}
							cols={20}
							required
							className={classNames({ "p-invalid": submitted && !evaluate.feedBack })}
						/>
						{submitted && !evaluate.feedBack && <small className="p-error">Feed-Back is required.</small>}
					</div>
				</Dialog>
				<Toast ref={toast}></Toast>
			</div>
		</div>
	);
};

export default SubmissionAnswersList;
