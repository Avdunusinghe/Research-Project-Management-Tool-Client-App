import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/authentication/login/login";
import SignUp from "./pages/authentication/signUp/signUp";
import Home from "./pages/home/home";
<<<<<<< HEAD
import StudentGroupList from "./pages/studentgroups/studentGroup-list/studentGroup-list";
import StudentGroupDetail from "./pages/studentgroups/studentGroups-detail/studentGroup-detail";
=======
import SubmissionDetails from "./pages/submission/submission-detail/submission.detail";
>>>>>>> 8d789e6309f48e19ceeed9a3a1dd82e51267f7a8
import UserDetail from "./pages/user/user-detail/user.detail";
import UserList from "./pages/user/user-list/user.list";

export function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/">
						<Route index element={<Login></Login>}></Route>
<<<<<<< HEAD
						<Route path="signup" element={<SignUp></SignUp>}></Route>
=======
>>>>>>> 8d789e6309f48e19ceeed9a3a1dd82e51267f7a8
						<Route path="home" element={<Home></Home>}></Route>
						<Route path="users">
							<Route index element={<UserList></UserList>}></Route>
							<Route path=":id" element={<UserDetail></UserDetail>}></Route>
						</Route>
<<<<<<< HEAD
						<Route path="studentGroups">
							<Route index element={<StudentGroupDetail></StudentGroupDetail>}></Route>
						</Route>
						<Route path="studentGroupslist">
							<Route index element={<StudentGroupList></StudentGroupList>}></Route>
=======
						<Route path="submission">
							<Route index element={<SubmissionDetails></SubmissionDetails>}></Route>
>>>>>>> 8d789e6309f48e19ceeed9a3a1dd82e51267f7a8
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}
