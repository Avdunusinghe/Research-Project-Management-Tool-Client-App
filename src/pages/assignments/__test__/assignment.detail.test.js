import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import expectExport from "expect";
import renderer from "react-test-renderer";
import AssignmentDetail from "./../assignment-detail/assignment.detail";

afterEach(() => cleanup());

it("Compare the snapshot of AssignmentDetail", () => {
	const tree = renderer.create(<AssignmentDetail />).toJSON();
	expectExport(tree).toMatchSnapshot();
});

test("Render AssignmentDetail", () => {
	render(<AssignmentDetail />);
	screen.debug();
	expect(screen.getByText("AssignmentDetail")).toBeInTheDocument();
});
