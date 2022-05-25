import axios from "axios";
import environment from "../../../environment.prod";
class AuthService {
	login(loginModel) {
		return axios.post(`${environment.apiUrl}auth`, loginModel);
	}

	signup(signUpModel) {
		return axios.post(`${environment.apiUrl}student`, signUpModel);
	}
}

export default new AuthService();
