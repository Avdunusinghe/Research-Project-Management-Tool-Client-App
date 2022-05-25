import axios from "axios";
//const apiUrl = process.env.REACT_APP_API_URL;
import environment from "../../../environment.prod";

class TopicService {
	registerTopic(studentGroupModel) {
		return axios.post(`${environment.apiUrl}topic/`, studentGroupModel);
	}

	getAllTopics() {
		return axios.get(`${environment.apiUrl}topic/all`);
	}
}

export default new TopicService();
