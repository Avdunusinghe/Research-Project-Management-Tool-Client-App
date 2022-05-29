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
import "./evaluation.detail.scss";
import { useNavigate, useLocation } from "react-router-dom";
import evaluationService from "../../../services/evaluation/evaluation.service";

const theme = createTheme();
const EvaluationDetail = () => {
	const [evaluationType, setEvaluationType] = useState("");
	const [groupId, setGroupId] = useState([]);
	const [evaluatorname, setEvaluatorName] = useState("");
	const [evaluatoremail, setEvaluatorEmail] = useState("");
	const [mark, setMark] = useState("");
	const [feedback, setFeedback] = useState("");

    const handleEvaluationTypeChange = (event) => {
		setEvaluationType(event.target.value);
	};
	let navigate = useNavigate();
	let location = useLocation();

    const handleEvaluationSubmit = (event) => {
		event.preventDefault();

		const evaluationModel = {
			evaluationType: evaluationType,
			groupId: groupId,
			evaluatorname: evaluatorname,
			evaluatoremail: evaluatoremail,
			mark: mark,
			feedback: feedback,
		};

        evaluationService.saveEvaluation(evaluationModel).then((response) => {
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
					<h1>Evaluation</h1>
				</div>
				<div className="bottom">
					<div className=" tksa">
						
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
                                	<Box component="form" noValidate onSubmit={handleEvaluationSubmit} sx={{ mt: 3 }}>
										<Grid container spacing={2}>
											<Grid item xs={12} sm={6}>
												<FormControl sx={{ m: 1, width: 400 }}>
													<InputLabel id="demo-controlled-open-select-label">Evaluation Type</InputLabel>
													<Select
														labelId="demo-controlled-open-select-label"
														id="demo-controlled-open-select"
														value={evaluationType}
														label="evaluationType"
														onChange={handleEvaluationTypeChange}
													>
														<MenuItem value="topic">Research Topic</MenuItem>
														<MenuItem value="presentation">Student Presentation</MenuItem>
														<MenuItem value="documets">Documents</MenuItem>
													</Select>
												</FormControl>
                                                </Grid>
											<Grid item xs={12}>
												<TextField
													autoComplete="given-name"
													name="groupId"
													required
													value={groupId}
													onChange={(event) => setGroupId(event.target.value)}
													fullWidth
													id="groupId"
													label="Group Id"
													autoFocus
												/>
											</Grid>
                                            
											<Grid item xs={12}>
												<TextField
													autoComplete="given-name"
													name="evaluatorname"
													required
													fullWidth
													id="evaluatorname"
													value={evaluatorname}
													onChange={(event) => setEvaluatorName(event.target.value)}
													label="Evaluator name"
													autoFocus
												/>
											</Grid>
                                            
											<Grid item xs={12}>
												<TextField
													required
													fullWidth
													id="evaluatoremail"
													value={groupleaderEmail}
													onChange={(event) => setEvaluatorEmail(event.target.value)}
													label="Evaluator Email"
													name="evaluatoremail"
													autoFocus
												/>
											</Grid>
                                            
											<Grid item xs={12}>
												<TextField
													required
													fullWidth
													id="mark"
													value={mark}
													onChange={(event) => setMark(event.target.value)}
													label="Mark"
													name="mark"
													autoFocus
												/>
											</Grid>
                                            
											<Grid item xs={12}>
												<TextField
													required
													fullWidth
													multiline={true}
													rows={4}
													id="feedback"
													value={feedback}
													onChange={(event) => setFeedback(event.target.value)}
													label="Feedback"
													name="feedback"
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
export default EvaluationDetail;