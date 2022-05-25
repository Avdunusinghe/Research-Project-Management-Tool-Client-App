import axios from "axios";
//const apiUrl = process.env.REACT_APP_API_URL;
import environment from "../../../environment.prod";

class StudentService {
	saveStudentGroup(studentGroupModel) {
		return axios.post(`${environment.apiUrl}studentGroup/`, studentGroupModel);
	}

	getAllStudentsGroups() {
		return axios.get(`${environment.apiUrl}studentGroup/all`);
	}
}

export default new StudentService();
