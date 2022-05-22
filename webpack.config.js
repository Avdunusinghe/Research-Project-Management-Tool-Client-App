const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const dotenv = require("dotenv");
const webpack = require("webpack");

module.exports = {
	mode: "development",
	entry: "./src/index.js",
	output: {
		path: path.join(__dirname, "/dist"),
		filename: "bundle.js",
		publicPath: "/",
	},
	target: "web",
	resolve: {
		extensions: [".js", ".jsx", "json"],
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: "babel-loader",

				//enforce: "pre",
			},

			{
				test: /\.scss$/,
				use: ["style-loader", "css-loader", "sass-loader"],
			},

			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
		],
	},

	devServer: {
		static: {
			directory: path.join(__dirname, "public"),
		},
		compress: true,
		port: 3000,
		historyApiFallback: true,
		hot: true,
	},

	plugins: [
		new HtmlWebpackPlugin({ template: "./public/index.html" }),
		new webpack.DefinePlugin({
			"process.env": JSON.stringify(dotenv.config().parsed),
		}),
		new webpack.ProvidePlugin({
			React: "react",
		}),
	],
};
