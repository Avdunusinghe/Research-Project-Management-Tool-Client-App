import axios from "axios";
import environment from "../../../environment.prod";

class TopicService {
	registerTopic(topicModel) {
		return axios.post(`${environment.apiUrl}topic/`, topicModel);
	}

	getAllTopics() {
		return axios.get(`${environment.apiUrl}topic/all`);
	}
}

export default new TopicService();
