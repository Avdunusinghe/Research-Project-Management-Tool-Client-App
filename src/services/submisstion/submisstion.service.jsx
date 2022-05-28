import axios from "axios";
import environment from "../../../environment.prod";
class SubmisstionService {
	saveSubmisstion(submisstionModel) {
		return axios.post(`${environment.apiUrl}submisstion`, submisstionModel);
	}

	getAllSubmission() {
		return axios.get(`${environment.apiUrl}submisstion/all`);
	}
}

export default new SubmisstionService();
