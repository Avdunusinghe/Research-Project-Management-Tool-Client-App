import axios from "axios";

export function jwtInterceptor() {
	axios.interceptors.request.use((request) => {
		const currentUser = JSON.parse(localStorage.getItem("currentUer"));
		const apiUrl = "http://localhost:4000/api/";

		const isApiUr = request.url.startsWith(apiUrl);

		if (isApiUr) {
			request.headers.common.Authorization = `Bearer ${currentUser.token}`;
		}

		return request;
	});
}
