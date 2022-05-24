import axios from "axios";
import environment from "../../../environment.prod";
class UserService {
	getAllUsers() {
		return axios.post(`${environment.apiUrl}user/all`);
	}
}

export default new UserService();
