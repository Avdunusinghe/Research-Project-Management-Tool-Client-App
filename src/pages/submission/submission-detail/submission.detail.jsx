import SideBar from "./../../../components/sidebar/sidebar";
import NavBar from "./../../../components/navbar/navbar";
import React, { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { storage } from "../../../../firebase";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "./submission.detail.scss";
import submissionService from "../../../services/submission/submisstion.service";

const SubmissionDetail = () => {
	const types = [
		{ name: "Proposal", code: "NY" },
		{ name: "Final", code: "RM" },
		{ name: "Ui", code: "LDN" },
		{ name: "Data", code: "IST" },
		{ name: "project", code: "PRS" },
	];
	const [formData, setFormData] = useState({});
	const [submissionType, setSubmissionType] = useState({});
	const [file, setFile] = useState("");
	const [submissionfile, setSubmissionfile] = useState("");
	const toast = useRef(null);
	const fileUploadRef = useRef(null);

	let navigate = useNavigate();
	let location = useLocation();

	useEffect(() => {
		setSubmissionType(types);
	}, []);

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
					setSubmissionfile(downloadURL);
					toast.current.show({ severity: "info", summary: "Success", detail: "File Uploaded" });
				});
			}
		);
	};

	const formik = useFormik({
		initialValues: {
			submissionName: "",
			fromDate: null,
			toDate: null,
			submissionType: null,
			accept: false,
		},

		validate: (data) => {
			let errors = {};

			if (!data.submissionName) {
				errors.submisstionName = "Submisstion Name is required.";
			}

			return errors;
		},

		onSubmit: (data) => {
			setFormData(data);

			const submisstionModel = {
				submissionName: data.submissionName,
				submissionType: data.submissionType.name,
				fromDate: data.fromDate,
				toDate: data.toDate,
				submissionfile: submissionfile,
				isHide: true,
			};
			console.log(submisstionModel);
			submissionService.saveSubmisstion(submisstionModel).then((response) => {
				if (response.data.isSuccess === true) {
					toast.current.show({ severity: "info", summary: "Success", detail: response.data.message });
					formik.resetForm();
					navigate("/submission" + location.search);
				}
			});
		},
	});

	const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
	const getFormErrorMessage = (name) => {
		return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
	};

	return (
		<div className="new">
			<SideBar />
			<div className="newContainer">
				<NavBar />
				<div className="top">
					<h1>Add New Submission</h1>
				</div>
				<div className="bottom">
					<div>
						<form onSubmit={formik.handleSubmit} className="p-fluid form-config">
							<div className="formgrid grid">
								<div className="field col">
									<span className="p-float-label">
										<InputText
											id="submissionName"
											name="submissionName"
											value={formik.values.submissionName}
											onChange={formik.handleChange}
											autoFocus
											className={classNames({ "p-invalid": isFormFieldValid("submissionName") })}
										/>
										<label
											htmlFor="submissionName"
											className={classNames({ "p-error": isFormFieldValid("submissionName") })}
										>
											Submisstion Name
										</label>
									</span>
									{getFormErrorMessage("submissionName")}
								</div>
								<div className="field col">
									<span className="p-float-label">
										<Dropdown
											id="submissionType"
											name="submissionType"
											value={formik.values.submissionType}
											onChange={formik.handleChange}
											options={submissionType}
											optionLabel="name"
										/>
										<label htmlFor="submissionType">Submisstion Type</label>
									</span>
								</div>
							</div>
							<div className="formgrid grid">
								<div className="field col">
									<span className="p-float-label">
										<Calendar
											id="fromDate"
											name="fromDate"
											value={formik.values.fromDate}
											onChange={formik.handleChange}
											dateFormat="dd/mm/yy"
											mask="99/99/9999"
											showIcon
											showTime
											showSeconds
										/>
										<label htmlFor="fromDate">From Date</label>
									</span>
								</div>
								<div className="field col">
									<span className="p-float-label">
										<Calendar
											id="toDate"
											name="toDate"
											value={formik.values.toDate}
											onChange={formik.handleChange}
											dateFormat="dd/mm/yy"
											mask="99/99/9999"
											showIcon
											showTime
											showSeconds
										/>
										<label htmlFor="toDate">To date</label>
									</span>
								</div>
							</div>

							<FileUpload
								mode="basic"
								name="demo[]"
								onChange={(e) => setFile(e.target.files[0])}
								accept="All Files/*"
								uploadHandler={onUpload}
								customUpload
							/>

							<Button type="submit" label="Submit" className="mt-2" />
						</form>
					</div>
				</div>
			</div>
			<Toast ref={toast}></Toast>
		</div>
	);
};

export default SubmissionDetail;
