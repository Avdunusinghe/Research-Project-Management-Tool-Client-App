import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import expectExport from "expect";
import SideBar from "./../sidebar/sidebar";
import renderer from "react-test-renderer";

afterEach(() => cleanup());

it("Compare the snapshot of Sidebar", () => {
	const tree = renderer.create(<SideBar />).toJSON();
	expectExport(tree).toMatchSnapshot();
});

test("Render Sidebar", () => {
	render(<SideBar />);
	screen.debug();
	expect(screen.getByText("sideBar")).toBeInTheDocument();
});
