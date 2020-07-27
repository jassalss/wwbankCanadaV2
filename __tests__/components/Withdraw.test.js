import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import "babel-polyfill";
import Withdraw from "../../src/components/Withdraw";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
const mockStore = configureStore([]);
let bankAccountsInfo = {
  savingMessage: "test",
  depositInfo: "test",
  withDrawInfo: "test",
  trasferInfo: "test",
};
describe("Testing Withdraw page with Snapshot", () => {
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
            <Withdraw />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    window.location = location;
  });
  window.alert.mockClear();
});
