import axios from "axios";
import environment from "../../../environment.prod";
class SubmissionService {
	saveSubmisstion(submisstionModel) {
		return axios.post(`${environment.apiUrl}submisstion`, submisstionModel);
	}
}

export default new SubmissionService();
