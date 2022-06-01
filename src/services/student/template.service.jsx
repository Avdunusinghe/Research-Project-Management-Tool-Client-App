import axios from "axios";
//const apiUrl = process.env.REACT_APP_API_URL;
import environment from "../../../environment.prod";

class TemplateService {
	getAllTemplates() {
		return axios.get(`${environment.apiUrl}templates/all`);
	}
}

export default new TemplateService();
