import axios from "axios";
import environment from "../../../environment.prod";

class StudentSubmisstionService {
	saveStudentSubmisstion(studentsubmissionModel) {
		return axios.post(`${environment.apiUrl}studentsubmisstion/`, studentsubmissionModel);
	}
}

export default new StudentSubmisstionService();
