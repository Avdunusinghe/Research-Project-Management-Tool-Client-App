import React, { Component, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./signup.scss";
import userService from "../../../services/user/user.service";
import authService from "../../../services/auth/auth.service";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
const theme = createTheme();

const SignUp = () => {
	const [fullName, setFullName] = React.useState("");
	const [studentid, setStudentid] = React.useState("");
	const [mobileNumber, setMobileNumber] = React.useState("");
	const [department, setDepartment] = React.useState([]);
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");

	let navigate = useNavigate();
	let location = useLocation();

	const handleSubmit = (event) => {
		event.preventDefault();

		const userModel = {
			fullName: fullName,
			studentid: studentid,
			mobileNumber: mobileNumber,
			department: department,
			email: email,
			password: password,
			isStudent: true,
		};

		userService.saveUser(userModel).then((response) => {
			if (response) {
				toast(response.data.message);
				navigate("/" + location.search);
			}
		});
	};

	const handleChange = (event) => {
		setDepartment(event.target.value);
	};

	return (
		<div>
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
						<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Create an Account
						</Typography>
						<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
							<TextField
								margin="normal"
								required
								fullWidth
								id="fullName"
								label="Full Name"
								name="fullName"
								value={fullName}
								onChange={(e) => setFullName(e.target.value)}
								//autoComplete="email"
								autoFocus
							/>
							<TextField
								margin="normal"
								required
								fullWidth
								id="studentid"
								label="Student Id"
								name="studentid"
								value={studentid}
								onChange={(e) => setStudentid(e.target.value)}
								//autoComplete="email"
								//autoFocus
							/>
							<TextField
								margin="normal"
								required
								fullWidth
								id="mobileNumber"
								label="Mobile Number"
								name="mobileNumber"
								value={mobileNumber}
								onChange={(e) => setMobileNumber(e.target.value)}
								//autoComplete="email"
							/>

							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">Department</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={department}
									label="Department"
									onChange={handleChange}
								>
									<MenuItem value={1}>Information Technology</MenuItem>
									<MenuItem value={2}>Software Engineering</MenuItem>
									<MenuItem value={3}>Computer systems and network engineering</MenuItem>
									<MenuItem value={4}>Cyber Security</MenuItem>
									<MenuItem value={5}>Interactive Media</MenuItem>
									<MenuItem value={6}>Computer systems and network engineering</MenuItem>
								</Select>
							</FormControl>

							<TextField
								margin="normal"
								required
								fullWidth
								id="email"
								label="Email"
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								//autoComplete="email"
							/>
							<TextField
								margin="normal"
								required
								fullWidth
								name="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								label="Password"
								type="password"
								id="password"
								//autoComplete="current-password"
							/>
							<FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
							<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
								Sign Up
							</Button>
						</Box>
					</Box>
				</Container>
			</ThemeProvider>
			<ToastContainer />
		</div>
	);
};

export default SignUp;
