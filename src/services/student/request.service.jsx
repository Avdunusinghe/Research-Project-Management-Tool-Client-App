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
		return axios.get(`${environment.apiUrl}requests/masterData`);
	}

	allocatePanelMember(allocatePanelMemberModel) {
		return axios.put(`${environment.apiUrl}requests/`, allocatePanelMemberModel);
	}
}

export default new RequestService();
