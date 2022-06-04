module.exports = {
	transform: {
		"^.+\\.js$": "babel-jest",
		".+\\.(scss)$": "jest-transform-stub",
		"^.+\\.jsx$": "babel-jest",
	},
	automock: false,
	setupFiles: ["./setupJest.js"],
};
