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
import submisstionService from "../../../services/submisstion/submisstion.service";
import ReactDOM from "react-dom";
import { storage } from "../../../../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import React, { useState, useCallback, useEffect } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";

const CardDemo = () => {
	/* const [activeIndex, setActiveIndex] = useState(null);
	const [assignments, setAssignments] = useState([]);
	const [file, setFile] = useState("");
	const [submisstionfile, setsubmisstionfile] = useState("");

	const Assignment = [assignments];
	const doubled = Assignment.map((assignment) => assignments.);
	console.log(doubled);

	// const items = assignments;
	// setAssignments([...items, `item-${items.length}`]);

	const getAllSubs = useCallback(() => {
		submissionService.getAllSubmission().then((response) => {
			setAssignments({ assignments: response.data });
			console.log(getAllSubmission);
		});
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
				});
			}
		);
		toast.current.show({ severity: "info", summary: "Success", detail: "File Uploaded" });
	};

	const actionColumn = [
		<div className="cellAction">
			<FileUpload
				mode="basic"
				name="demo[]"
				onChange={(e) => setFile(e.target.files[0])}
				accept="All Files/*"
				uploadHandler={onUpload}
				customUpload
			/>
		</div>,
	];

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
	const footer = (
		<span>
			<Button label="Save" icon="pi pi-check" />
			<Button label="Cancel" icon="pi pi-times" className="p-button-secondary ml-2" />
		</span>
	);
	return (
		<div className="new">
			<SideBar />
			<div className="newContainer">
				<NavBar />
				<div className="top">
					<h1>ASSIGNMENTS</h1>
				</div>
				<div>
					<Card>
						<Card.Header>
							{/* <ul>
								{assignments.map((item, index) => (
									<li key={index}>{item}</li>
								))}
							</ul> 
						</Card.Header>
					</Card>
				</div>
			</div>
		</div>
	); */
};
export default CardDemo;
