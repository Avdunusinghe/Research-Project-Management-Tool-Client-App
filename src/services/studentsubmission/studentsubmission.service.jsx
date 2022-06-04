import axios from "axios";
import environment from "../../../environment.prod";

class StudentSubmissionService {
	saveStudentSubmission(studentsubmissionModel) {
		return axios.post(`${environment.apiUrl}studentsubmission/`, studentsubmissionModel);
	}

	getAllStudentSubmissions() {
		return axios.get(`${environment.apiUrl}studentsubmission/all`);
	}

	getAllStudentEvaluationByStudent(model) {
		return axios.post(`${environment.apiUrl}studentsubmission/feedBack`, model);
	}
}

export default new StudentSubmissionService();
