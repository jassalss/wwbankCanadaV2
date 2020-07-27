import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import "babel-polyfill";
// Component to be tested
import Transfer from "../../src/components/Transfer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

const mockStore = configureStore([]);

let bankAccountsInfo = {
  savingMessage: "test",
  depositInfo: "test",
  withDrawInfo: "test",
  trasferInfo: "test",
};
describe("Testing Transfer page with Snapshot", () => {
  let store;
  window.alert = jest.fn();
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
            <Transfer />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    window.location = location;
  });
  window.alert.mockClear();
});
