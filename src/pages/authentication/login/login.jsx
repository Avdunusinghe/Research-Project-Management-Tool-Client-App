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
import "./login.scss";
import authService from "../../../services/auth/auth.service";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

const theme = createTheme();

const Login = () => {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");

	let navigate = useNavigate();
	let location = useLocation();

	const handleSubmit = (event) => {
		event.preventDefault();

		const loginModel = {
			email: email,
			password: password,
		};

		authService.login(loginModel).then((response) => {
			if (response.data.isSuccess === false) {
				toast(response.data.message);
			} else {
				const currentUser = {
					token: response.data.token,
					isLogged: response.data.isLogged,
					userName: response.data.firstName,
					isAdmin: response.data.isAdmin,
					isPanelMember: response.data.isPanelMember,
					isSupervisor: response.data.isSupervisor,
					isLecure: response.data.isLecure,
					isStudent: response.data.isStudent,
				};

				localStorage.setItem("currentUser", JSON.stringify(currentUser));
				navigate("/home" + location.search);
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
							Sign in
						</Typography>
						<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
							<TextField
								margin="normal"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								autoComplete="email"
								autoFocus
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
								autoComplete="current-password"
							/>
							<FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
							<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
								Sign In
							</Button>

							<Grid container>
								<Grid item xs>
									<Link href="#" variant="body2">
										Forgot password?
									</Link>
								</Grid>
								<Grid item>
									<Link href="#" variant="body2">
										{"Don't have an account? Sign Up"}
									</Link>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Container>
			</ThemeProvider>
			<ToastContainer />
		</div>
	);
};

export default Login;
