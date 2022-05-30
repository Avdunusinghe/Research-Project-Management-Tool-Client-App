import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/authentication/login/login";
import SignUp from "./pages/authentication/signUp/signUp";
import Home from "./pages/home/home";
import StudentGroupList from "./pages/studentgroups/studentGroup-list/studentGroup-list";
import StudentGroupDetail from "./pages/studentgroups/studentGroups-detail/studentGroup-detail";
import TemplateList from "./pages/templates/template.detail";
import TopicDetail from "./pages/topic/topic-detail/topic.detail";
import TopicList from "./pages/topic/topic-list/topic-list";
import SubmissionDetails from "./pages/submission/submission-detail/submission.detail";
import UserDetail from "./pages/user/user-detail/user.detail";
import UserList from "./pages/user/user-list/user.list";
import AssignmentDetail from "./pages/assignments/assignment-detail/assignment.detail";

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
						<Route path="topicform">
							<Route index element={<TopicDetail></TopicDetail>}></Route>
						</Route>
						<Route path="topiclist">
							<Route index element={<TopicList></TopicList>}></Route>
						</Route>
						<Route path="templatelist">
							<Route index element={<TemplateList></TemplateList>}></Route>
						</Route>
						<Route path="submission">
							<Route index element={<SubmissionDetails></SubmissionDetails>}></Route>
						</Route>
						<Route path="assignmentlist">
							<Route index element={<AssignmentDetail></AssignmentDetail>}></Route>
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}
