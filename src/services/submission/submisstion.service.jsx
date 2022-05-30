import axios from "axios";
import environment from "../../../environment.prod";
class SubmissionService {
	saveSubmisstion(submisstionModel) {
		return axios.post(`${environment.apiUrl}submisstion`, submisstionModel);
	}

	getAllUnHideSubmissions() {
		return axios.get(`${environment.apiUrl}submisstion/unHide`);
	}

	getAllSubmissions() {
		return axios.get(`${environment.apiUrl}submisstion/all`);
	}
	deleteSubmission(id) {
		return axios.delete(`${environment.apiUrl}submisstion/` + id);
	}
	chengeVisiblitySubmisstion(vm) {
		return axios.put(`${environment.apiUrl}submisstion/`, vm);
	}
}

export default new SubmissionService();
