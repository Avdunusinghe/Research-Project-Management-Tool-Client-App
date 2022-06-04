import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import expectExport from "expect";
import Login from "./../login/login";
import renderer from "react-test-renderer";

afterEach(() => cleanup());

it("Compare the snapshot of Login", () => {
	const tree = renderer.create(<Login />).toJSON();
	expectExport(tree).toMatchSnapshot();
});

test("Render Login", () => {
	render(<Login />);
	screen.debug();
	expect(screen.getByText("Login")).toBeInTheDocument();
});
