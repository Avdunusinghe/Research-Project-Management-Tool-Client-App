import axios from "axios";
import environment from "../../../environment.prod";

class EvaluationService {
	saveEvaluation(evaluationModel) {
		return axios.post(`${environment.apiUrl}evaluation/`, evaluationModel);
	}

	getAllEvaluationItems() {
		return axios.get(`${environment.apiUrl}evaluation/all`);
	}
}

export default new EvaluationService();
