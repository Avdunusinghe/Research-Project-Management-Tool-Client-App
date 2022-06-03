import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import expectExport from "expect";
import NavBar from "./../navbar/navbar";
import renderer from "react-test-renderer";
import NavBar from "./../navbar/navbar";

afterEach(() => cleanup());

it("Compare the snapshot of NavBar", () => {
	const tree = renderer.create(<NavBar />).toJSON();
	expectExport(tree).toMatchSnapshot();
});

test("Render NavBar", () => {
	render(<NavBar />);
	screen.debug();
	expect(screen.getByText("NavBar")).toBeInTheDocument();
});
