import SideBar from "./../../../components/sidebar/sidebar";
import NavBar from "./../../../components/navbar/navbar";
import React, { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Calendar } from "primereact/calendar";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const SubmissionDetail = () => {
	const [totalSize, setTotalSize] = useState(0);

	const [countries, setCountries] = useState([]);
	const [showMessage, setShowMessage] = useState(false);
	const [formData, setFormData] = useState({});
	const toast = useRef(null);
	const fileUploadRef = useRef(null);

	const onUpload = () => {
		toast.current.show({ severity: "info", summary: "Success", detail: "File Uploaded" });
	};

	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			password: "",
			date: null,
			country: null,
			accept: false,
		},
		validate: (data) => {
			let errors = {};

			if (!data.name) {
				errors.name = "Name is required.";
			}

			if (!data.email) {
				errors.email = "Email is required.";
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
				errors.email = "Invalid email address. E.g. example@email.com";
			}

			if (!data.password) {
				errors.password = "Password is required.";
			}

			if (!data.accept) {
				errors.accept = "You need to agree to the terms and conditions.";
			}

			return errors;
		},
		onSubmit: (data) => {
			setFormData(data);
			setShowMessage(true);

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
						<form onSubmit={formik.handleSubmit} className="p-fluid">
							<div className="formgrid grid">
								<div className="field col">
									<span className="p-float-label">
										<InputText
											id="name"
											name="name"
											value={formik.values.name}
											onChange={formik.handleChange}
											autoFocus
											className={classNames({ "p-invalid": isFormFieldValid("name") })}
										/>
										<label htmlFor="name" className={classNames({ "p-error": isFormFieldValid("name") })}>
											File Name*
										</label>
									</span>
									{getFormErrorMessage("name")}
								</div>
								<div className="field col">
									<span className="p-float-label p-input-icon-right">
										<i className="pi pi-envelope" />
										<InputText
											id="email"
											name="email"
											value={formik.values.email}
											onChange={formik.handleChange}
											className={classNames({ "p-invalid": isFormFieldValid("email") })}
										/>
										<label htmlFor="email" className={classNames({ "p-error": isFormFieldValid("email") })}>
											Email*
										</label>
									</span>
									{getFormErrorMessage("email")}
								</div>
							</div>
							<div className="field">
								<span className="p-float-label">
									<Calendar
										id="date"
										name="date"
										value={formik.values.date}
										onChange={formik.handleChange}
										dateFormat="dd/mm/yy"
										mask="99/99/9999"
										showIcon
										showTime
										showSeconds
									/>
									<label htmlFor="date">To date</label>
								</span>
							</div>

							<div>
								<Toast ref={toast}></Toast>

								<Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
								<Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
								<Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

								<div className="card">
									<h5>Submission</h5>
									<FileUpload
										name="demo[]"
										url="https://primefaces.org/primereact/showcase/upload.php"
										onUpload={onUpload}
										multiple
										accept="image/*"
										maxFileSize={10000000}
										emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>}
									/>
								</div>
							</div>

							<Button type="submit" label="Submit" className="mt-2" />
						</form>
					</div>
				</div>

				{/* <div className="bottom">
					<div className="left">
						<h5 className="text-center">Register</h5>
						<form onSubmit={formik.handleSubmit} className="p-fluid">
							<div className="field">
								<span className="p-float-label">
									<InputText
										id="name"
										name="name"
										value={formik.values.name}
										onChange={formik.handleChange}
										autoFocus
										className={classNames({ "p-invalid": isFormFieldValid("name") })}
									/>
									<label htmlFor="name" className={classNames({ "p-error": isFormFieldValid("name") })}>
										Name*
									</label>
								</span>
								{getFormErrorMessage("name")}
							</div>

							<Button type="submit" label="Submit" className="mt-2" />
						</form>

						<div>
							<Toast ref={toast}></Toast>

							<Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
							<Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
							<Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

							<div className="card">
								<h5>Submission</h5>
								<FileUpload
									name="demo[]"
									url="https://primefaces.org/primereact/showcase/upload.php"
									onUpload={onUpload}
									multiple
									accept="image/*"
									maxFileSize={10000000}
									emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>}
								/>
							</div>
						</div>
					</div>
				</div> */}
			</div>
		</div>
	);
};

export default SubmissionDetail;
