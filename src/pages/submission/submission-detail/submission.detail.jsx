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
	const [submisstionType, setSubmisstionType] = useState({});
	const [file, setFile] = useState("");
	const [submisstionfile, setsubmisstionfile] = useState("");
	const toast = useRef(null);
	const fileUploadRef = useRef(null);

	useEffect(() => {
		setSubmisstionType(types);
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
					setsubmisstionfile(downloadURL);
					toast.current.show({ severity: "info", summary: "Success", detail: "File Uploaded" });
				});
			}
		);
	};

	const formik = useFormik({
		initialValues: {
			submisstionName: "",
			fromDate: null,
			toDate: null,
			submisstionType: null,
			accept: false,
		},

		validate: (data) => {
			let errors = {};

			if (!data.submisstionName) {
				errors.submisstionName = "Submisstion Name is required.";
			}

			return errors;
		},

		onSubmit: (data) => {
			setFormData(data);

			const submisstionModel = {
				submisstionName: data.submisstionName,
				submissionType: data.submisstionType.name,
				fromDate: data.fromDate,
				toDate: data.toDate,
				submisstionfile: submisstionfile,
			};

			submissionService.saveSubmisstion(submisstionModel).then((response) => {
				if (response.data.isSuccess === true) {
					toast.current.show({ severity: "success", summary: "Success", detail: response.data.message });
				}
			});

			formik.resetForm();
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
											id="submisstionName"
											name="submisstionName"
											value={formik.values.submisstionName}
											onChange={formik.handleChange}
											autoFocus
											className={classNames({ "p-invalid": isFormFieldValid("submisstionName") })}
										/>
										<label
											htmlFor="submisstionName"
											className={classNames({ "p-error": isFormFieldValid("submisstionName") })}
										>
											Submisstion Name
										</label>
									</span>
									{getFormErrorMessage("submisstionName")}
								</div>
								<div className="field col">
									<span className="p-float-label">
										<Dropdown
											id="submisstionType"
											name="submisstionType"
											value={formik.values.submisstionType}
											onChange={formik.handleChange}
											options={submisstionType}
											optionLabel="name"
										/>
										<label htmlFor="submisstionType">Submisstion Type</label>
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

							<Toast ref={toast}></Toast>

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
		</div>
	);
};

export default SubmissionDetail;
