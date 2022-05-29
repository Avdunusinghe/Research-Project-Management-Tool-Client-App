import axios from "axios";
import environment from "../../../environment.prod";
class SubmissionService {
	saveSubmisstion(submisstionModel) {
		return axios.post(`${environment.apiUrl}submisstion`, submisstionModel);
	}

	getAllSubmission() {
		return axios.get(`${environment.apiUrl}submisstion/all`);
	}
	deleteSubmission(id) {
		return axios.delete(`${environment.apiUrl}submisstion/` + id);
	}
}

export default new SubmissionService();
