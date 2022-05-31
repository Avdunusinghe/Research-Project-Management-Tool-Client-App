import React, { useState, useEffect, useRef, useCallback } from "react";
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
import { InputSwitch } from "primereact/inputswitch";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

const SubmissionList = () => {
	const [submissions, setSubmission] = useState([]);
	const toast = useRef(null);

	let navigate = useNavigate();
	let location = useLocation();

	useEffect(() => {
		getAllSubmission();
	}, [getAllSubmission]);

	const getAllSubmission = useCallback(() => {
		submissionService
			.getAllSubmissions()
			.then((response) => {
				console.log(response);
				setSubmission(response.data);
			})
			.catch((error) => {});
	}, []);

	const handleCreateNewSubmission = () => {
		navigate("/submission/new" + location.search);
	};
	const handleSubmissionDelete = (id) => {
		confirmDialog({
			message: "Do you want to delete this record?",
			header: "Delete Confirmation",
			icon: "pi pi-info-circle",
			acceptClassName: "p-button-danger",
			accept: () => acceptFunc(id),
			reject,
		});
	};

	const handleUpdateSubmission = (id) => {
		navigate("/submission/" + id + location.search);
	};
	const handleVisibilitySubmisstion = (id, isHide) => {
		confirmDialog({
			message:
				isHide === true
					? "Do you want to Visible to Student this Submisstion?"
					: "Do you want to Hide to Student this Submisstion?",
			header: isHide === true ? "Visible to Student Confirmation" : "Hide to Student Confirmation",
			icon: "pi pi-info-circle",
			acceptClassName: "p-button-success",
			accept: () => acceptHide(id, isHide),
			reject,
		});
	};

	const acceptHide = (id, isHide) => {
		const vm = {
			id: id,
			isHide: isHide,
		};

		submissionService
			.chengeVisiblitySubmisstion(vm)
			.then((response) => {
				if (response.data.isSuccess === true) {
					toast.current.show({ severity: "success", summary: "Confirmed", detail: response.data.message, life: 3000 });
					getAllSubmission();
				} else {
					toast.current.show({ severity: "error", summary: "Rejected", detail: response.data.message, life: 3000 });
				}
			})
			.catch((error) => {
				toast.current.show({
					severity: "error",
					summary: "Rejected",
					detail: "Error has been occred.Please try again",
					life: 3000,
				});
			});
	};

	const acceptFunc = (id) => {
		submissionService
			.deleteSubmission(id)
			.then((response) => {
				if (response.data.isSuccess === true) {
					toast.current.show({ severity: "success", summary: "Confirmed", detail: response.data.message, life: 3000 });
					getAllSubmission();
				} else {
					toast.current.show({ severity: "error", summary: "Rejected", detail: response.data.message, life: 3000 });
				}
			})
			.catch((error) => {
				toast.current.show({
					severity: "error",
					summary: "Rejected",
					detail: "Error has been occred.Please try again",
					life: 3000,
				});
			});
	};

	const reject = () => {
		toast.current.show({ severity: "warn", summary: "Rejected", detail: "You have rejected", life: 3000 });
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
								<AccordionTab key={key} header={rowData.submissionName}>
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

				<Toast ref={toast} />
				<ConfirmDialog />
			</div>
		</div>
	);
};

export default SubmissionList;
