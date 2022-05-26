import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import SideBar from "./../../../components/sidebar/sidebar";
import NavBar from "./../../../components/navbar/navbar";
import "./topic.detail.scss";
import { useNavigate, useLocation } from "react-router-dom";
import topicService from "../../../services/student/topic.service";

const theme = createTheme();
const TopicDetail = () => {
	const [topicName, setTopicName] = useState("");
	const [subject, setSubject] = useState([]);
	const [groupleaderId, setGroupleaderId] = useState("");
	const [groupleadername, setGroupleadername] = useState("");
	const [groupleaderEmail, setgroupleaderEmail] = useState("");
	const [groupName, setGroupName] = useState("");
	const [description, setDescription] = useState("");

	const handlesubjectChange = (event) => {
		setSubject(event.target.value);
	};
	let navigate = useNavigate();
	let location = useLocation();

	const handleTopicSubmit = (event) => {
		event.preventDefault();

		const topicModel = {
			topicName: topicName,
			subject: subject,
			groupleadername: groupleadername,
			groupleaderId: groupleaderId,
			groupleaderEmail: groupleaderEmail,
			groupName: groupName,
			description: description,
		};

		topicService.registerTopic(topicModel).then((response) => {
			if (response) {
				console.log(response);
				toast(response.data.message);
				navigate("/home" + location.search);
			}
		});
	};

	return (
		<div className="new">
			<SideBar />
			<div className="newContainer">
				<NavBar />

				<div className="top">
					<h1>Topic Registration</h1>
				</div>
				<div className="bottom">
					<div className=" tksa">
						<img
							src="https://img.freepik.com/free-vector/business-people-stand-clipboard-with-checklist_74855-4772.jpg?size=338&ext=jpg&ga=GA1.2.1997995884.1653574017&auto=compress&cs=adobergb1998&dpr=2&w=650"
							alt=""
						></img>
					</div>
					<div className="right">
						<ThemeProvider theme={theme}>
							<Container component="main" maxWidth="xs">
								<CssBaseline />
								<Box
									sx={{
										marginTop: 0,
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
									}}
								>
									<Box component="form" noValidate onSubmit={handleTopicSubmit} sx={{ mt: 3 }}>
										<Grid container spacing={2}>
											<Grid item xs={12}>
												<TextField
													autoComplete="given-name"
													name="topicName"
													required
													value={topicName}
													onChange={(event) => setTopicName(event.target.value)}
													fullWidth
													id="topicName"
													label="Topic Name"
													autoFocus
												/>
											</Grid>
											<Grid item xs={12} sm={6}>
												<FormControl sx={{ m: 1, width: 400 }}>
													<InputLabel id="demo-controlled-open-select-label">Subjects</InputLabel>
													<Select
														labelId="demo-controlled-open-select-label"
														id="demo-controlled-open-select"
														value={subject}
														label="subject"
														onChange={handlesubjectChange}
													>
														<MenuItem value="se">SE</MenuItem>
														<MenuItem value="ds">DS</MenuItem>
														<MenuItem value="paf">PAF</MenuItem>
														<MenuItem value="sa">SA</MenuItem>
														<MenuItem value="esd">ESD</MenuItem>
													</Select>
												</FormControl>
											</Grid>
											<Grid item xs={12}>
												<TextField
													autoComplete="given-name"
													name="groupleaderId"
													required
													value={groupleaderId}
													onChange={(event) => setGroupleaderId(event.target.value)}
													fullWidth
													id="groupleaderId"
													label="Group Leader Id"
													autoFocus
												/>
											</Grid>

											<Grid item xs={12}>
												<TextField
													autoComplete="given-name"
													name="groupleadername"
													required
													fullWidth
													id="groupleadername"
													value={groupleadername}
													onChange={(event) => setGroupleadername(event.target.value)}
													label="Group leader name"
													autoFocus
												/>
											</Grid>

											<Grid item xs={12}>
												<TextField
													required
													fullWidth
													id="groupleaderEmail"
													value={groupleaderEmail}
													onChange={(event) => setgroupleaderEmail(event.target.value)}
													label="Group Leader Email"
													name="groupleaderEmail"
													autoFocus
												/>
											</Grid>

											<Grid item xs={12}>
												<TextField
													required
													fullWidth
													id="groupName"
													value={groupName}
													onChange={(event) => setGroupName(event.target.value)}
													label="Group Name"
													name="groupName"
													autoFocus
												/>
											</Grid>

											<Grid item xs={12}>
												<TextField
													required
													fullWidth
													multiline={true}
													rows={4}
													id="description"
													value={description}
													onChange={(event) => setDescription(event.target.value)}
													label="Description"
													name="description"
													autoFocus
												/>
											</Grid>
										</Grid>

										<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
											Submit
										</Button>
									</Box>
								</Box>
							</Container>
						</ThemeProvider>
						<ToastContainer />
					</div>
				</div>
			</div>
		</div>
	);
};

export default TopicDetail;
