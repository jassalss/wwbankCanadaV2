import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import regeneratorRuntime from "regenerator-runtime";
import { saveNewCustomer } from "../../src/actions";
import * as types from "../../src/actions/types";
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
import "babel-polyfill";
import expect from "expect";

let bankAccountsInfo = {
  savingMessage: "test",
  depositInfo: "test",
  withDrawInfo: "test",
  trasferInfo: "test",
};
describe("Testing savingNewCustomer with existing account", () => {
  it("tells acountnumber already exist", () => {
    let store = mockStore(bankAccountsInfo);
    const expectedActions = [
      {
        type: types.SAVE_CUSTOMER,
        payload: "Account Already exists. Please use another Account Number",
      },
    ];

    let newCustObj = {
      CustomerName: "Simer",
      CustomerId: 44,
      AccountNumber: "1313",
      Balance: 0,
    };
    return store.dispatch(saveNewCustomer(newCustObj, "")).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
