import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import regeneratorRuntime from "regenerator-runtime";
import { fetchSingleAccount } from "../../src/actions";
import * as types from "../../src/actions/types";
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
import "babel-polyfill";
import expect from "expect";

let bankAccountsInfo = {
  savingMessage: "",
  depositInfo: "",
  withDrawInfo: "",
  trasferInfo: "",
  allAccountData: { name: "Simer" },
  singleAccount: { name: "Simer" },
};
describe("Testing fetchSingleAccount action with wrong accountNumber", () => {
  it("Test result will be not found!", () => {
    let store = mockStore(bankAccountsInfo);
    let accountNumber = 909090;
    const expectedActions = [
      {
        type: types.SINGLE_ACCOUNT,
        payload: { Error: "Account Don't Exist. Try again!" },
      },
    ];

    return store.dispatch(fetchSingleAccount(accountNumber)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
describe("Testing fetchSingleAccount action with wrong right input", () => {
  it("Test result will account from database", () => {
    let store = mockStore(bankAccountsInfo);
    let accountNumber = 13;
    let output = {
      AccountNumber: "13",
      Balance: "20",
      CustomerId: "13",
      CustomerName: "simer",
    };
    const expectedActions = [
      {
        type: types.SINGLE_ACCOUNT,
        payload: output,
      },
    ];

    return store.dispatch(fetchSingleAccount(accountNumber)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
