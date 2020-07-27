import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import regeneratorRuntime from "regenerator-runtime";
import { withDrawTheMoney } from "../../src/actions";
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
describe("Testing withDrawTheMoney action", () => {
  it("scuessfully withdraw the money from account", () => {
    let store = mockStore(bankAccountsInfo);
    let newCustObj = {
      CustomerName: "for jest",
      CustomerId: "10",
      AccountNumber: "1313",
      Amount: 0,
    };
    const expectedActions = [
      {
        type: types.WITHDRAW_INFO,
        payload: `${newCustObj.CustomerName} withdraw $${newCustObj.Amount} CAD  from acount with account# ${newCustObj.AccountNumber}.`,
      },
    ];

    return store.dispatch(withDrawTheMoney(newCustObj, "")).then(() => {
      
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("Testing withDrawTheMoney action", () => {
  it("withdraw fails due wrong Customer Id", () => {
    let store = mockStore(bankAccountsInfo);
    let newCustObj = {
      CustomerName: "for jest",
      CustomerId: "9999",
      AccountNumber: "1313",
      Amount: 0,
    };
    const expectedActions = [
      {
        type: types.WITHDRAW_INFO,
        payload: `Customer Id did not match with provided account number. This is not your account`,
      },
    ];

    return store.dispatch(withDrawTheMoney(newCustObj, "")).then(() => {
      
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
describe("Testing withDrawTheMoney action", () => {
  it("withdraw fails due wrong customer name", () => {
    let store = mockStore(bankAccountsInfo);
    let newCustObj = {
      CustomerName: "simer",
      CustomerId: "10",
      AccountNumber: "1313",
      Amount: 0,
    };
    const expectedActions = [
      {
        type: types.WITHDRAW_INFO,
        payload: `Customer name did not match with provided account number. This is not your account`,
      },
    ];

    return store.dispatch(withDrawTheMoney(newCustObj, "")).then(() => {
      
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
describe("Testing withDrawTheMoney method", () => {
  it("withdraw fails becuase requested amount is higer than balnce", () => {
    let store = mockStore(bankAccountsInfo);
    let newCustObj = {
      CustomerName: "for jest",
      CustomerId: "10",
      AccountNumber: "1313",
      Amount: 100000,
    };
    const expectedActions = [
      {
        type: types.WITHDRAW_INFO,
        payload: "Requested withdraw amount is greater than balance",
      },
    ];

    return store.dispatch(withDrawTheMoney(newCustObj, "")).then(() => {
      
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
describe("Testing withDrawTheMoney method", () => {
  it("withdraw fails becuase account don't exist", () => {
    let store = mockStore(bankAccountsInfo);
    let newCustObj = {
      CustomerName: "for jest",
      CustomerId: "10",
      AccountNumber: "99999",
      Amount: 100000,
    };
    const expectedActions = [
      {
        type: types.WITHDRAW_INFO,
        payload: `No Account exists with given account`,
      },
    ];

    return store.dispatch(withDrawTheMoney(newCustObj, "")).then(() => {
      
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
