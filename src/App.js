import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/authentication/login/login";
import SignUp from "./pages/authentication/signUp/signUp";
import Home from "./pages/home/home";
import SubmissionDetails from "./pages/submission/submission-detail/submission.detail";
import UserDetail from "./pages/user/user-detail/user.detail";
import UserList from "./pages/user/user-list/user.list";

export function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/">
						<Route index element={<Login></Login>}></Route>
						<Route path="home" element={<Home></Home>}></Route>
						<Route path="users">
							<Route index element={<UserList></UserList>}></Route>
							<Route path=":id" element={<UserDetail></UserDetail>}></Route>
						</Route>
						<Route path="submission">
							<Route index element={<SubmissionDetails></SubmissionDetails>}></Route>
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}
