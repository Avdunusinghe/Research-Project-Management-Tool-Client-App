import { Card } from "primereact/card";
import { Button } from "primereact/button";
import SideBar from "./../../../components/sidebar/sidebar";
import NavBar from "./../../../components/navbar/navbar";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import { FileUpload } from "primereact/fileupload";
import "./assignment.detail.scss";
import { Toast } from "primereact/toast";
import submissionService from "../../../services/submisstion/submisstion.service";
import ReactDOM from "react-dom";
import { storage } from "../../../../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { fontStyle, style } from "@mui/system";
import { CardHeader, getScopedCssBaselineUtilityClass } from "@mui/material";

const CardDemo = () => {
	const [submisstions, setSubmisstions] = React.useState([]);
	const [activeIndex, setActiveIndex] = useState(null);
	const [file, setFile] = useState("");
	const toast = useRef(null);
	const [download, setDownload] = useState([]);
	const fileDownloadRef = useRef();

	const downloadTask = (url) => {
		console.log(url);
		const storage = getStorage();
		const downloads = ref(storage, url);

		getDownloadURL(downloads)
			.then((url) => {
				//<a href="file:///C:/Users/Dell/Downloads"></a>;
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
		getAllSubmission();
	}, [getAllSubmission]);

	const getAllSubmission = useCallback(() => {
		submissionService
			.getAllSubmission()
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
					setsubmisstionfile(downloadURL);
					toast.current.show({ severity: "success", summary: "Success", detail: "File Uploaded" });
				});
			}
		);
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
								<AccordionTab key={key} header={item.submisstionName}>
									<div className="formgrid grid">
										<div className="field col">
											<table className="table">
												<thead>
													<h2>{item.submisstionName}</h2>
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
																<div className="field col">
																	<p>ASSIGNMENT FILES </p>
																</div>
																<div className="field col">
																	<button onClick={(e) => downloadTask(item.submisstionfile)}>FIle Download</button>
																</div>
															</div>
														</td>
													</tr>
													<tr>
														<td>
															<div className="formgrid grid rane4">
																<div className="field col">
																	<p>SUBMISSION FILES </p>
																</div>
																<div className="field col">
																	<Toast ref={toast}></Toast>
																	<FileUpload
																		mode="basic"
																		name="demo[]"
																		onChange={(e) => setFile(e.target.files[0])}
																		accept="All Files/*"
																		uploadHandler={onUpload}
																		customUpload
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
			</div>
		</div>
	);
};
export default CardDemo;
