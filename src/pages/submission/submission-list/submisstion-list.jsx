import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Rating } from "primereact/rating";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { useFormik } from "formik";
import moment from "moment";
import "./submisstion.list.scss";
import { storage } from "../../../../firebase";

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import SideBar from "../../../components/sidebar/sidebar";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import NavBar from "./../../../components/navbar/navbar";
import submisstionService from "../../../services/submission/submisstion.service";
const SubmissionList = () => {
	const toast = useRef(null);
	let navigate = useNavigate();
	let location = useLocation();
	useEffect(() => {}, []);

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
				</div>
				<Toast ref={toast}></Toast>
			</div>
		</div>
	);
};

export default SubmissionList;
