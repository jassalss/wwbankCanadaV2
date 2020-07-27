import React from "react";
import renderer from "react-test-renderer";
import thunk from "redux-thunk";
import { BrowserRouter as Router } from "react-router-dom";
import "babel-polyfill";
import CheckBalance from "../../src/components/CheckBalance";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let bankAccountsInfo = {
  savingMessage: "",
  depositInfo: "",
  withDrawInfo: "",
  trasferInfo: "",
  allAccountData: { name: "Simer" },
  singleAccount: { name: "Simer" },
};
describe("Testing CheckBalance page with Snapshot", () => {
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
            <CheckBalance />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    window.location = location;
  });
  window.alert.mockClear();
});
