import axios from "axios";
import environment from "../../../environment.prod";
class AuthService {
	login(loginModel) {
		return axios.post(`${environment.apiUrl}auth`, loginModel);
	}

	saveStudent(studentModel) {
		return axios.post(`${environment.apiUrl}student/`, studentModel);
	}
}

export default new AuthService();
