import axios from "axios";
import environment from "../../../environment.prod";
class UserService {
	getAllUsers() {
		return axios.get(`${environment.apiUrl}user/all`);
	}
}

export default new UserService();
