import axios from "axios";
import environment from "../../../environment.prod";
class AuthService {
	login(loginModel) {
		return axios.post(`${environment.apiUrl}auth`, loginModel);
	}
}

export default new AuthService();
