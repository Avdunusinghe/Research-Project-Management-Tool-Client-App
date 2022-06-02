import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";

import { useFormik } from "formik";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import { Dropdown } from "primereact/dropdown";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Toast } from "primereact/toast";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import SideBar from "./../../../components/sidebar/sidebar";
import NavBar from "./../../../components/navbar/navbar";
import "./topic.detail.scss";
import topicService from "../../../services/student/topic.service";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const theme = createTheme();
const TopicDetail = () => {
	const [subject, setSubject] = useState({});
	const [formData, setFormData] = useState({});
	const toast = useRef(null);

	let navigate = useNavigate();
	let location = useLocation();

	const types = [
		{ name: "SE", code: "SE" },
		{ name: "AF", code: "AF" },
		{ name: "ESD", code: "ESD" },
		{ name: "SA", code: "SA" },
		{ name: "DS", code: "DS" },
		{ name: "NDM", code: "NDM" },
		{ name: "PAF", code: "PAF" },
		{ name: "ITP", code: "ITP" },
	];

	useEffect(() => {
		setSubject(types);
	}, []);

	const formik = useFormik({
		initialValues: {
			topicName: "",
			subject: null,
			groupleaderId: "",
			groupleadername: "",
			groupleaderEmail: "",
			groupName: "",
			description: "",
		},
		validate: (data) => {
			let errors = {};

			if (!data.topicName) {
				errors.topicName = "Topic name is required.";
			}
			if (!data.groupleaderId) {
				errors.groupleaderId = "Group Leader ID is required.";
			}
			if (!data.groupleadername) {
				errors.groupleadername = "Group Leader Name is required.";
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

			const topicModel = {
				topicName: data.topicName,
				subject: data.subject.name,
				groupleadername: data.groupleadername,
				groupleaderId: data.groupleaderId,
				groupleaderEmail: data.groupleaderEmail,
				groupName: data.groupName,
				description: data.description,
			};

			topicService.registerTopic(topicModel).then((response) => {
				console.log(response);
				if (response) {
					console.log("model", response);
					toast.current.show({ severity: "success", summary: "Success", detail: "Topic Registered successfully" });
				}
				formik.resetForm();
				/* if (response.data.isSuccess === true) {
					console.log("haii", response.data);
					
					navigate("/home" + location.search);
					//toast.current.show({ severity: "success", summary: "Success", detail: "Student Submission  uploaded" });
				} */
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
			<div className="newContainer topSize">
				<NavBar />

				<div className="top ">
					<h1>Topic Registration</h1>
				</div>
				<div className="bottom">
					<div className=" tksa">
						<img
							src="https://img.freepik.com/free-vector/business-people-stand-clipboard-with-checklist_74855-4772.jpg?size=338&ext=jpg&ga=GA1.2.1997995884.1653574017&auto=compress&cs=adobergb1998&dpr=2&w=650"
							alt=""
						></img>
					</div>
					<div className="right ">
						<div>
							<form onSubmit={formik.handleSubmit} className="p-fluid ">
								<div className="formgrid grid  ">
									<div className="field  marginset ">
										<span className="p-float-label inputSize ">
											<InputText
												id="topicName"
												name="topicName"
												value={formik.values.topicName}
												onChange={formik.handleChange}
												autoFocus
												className={classNames({ "p-invalid": isFormFieldValid("topicName") })}
											/>
											<label
												htmlFor="groupleaderRegNo"
												className={classNames({ "p-error": isFormFieldValid("topicName") })}
											>
												Topic
											</label>
										</span>
										{getFormErrorMessage("topicName")}
									</div>
								</div>
								<div className="formgrid grid p-fluid ">
									<div className="field col  ">
										<span className="p-float-label inputSize">
											<Dropdown
												id="subject"
												name="subject"
												value={formik.values.subject}
												onChange={formik.handleChange}
												options={subject}
												optionLabel="name"
											/>
											<label htmlFor="subject">Subject</label>
										</span>
									</div>
								</div>
								<div className="formgrid grid p-fluid ">
									<div className="field col  ">
										<span className="p-float-label inputSize">
											<InputText
												id="groupleaderId"
												name="groupleaderId"
												value={formik.values.groupleaderId}
												onChange={formik.handleChange}
												autoFocus
												className={classNames({ "p-invalid": isFormFieldValid("groupleaderId") })}
											/>
											<label
												htmlFor="groupleaderId"
												className={classNames({ "p-error": isFormFieldValid("groupleaderId") })}
											>
												Group Leader ID
											</label>
										</span>
										{getFormErrorMessage("groupleaderId")}
									</div>
								</div>
								<div className="formgrid grid p-fluid ">
									<div className="field col  ">
										<span className="p-float-label inputSize">
											<InputText
												id="groupleadername"
												name="groupleadername"
												value={formik.values.groupleadername}
												onChange={formik.handleChange}
												autoFocus
												className={classNames({ "p-invalid": isFormFieldValid("groupleadername") })}
											/>
											<label
												htmlFor="groupleadername"
												className={classNames({ "p-error": isFormFieldValid("groupleadername") })}
											>
												Group Leader Name
											</label>
										</span>
										{getFormErrorMessage("groupleadername")}
									</div>
								</div>
								<div className="formgrid grid p-fluid ">
									<div className="field col  ">
										<span className="p-float-label inputSize">
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
								<div className="formgrid grid p-fluid ">
									<div className="field col  ">
										<span className="p-float-label inputSize">
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
								<div className="formgrid grid p-fluid  ">
									<div className="field col   ">
										<span className="p-float-label inputSize">
											<InputTextarea
												id="description"
												name="description"
												row="5"
												value={formik.values.description}
												onChange={formik.handleChange}
												autoFocus
												className={classNames({ "p-invalid": isFormFieldValid("description") })}
											/>
											<label
											//htmlFor="description"
											//className={classNames({ "p-error": isFormFieldValid("description") })}
											>
												Description
											</label>
										</span>
									</div>
								</div>
								<div className="formgrid grid p-fluid  ">
									<div className="field col   ">
										<Button label="Submit" type="submit" icon="pi pi-check" className="p-button-success" />
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
				<Toast ref={toast}></Toast>
			</div>
		</div>
	);
};

export default TopicDetail;
