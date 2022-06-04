import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import expectExport from "expect";
import Chart from "./../chart/chart";
import renderer from "react-test-renderer";

afterEach(() => cleanup());

it("Compare the snapshot of Chart", () => {
	const tree = renderer.create(<Chart />).toJSON();
	expectExport(tree).toMatchSnapshot();
});

test("Render Chart", () => {
	render(<Chart />);
	screen.debug();
	expect(screen.getByText("Chart")).toBeInTheDocument();
});
