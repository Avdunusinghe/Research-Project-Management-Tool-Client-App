import axios from "axios";
//const apiUrl = process.env.REACT_APP_API_URL;
import environment from "../../../environment.prod";

class RequestService {
	requestSupervisor(registerModel) {
		return axios.post(`${environment.apiUrl}requests/`, registerModel);
	}

	getAllSupervisorRequestss() {
		return axios.get(`${environment.apiUrl}requests/all`);
	}
}

export default new RequestService();
