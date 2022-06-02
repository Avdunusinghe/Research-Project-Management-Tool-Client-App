import axios from "axios";
import environment from "../../../environment.prod";
class SubmissionService {
	saveSubmisstion(submisstionModel) {
		return axios.post(`${environment.apiUrl}submission`, submisstionModel);
	}

	getAllUnHideSubmissions() {
		return axios.get(`${environment.apiUrl}submission/unHide`);
	}

	getAllSubmissions() {
		return axios.get(`${environment.apiUrl}submission/all`);
	}

	deleteSubmission(id) {
		return axios.delete(`${environment.apiUrl}submission/` + id);
	}

	chengeVisiblitySubmisstion(vm) {
		return axios.put(`${environment.apiUrl}submission/`, vm);
	}

	getSubmissionById(id) {
		return axios.get(`${environment.apiUrl}submission/${id}`);
	}

	getSubmissionAnswers(id) {
		return axios.get(`${environment.apiUrl}submission/studentAnswers/${id}`);
	}

	evaluateStudentSubmission(evaluateModel) {
		return axios.put(`${environment.apiUrl}submission/evaluate`, evaluateModel);
	}
}

export default new SubmissionService();
