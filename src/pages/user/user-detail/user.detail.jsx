import React, { Component, useState } from "react";

import "./user.detail.scss";
import SideBar from "./../../../components/sidebar/sidebar";
import NavBar from "./../../../components/navbar/navbar";
import CloudUploadIcon from "@mui/icons-material/Cloud";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import userService from "../../../services/user/user.service";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const theme = createTheme();

const UserDetail = () => {
	const [file, setFile] = React.useState("");
	const [fullName, setFullName] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [mobileNumber, setMobileNumber] = React.useState("");
	const [department, setDepartment] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [role, setRole] = React.useState("isAdmin");

	let navigate = useNavigate();
	let location = useLocation();

	const onRoleChanged = (event) => {
		setRole(event.target.value);
		console.log(role);
	};

	const handleDepartmentChange = (event) => {
		setDepartment(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const userModel = {
			fullName: fullName,
			email: email,
			mobileNumber: mobileNumber,
			password: password,
			isAdmin: role === "isAdmin" ? true : false,
			IsLecure: role === "IsLecure" ? true : false,
			IsSupervisor: role === "IsSupervisor" ? true : false,
			IsCoSupervisor: role === "IsCoSupervisor" ? true : false,
			IsPanelMember: role === "IsPanelMember" ? true : false,
		};

		userService.saveUser(userModel).then((response) => {
			if (response.data.isSuccess === true) {
				toast(response.data.message);
				navigate("/users" + location.search);
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
					<h1>Add New User</h1>
				</div>
				<div className="bottom">
					<div className="left">
						<img src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg" alt=""></img>
					</div>
					<div className="right">
						<ThemeProvider theme={theme}>
							<Container component="main" maxWidth="xs">
								<CssBaseline />
								<Box
									sx={{
										marginTop: 8,
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
									}}
								>
									<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
										<Grid container spacing={2}>
											<Grid item xs={12}>
												<TextField
													autoComplete="given-name"
													name="fullName"
													required
													value={fullName}
													onChange={(event) => setFullName(event.target.value)}
													fullWidth
													id="fullName"
													label="Full Name"
													autoFocus
												/>
											</Grid>
											<Grid item xs={12}>
												<TextField
													autoComplete="given-name"
													name="email"
													required
													value={email}
													onChange={(event) => setEmail(event.target.value)}
													fullWidth
													id="email"
													label="Email"
													autoFocus
												/>
											</Grid>

											<Grid item xs={12}>
												<TextField
													autoComplete="given-name"
													name="mobileNumber"
													required
													fullWidth
													id="mobileNumber"
													value={mobileNumber}
													onChange={(event) => setMobileNumber(event.target.value)}
													label="Mobile Number"
													autoFocus
												/>
											</Grid>

											<Grid item xs={12}>
												<TextField
													required
													fullWidth
													id="password"
													value={password}
													onChange={(event) => setPassword(event.target.value)}
													label="Password"
													name="password"
													autoComplete="password"
												/>
											</Grid>

											<Grid item xs={12} sm={6}>
												<FormControl sx={{ m: 1, width: 400 }}>
													<InputLabel id="demo-controlled-open-select-label">Department</InputLabel>
													<Select
														labelId="demo-controlled-open-select-label"
														id="demo-controlled-open-select"
														value={department}
														label="department"
														onChange={handleDepartmentChange}
													>
														<MenuItem value="se">SE</MenuItem>
														<MenuItem value="it">IT</MenuItem>
														<MenuItem value="cs">CS</MenuItem>
														<MenuItem value="ise">ISE</MenuItem>
														<MenuItem value="csne">CSNE</MenuItem>
													</Select>
												</FormControl>
											</Grid>
											<Grid item xs={12}>
												<FormControl>
													<FormLabel id="demo-row-radio-buttons-group-label">Roles</FormLabel>
													<RadioGroup
														row
														aria-labelledby="demo-row-radio-buttons-group-label"
														name="controlled-radio-buttons-group"
														value={role}
														onChange={onRoleChanged}
													>
														<FormControlLabel value="isAdmin" control={<Radio />} label="Admin" />
														<FormControlLabel value="IsLecure" control={<Radio />} label="Lecure" />
														<FormControlLabel value="IsSupervisor" control={<Radio />} label="Supervisor" />
														<FormControlLabel value="IsCoSupervisor" control={<Radio />} label="Co-Supervisor" />
														<FormControlLabel value="IsPanelMember" control={<Radio />} label="Panel Member" />
													</RadioGroup>
												</FormControl>
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

export default UserDetail;
