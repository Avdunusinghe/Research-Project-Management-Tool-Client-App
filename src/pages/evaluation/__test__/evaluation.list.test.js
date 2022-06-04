import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import expectExport from "expect";
import renderer from "react-test-renderer";
import EvaluationList from "../evaluation-list/evaluation.list";

afterEach(() => cleanup());

it("Compare the snapshot of EvaluationList", () => {
	const tree = renderer.create(<EvaluationList />).toJSON();
	expectExport(tree).toMatchSnapshot();
});

test("Render EvaluationList", () => {
	render(<Login />);
	screen.debug();
	expect(screen.getByText("EvaluationList")).toBeInTheDocument();
});
