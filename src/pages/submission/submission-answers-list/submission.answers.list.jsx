import "./submission.answers.list.scss";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import moment from "moment";
import { storage } from "../../../../firebase";
import { Accordion, AccordionTab } from "primereact/accordion";
import SideBar from "../../../components/sidebar/sidebar";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import NavBar from "./../../../components/navbar/navbar";
import { InputSwitch } from "primereact/inputswitch";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import submissionService from "../../../services/submission/submission.service";
const SubmissionAnswersList = () => {
	const [submissionAnswers, setSubmissionAnswers] = useState([]);
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
				setSubmissionAnswers(response.data);
			})
			.catch((error = {}));
	}, []);

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
								<AccordionTab key={key} header={rowData.studentId}>
									<div className="formgrid grid">
										<div className="field col">
											<table className="table">
												<thead>
													<h2>{rowData.submisstionName}</h2>
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
																	<p>{rowData.submissionType}</p>
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
																	<p>{moment(rowData.fromDate).format("YYYY-MM-DDTHH:mm")}</p>
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
																	<p>{moment(rowData.toDate).format("YYYY-MM-DDTHH:mm")}</p>
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
																		<Button
																			type="button"
																			icon="pi pi-file-pdf"
																			className="p-button-warning mr-2"
																			data-pr-tooltip="PDF"
																			onClick={() => handleSubmissionDownload(rowData.submissionfile)}
																		/>
																		<Button
																			type="button"
																			icon="pi pi-pencil"
																			className="p-button-success mr-2"
																			data-pr-tooltip="PDF"
																			onClick={() => handleUpdateSubmission(rowData._id)}
																		/>
																		<Button
																			type="button"
																			icon="pi pi-trash"
																			className="p-button-danger mr-2"
																			onClick={() => handleSubmissionDelete(rowData._id)}
																		/>
																		<InputSwitch
																			checked={rowData.isHide}
																			className="mr-2"
																			onChange={(e) => {
																				handleVisibilitySubmisstion(rowData._id, rowData.isHide);
																			}}
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
																	<p>STUDENT SUBMISSION</p>
																</div>
																<div className="field col">
																	<Button type="button" icon="pi pi-file" className="p-button-success mr-2" />
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
			</div>
		</div>
	);
};

export default SubmissionAnswersList;
