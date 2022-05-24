import axios from "axios";
//const apiUrl = process.env.REACT_APP_API_URL;
const apiUrl = "http://localhost:4000/api/";
class AuthService {
	login(loginModel) {
		return axios.post(`${apiUrl}auth`, loginModel);
	}

	signup(signUpModel) {
		return axios.post(`${apiUrl}student/`, signUpModel);
	}
}

export default new AuthService();
