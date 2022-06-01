import axios from "axios";
import environment from "../../../environment.prod";

class StudentSubmissionService {
	saveStudentSubmission(studentsubmissionModel) {
		return axios.post(`${environment.apiUrl}studentsubmission/`, studentsubmissionModel);
	}
}

export default new StudentSubmissionService();
