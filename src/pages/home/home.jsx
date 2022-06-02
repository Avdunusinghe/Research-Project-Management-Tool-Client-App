import React, { Component } from "react";
import Chart from "../../components/chart/chart";
import BasicTable from "../../components/data-table/data.table";
import Featured from "../../components/featured/featured";
import NavBar from "../../components/navbar/navbar";
import SideBar from "../../components/sidebar/sidebar";
import Widget from "../../components/widget/widget";
import CaroselSlider from "../../components/carousel/carousel";
import Grid from "@mui/material/Grid";
import { Button } from "primereact/button";

import "./home.scss";

const Home = () => {
	return (
		<div className="home">
			<SideBar />
			<div className="homeContainer">
				<NavBar />

				<div className="listContainer">
					<h1 className="homeHeader">RESEARCH PROJECT MANAGEMENT TOOL</h1>
				</div>
				<div className="listContainer">
					<CaroselSlider />
				</div>
				<div className="listContainer">
					<table>
						<tr>
							<td>
								<div className="listContainer boxStyle">
									<p className="text1">TEMPLATES</p>
									<p className="text2">Try for new templates here</p>
									<p className="text2">
										<a href="https://scholar.google.com/scholar?q=research+template&hl=en&as_sdt=0&as_vis=1&oi=scholart">
											SEE MORE
										</a>
									</p>
								</div>
							</td>
							<td>
								<div className="listContainer boxStyle">
									<p className="text1">TOOLS</p>
									<p className="text2">Try for tools here</p>
									<p className="text2">
										<a href="https://www.google.com/search?q=project+management+tools&rlz=1C1SQJL_enLK1002LK1002&sxsrf=ALiCzsaSA2QgB3yR4zJZkrcgjhav-yydTQ%3A1654006997456&ei=1SSWYtrGG5S-3LUP67yowAs&ved=0ahUKEwiahaic-In4AhUUH7cAHWseCrgQ4dUDCA4&uact=5&oq=project+management+tools&gs_lcp=Cgdnd3Mtd2l6EAMyBAgjECcyBAgAEEMyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDoHCAAQRxCwAzoHCAAQsAMQQzoKCAAQ5AIQsAMYAToSCC4QxwEQ0QMQyAMQsAMQQxgCSgQIQRgASgQIRhgBUPAEWPAEYIcIaAFwAXgAgAF_iAF_kgEDMC4xmAEAoAEByAERwAEB2gEGCAEQARgJ2gEGCAIQARgI&sclient=gws-wiz">
											SEE MORE
										</a>
									</p>
								</div>
							</td>
							<td>
								<div className="listContainer boxStyle">
									<p className="text1">TECHNOLOGIES</p>
									<p className="text2">Try for technologies here</p>
									<p className="text2">
										<a href="https://www.google.com/search?q=project+management+technologies&rlz=1C1SQJL_enLK1002LK1002&oq=project+management+technologies&aqs=chrome..69i57j0i22i30l5j0i15i22i30j0i22i30l3.784j0j9&sourceid=chrome&ie=UTF-8">
											SEE MORE
										</a>
									</p>
								</div>
							</td>
							<td>
								<div className="listContainer boxStyle">
									<p className="text1">FREE PROJECTS</p>
									<p className="text2">Try for free projects here</p>
									<p className="text2">
										<a href="https://www.google.com/search?q=free+management+projects&rlz=1C1SQJL_enLK1002LK1002&oq=free+management+projects&aqs=chrome..69i57j0i10i22i30j0i22i30j0i10i15i22i30j0i15i22i30l2j0i390l2.6268j0j7&sourceid=chrome&ie=UTF-8">
											SEE MORE
										</a>
									</p>
								</div>
							</td>
						</tr>
					</table>
				</div>

				{/* <div className="charts">
					{/* <Featured />
					<Chart /> 
					
				</div> */}
				{/* <div className="listContainer">
					<div className="listTitle">Sample Data</div>
					<BasicTable />
				</div> */}
				{/* <div className="widgets">
					<Widget type="link1"/>
					<Widget type="link2" />
					<Widget type="link3" />
					<Widget type="user" />
				</div> */}
			</div>
		</div>
	);
};

export default Home;
