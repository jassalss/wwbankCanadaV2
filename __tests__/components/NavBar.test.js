import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
// Component to be tested
import NavBar from "../../src/components/NavBar";
describe("Testing Nav Bar", () => {
  it("renders without crashing", () => {
    shallow(<NavBar />);
  });
});
describe("Testing Nav Bar with Snapshot", () => {
  it("matches the snapshot", () => {
    const tree = renderer
      .create(
        <Router>
          <NavBar />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
