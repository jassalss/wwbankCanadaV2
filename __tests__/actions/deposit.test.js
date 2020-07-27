import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import regeneratorRuntime from "regenerator-runtime";
import { depositTheMoney } from "../../src/actions";
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
describe("Testing deposit action with existing account", () => {
  it("deposit the money in account", () => {
    let store = mockStore(bankAccountsInfo);
    let newCustObj = {
      CustomerName: "Simer",
      CustomerId: 10,
      AccountNumber: "1313",
      Amount: 20,
    };
    const expectedActions = [
      {
        type: types.DEPOSIT_INFO,
        payload: `Amount $${newCustObj.Amount} CAD  in account with account number ${newCustObj.AccountNumber} by ${newCustObj.CustomerName} successfully deposited.`,
      },
    ];

    return store.dispatch(depositTheMoney(newCustObj, "")).then(() => {
      
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
