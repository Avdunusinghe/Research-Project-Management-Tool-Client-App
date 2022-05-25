import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/authentication/login/login";
import SignUp from "./pages/authentication/signUp/signUp";
import Home from "./pages/home/home";
import StudentGroupList from "./pages/studentgroups/studentGroup-list/studentGroup-list";
import StudentGroupDetail from "./pages/studentgroups/studentGroups-detail/studentGroup-detail";
import UserDetail from "./pages/user/user-detail/user.detail";
import UserList from "./pages/user/user-list/user.list";

export function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/">
						<Route index element={<Login></Login>}></Route>
						<Route path="signup" element={<SignUp></SignUp>}></Route>
						<Route path="home" element={<Home></Home>}></Route>
						<Route path="users">
							<Route index element={<UserList></UserList>}></Route>
							<Route path=":id" element={<UserDetail></UserDetail>}></Route>
						</Route>
						<Route path="studentGroups">
							<Route index element={<StudentGroupDetail></StudentGroupDetail>}></Route>
						</Route>
						<Route path="studentGroupslist">
							<Route index element={<StudentGroupList></StudentGroupList>}></Route>
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}
