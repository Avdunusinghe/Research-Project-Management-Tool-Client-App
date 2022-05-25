import axios from "axios";
import environment from "../../../environment.prod";
class AuthService {
	login(loginModel) {
		return axios.post(`${environment.apiUrl}auth`, loginModel);
	}

	/* saveUser(signUpModel) {
		return axios.post(`${environment.apiUrl}user/`, signUpModel);
	} */
}

export default new AuthService();
