import axios from "axios";
import environment from "../../environment.prod";
function jwtInterceptor() {
	axios.interceptors.request.use((request) => {
		const currentUser = JSON.parse(localStorage.getItem("currentUser"));
		const isApiUr = request.url.startsWith(environment.apiUrl);
		if (isApiUr && currentUser != null) {
			request.headers.common.Authorization = currentUser.token;
		}

		return request;
	});
}

export default jwtInterceptor;
