import axios from "axios";
import environment from "../../../environment.prod";

class EvaluationService {
	saveEvaluation(evaluationModel) {
		return axios.post(`${environment.apiUrl}evaluation/`, evaluationModel);
	}

	getAllEvaluationItems() {
		return axios.get(`${environment.apiUrl}evaluation/all`);
	}

	deleteEvaluation(id) {
		return axios.delete(`${environment.apiUrl}evaluation/` + id);
	}
}

export default new EvaluationService();
