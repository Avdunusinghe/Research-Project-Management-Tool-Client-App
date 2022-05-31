import axios from "axios";
import environment from "../../../environment.prod";

class RequestService {
	requestSupervisor(registerModel) {
		return axios.post(`${environment.apiUrl}requests/`, registerModel);
	}

	getAllSupervisorRequests() {
		return axios.get(`${environment.apiUrl}requests/all`);
	}

	getPanelMemberMasterData() {
		return axios.get(`${environment.apiUrl}masterData`);
	}
}

export default new RequestService();
