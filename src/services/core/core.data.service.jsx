class CoreDataService {
	getCountries() {
		return fetch("./core/subissiton.type.json")
			.then((response) => response.json())
			.then((d) => d.data);
	}
}
export default new CoreDataService();
