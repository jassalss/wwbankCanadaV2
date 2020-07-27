import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import "babel-polyfill";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
const mockStore = configureStore([]);
let bankAccountsInfo = {
  savingMessage: "test",
  depositInfo: "test",
  withDrawInfo: "test",
  trasferInfo: "test",
};
import CreeatAccount from "../../src/components/CreeatAccount";
window.alert = jest.fn();
describe("Testing create account page with Snapshot", () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      bankAccountsInfo,
    });
  });

  it("matches the snapshot", () => {
    const { location } = window;
    delete window.location;
    window.location = { reload: jest.fn() };
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <CreeatAccount />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    window.location = location;
  });
  window.alert.mockClear();
});
