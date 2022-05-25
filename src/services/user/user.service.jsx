import axios from "axios";
import environment from "../../../environment.prod";
class UserService {
	getAllUsers() {
		return axios.get(`${environment.apiUrl}user/all`);
	}

	saveUser(userModel) {
		return axios.post(`${environment.apiUrl}user`, userModel);
	}
}

export default new UserService();
