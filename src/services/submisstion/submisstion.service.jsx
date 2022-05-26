import axios from "axios";
import environment from "../../../environment.prod";
class SubmisstionService {
	saveSubmisstion(submisstionModel) {
		return axios.post(`${environment.apiUrl}submisstion`, submisstionModel);
	}
}

export default new SubmisstionService();
