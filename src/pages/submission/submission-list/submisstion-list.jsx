import React, { useState, useEffect, useRef, useCallback } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import moment from "moment";
import "./submisstion.list.scss";
import { storage } from "../../../../firebase";
import { Accordion, AccordionTab } from "primereact/accordion";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import SideBar from "../../../components/sidebar/sidebar";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import NavBar from "./../../../components/navbar/navbar";
import submissionService from "../../../services/submission/submisstion.service";
import { NavItem } from "react-bootstrap";
import { InputSwitch } from "primereact/inputswitch";
const SubmissionList = () => {
	const [submissions, setSubmission] = useState([]);
	const [hide, setHide] = useState(false);

	const toast = useRef(null);
	let navigate = useNavigate();
	let location = useLocation();

	useEffect(() => {
		getAllSubmission();
	}, [getAllSubmission]);

	const getAllSubmission = useCallback(() => {
		submissionService
			.getAllSubmission()
			.then((response) => {
				setSubmission(response.data);
			})
			.catch((error) => {});
	}, []);

	const handleCreateNewSubmission = () => {
		navigate("/submission/0" + location.search);
	};

	return (
		<div className="new">
			<SideBar />
			<div className="newContainer">
				<NavBar />
				<div className="top">
					<h1>Submission List</h1>
				</div>
				<div className="bottom">
					<Button icon="pi pi-plus" className="p-button-success mr-2" onClick={handleCreateNewSubmission} />
					<div className="AccordingConfig">
						{submissions.map((rowData, key) => (
							<Accordion multiple activeIndex={0}>
								<AccordionTab key={key} header={rowData.submisstionName}>
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
																		/>
																		<Button
																			type="button"
																			icon="pi pi-pencil"
																			className="p-button-success mr-2"
																			data-pr-tooltip="PDF"
																		/>
																		<Button type="button" icon="pi pi-trash" className="p-button-danger mr-2" />
																		<InputSwitch checked={hide} className="mr-2" onChange={(e) => setHide(e.value)} />
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

				<Toast ref={toast}></Toast>
			</div>
		</div>
	);
};

export default SubmissionList;
