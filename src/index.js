import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import axios from "axios";
import jwtInterceptor from "../src/utils/jwt.interceptor";

import "./App.scss";
import "bootstrap/dist/css/bootstrap.css";

jwtInterceptor();
const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
