import React, { useEffect, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/Cloud";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import SideBar from "./../../../components/sidebar/sidebar";
import NavBar from "./../../../components/navbar/navbar";
import "./evaluation.detail.scss";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import evaluationService from "../../../services/evaluation/evaluation.service";

const theme = createTheme();
const EvaluationDetail = () => {
	const [evaluationType, setEvaluationType] = useState("");
	const [groupId, setGroupId] = useState([]);
	const [evaluatorname, setEvaluatorName] = useState("");
	const [evaluatoremail, setEvaluatorEmail] = useState("");
	const [mark, setMark] = useState("");
	const [feedback, setFeedback] = useState("");

    let navigate = useNavigate();
	let location = useLocation();

    const handleEvaluationTypeChange = (event) => {
		setEvaluationType(event.target.value);
	};

    const handleSubmit = (event) => {
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
			if (response.data.isSuccess === true) {
				toast(response.data.message);
				navigate("/evaluationlist" + location.search);
			} else {
				toast(response.data.message);
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
                        <img
						    src="https://flyunitednigeria.com/wp-content/uploads/2022/02/online-survey.jpg"
						    alt="">
                        </img>
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
                                	<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
													value={evaluatoremail}
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