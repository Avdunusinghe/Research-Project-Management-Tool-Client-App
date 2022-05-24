import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import axios from "axios";

import "./App.scss";
import "bootstrap/dist/css/bootstrap.css";

const currentUser = JSON.parse(localStorage.getItem("currentUer"));
axios.defaults.baseURL = "http://localhost:4000";
//axios.defaults.headers.common["RPMT-token"] = currentUser.token;

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
