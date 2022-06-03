import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import expectExport from "expect";
import renderer from "react-test-renderer";
import UserList from "./../user-list/user.list";

afterEach(() => cleanup());

it("Compare the snapshot of UserList", () => {
	const tree = renderer.create(<UserList />).toJSON();
	expectExport(tree).toMatchSnapshot();
});

test("Render UserList", () => {
	render(<UserList />);
	screen.debug();
	expect(screen.getByText("UserList")).toBeInTheDocument();
});
