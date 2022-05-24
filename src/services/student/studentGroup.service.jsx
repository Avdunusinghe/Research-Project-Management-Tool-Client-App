import axios from "axios";
//const apiUrl = process.env.REACT_APP_API_URL;
const apiUrl = "http://localhost:4000/api/";
class StudentService {
	saveStudentGroup(studentGroupModel) {
		return axios.post(`${apiUrl}studentGroup/`, studentGroupModel);
	}
}

export default new StudentService();
