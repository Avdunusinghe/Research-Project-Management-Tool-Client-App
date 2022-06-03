import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import expectExport from "expect";
import renderer from "react-test-renderer";
import SignUp from "./../signUp/signUp";

afterEach(() => cleanup());

it("Compare the snapshot of SignUp", () => {
	const tree = renderer.create(<SignUp />).toJSON();
	expectExport(tree).toMatchSnapshot();
});

test("Render SignUp", () => {
	render(<SignUp />);
	screen.debug();
	expect(screen.getByText("SignUp")).toBeInTheDocument();
});
