import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import expectExport from "expect";
import CaroselSlider from "./../carousel/carousel";
import renderer from "react-test-renderer";

afterEach(() => cleanup());

it("Compare the snapshot of CaroselSlider", () => {
	const tree = renderer.create(<CaroselSlider />).toJSON();
	expectExport(tree).toMatchSnapshot();
});

test("Render CaroselSlider", () => {
	render(<NavBar />);
	screen.debug();
	expect(screen.getByText("CaroselSlider")).toBeInTheDocument();
});
