import "./submission.update.scss";
import { InputText } from "primereact/inputtext";
import SideBar from "../../../components/sidebar/sidebar";
import NavBar from "../../../components/navbar/navbar";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button } from "primereact/button";
import submissionService from "../../../services/submission/submission.service";

const SubmissionUpdate = () => {
	const types = [
		{ name: "Proposal", code: "NY" },
		{ name: "Final", code: "RM" },
		{ name: "Ui", code: "LDN" },
		{ name: "Data", code: "IST" },
		{ name: "project", code: "PRS" },
	];
	const toast = useRef(null);
	const [submissionTypes, setSubmissionTypes] = useState({});
	const [submissionName, setSubmissionName] = useState("");
	const [submissionType, setSubmissionType] = useState(null);
	const [toDate, setToDate] = useState(null);
	const [fromDate, setFromDate] = useState(null);

	let navigate = useNavigate();
	let location = useLocation();
	let params = useParams();

	useEffect(() => {
		setSubmissionTypes(types);
		submissionService.getSubmissionById(params.id).then((response) => {
			console.log(response);
			setSubmissionName(response.data.submissionName);
			for (let index = 0; index < types.length; index++) {
				if (response.data.submissionType === types[index].name) {
					setSubmissionType(types[index]);
				}
			}
			setToDate(new Date(response.data.toDate));
			setFromDate(new Date(response.data.fromDate));
		});
		onSubmitForm.bind(this);
	}, []);

	const onSubmitForm = (event) => {
		event.preventDefault();

		const submissionModel = {
			id: params.id,
			submissionName: submissionName,
			toDate: toDate,
			submissionType: submissionType,
			fromDate: fromDate,
		};

		submissionService
			.saveSubmisstion(submissionModel)
			.then((response) => {
				if (response.data.isSuccess === true) {
					toast.current.show({ severity: "info", summary: "Success", detail: response.data.message });
					navigate("/submission" + location.search);
				} else {
					toast.current.show({ severity: "error", summary: "Error", detail: response.data.message });
				}
			})
			.catch((error) => {
				toast.current.show({ severity: "error", summary: "Error", detail: response.data.message });
			});
	};

	return (
		<div className="new">
			<SideBar />
			<div className="newContainer">
				<NavBar />
				<div className="top">
					<h1>Update Submission</h1>
				</div>
				<div className="bottom">
					<form onSubmit={onSubmitForm} className="p-fluid form-config">
						<div className="formgrid grid">
							<div className="field col">
								<span className="p-float-label">
									<InputText
										id="submisstionName"
										value={submissionName}
										onChange={(event) => setSubmissionName(event.target.value)}
										name="submisstionName"
									/>
									<label htmlFor="submisstionName">Submisstion Name</label>
								</span>
							</div>
							<div className="field col">
								<span className="p-float-label">
									<Dropdown
										id="submissionTypes"
										name="submissionTypes"
										value={submissionType}
										options={submissionTypes}
										onChange={(event) => setSubmissionType(event.target.value)}
										optionLabel="name"
										filter
										filterBy="name"
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
										dateFormat="dd/mm/yy"
										mask="99/99/9999"
										value={fromDate}
										onChange={(event) => setFromDate(event.target.value)}
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
										dateFormat="dd/mm/yy"
										mask="99/99/9999"
										showIcon
										value={toDate}
										onChange={(event) => setToDate(event.target.value)}
										showTime
										showSeconds
									/>
									<label htmlFor="toDate">To date</label>
								</span>
							</div>
							<Button type="submit" label="Submit" className="mt-2" />
						</div>
					</form>
				</div>
			</div>
			<Toast ref={toast}></Toast>
		</div>
	);
};

export default SubmissionUpdate;
