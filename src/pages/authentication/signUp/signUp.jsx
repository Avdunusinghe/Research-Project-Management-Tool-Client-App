import React, { Component, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./signup.scss";
import authService from "../../../services/auth.service";
import { ToastContainer, toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const theme = createTheme();
const faculties = [
	{
		value: "computing",
		label: "Computing",
	},
	{
		value: "business",
		label: "Business",
	},
	{
		value: "engineering",
		label: "Engineering",
	},
	{
		value: "architecture",
		label: "Architecture",
	},
];
const departments = [
	{
		value: "information Technology",
		label: "Information Technology",
	},
	{
		value: "computer systems & network engineering",
		label: "Computer systems & network engineering",
	},
	{
		value: "software Engineering",
		label: "Software Engineering",
	},
	{
		value: "software Engineering",
		label: "Software Engineering",
	},
	{
		value: "cyber Security",
		label: "Cyber Security",
	},
	{
		value: "interactive Media",
		label: "Interactive Media",
	},
];
const roles = [
	{
		value: "student",
		label: "Student",
	},
	{
		value: "admin",
		label: "Admin",
	},
	{
		value: "supervisor",
		label: "Supervisor",
	},
	{
		value: "co-supervisor",
		label: "Co-Supervisor",
	},
];
const SignUp = () => {
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [studenid, setStudentid] = useState("");
	const [mobilenumber, setMobilenumber] = useState("");
	const [faculty, setFaculty] = useState("");
	const [department, setDepartment] = useState("");
	const [role, setRole] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();

		const signUpModel = {
			firstname: firstname,
			lastname: lastname,
			studenid: studenid,
			mobilenumber: mobilenumber,
			faculty: faculty,
			department: department,
			role: role,
			email: email,
			password: password,
		};

		authService.signup(signUpModel).then((response) => {
			if (response) {
				console.log(response);
				toast(response.data.message);
				<Link href="/home" variant="body2"></Link>;
			}
		});
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
								id="firstname"
								label="First Name"
								name="firstname"
								value={firstname}
								onChange={(e) => setFirstname(e.target.value)}
								//autoComplete="email"
								autoFocus
							/>
							<TextField
								margin="normal"
								required
								fullWidth
								id="lastname"
								label="Last Name"
								name="lastname"
								value={lastname}
								onChange={(e) => setLastname(e.target.value)}
								//autoComplete="email"
								//autoFocus
							/>
							<TextField
								margin="normal"
								required
								fullWidth
								id="studentid"
								label="Student Id"
								name="studentid"
								value={studenid}
								onChange={(e) => setStudentid(e.target.value)}
								//autoComplete="email"
								//autoFocus
							/>
							<TextField
								margin="normal"
								required
								fullWidth
								id="mobilenumber"
								label="Mobile Number"
								name="mobilenumber"
								value={mobilenumber}
								onChange={(e) => setMobilenumber(e.target.value)}
								//autoComplete="email"
							/>
							<TextField
								margin="normal"
								required
								fullWidth
								id="faculty"
								label="Faculty"
								name="faculty"
								select
								SelectProps={{ native: true }}
								value={faculty}
								onChange={(e) => setFaculty(e.target.value)}
								//autoComplete="email"
							>
								{faculties.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</TextField>
							<TextField
								margin="normal"
								required
								fullWidth
								id="department"
								label="Department"
								name="department"
								select
								SelectProps={{ native: true }}
								value={department}
								onChange={(e) => setDepartment(e.target.value)}
								//autoComplete="email"
							>
								{departments.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</TextField>

							<TextField
								margin="normal"
								required
								fullWidth
								id="role"
								label="Roles"
								name="role"
								value={role}
								select
								SelectProps={{ native: true }}
								onChange={(e) => setRole(e.target.value)}
								//autoComplete="email"
							>
								{roles.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</TextField>
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
							<Button onClick={handleSubmit()} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
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
