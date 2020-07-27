import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import regeneratorRuntime from "regenerator-runtime";
import { transferTheMoney } from "../../src/actions";
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
describe("Testing transferTheMoney action", () => {
  it("Transfer fails to account don't exist", () => {
    let store = mockStore(bankAccountsInfo);
    let fromAccountnum = "1313";
    let toAccountNum = "9x9x9";
    let amount = 0;
    let otherCurrency = "";
    let cust_name = "for jest";
    let cust_id = "10";
    const expectedActions = [
      {
        type: types.TRANSFER_INFO,
        payload: `To account with account# ${toAccountNum} doesnot exist`,
      },
    ];

    return store
      .dispatch(
        transferTheMoney(
          toAccountNum,
          fromAccountnum,
          amount,
          otherCurrency,
          cust_name,
          cust_id
        )
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
describe("Testing transferTheMoney action", () => {
  it("Transfer fails due worng customer Id", () => {
    let store = mockStore(bankAccountsInfo);
    let fromAccountnum = "1313";
    let toAccountNum = "1314";
    let amount = 0;
    let otherCurrency = "";
    let cust_name = "for jest";
    let cust_id = "100";
    const expectedActions = [
      {
        type: types.TRANSFER_INFO,
        payload: `Customer Name or Customer Id did not match with provided account number`,
      },
    ];

    return store
      .dispatch(
        transferTheMoney(
          toAccountNum,
          fromAccountnum,
          amount,
          otherCurrency,
          cust_name,
          cust_id
        )
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
describe("Testing transferTheMoney action", () => {
  it("Transfer money happy path", () => {
    let store = mockStore(bankAccountsInfo);
    let fromAccountnum = "1313";
    let toAccountNum = "1314";
    let amount = 2;
    let otherCurrency = "";
    let cust_name = "for jest";
    let cust_id = "10";
    const expectedActions = [
      {
        type: types.TRANSFER_INFO,
        payload: `From account# ${fromAccountnum} $${amount} CAD ${otherCurrency} sccuessfully transfer to acount# ${toAccountNum}`,
      },
    ];

    return store
      .dispatch(
        transferTheMoney(
          toAccountNum,
          fromAccountnum,
          amount,
          otherCurrency,
          cust_name,
          cust_id
        )
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
describe("Testing transferTheMoney action", () => {
  it("Transfer fails due both accounts are same", () => {
    let store = mockStore(bankAccountsInfo);
    let fromAccountnum = "1313";
    let toAccountNum = "1313";
    let amount = 2;
    let otherCurrency = "";
    let cust_name = "for jest";
    let cust_id = "10";
    const expectedActions = [
      {
        type: types.TRANSFER_INFO,
        payload: `To account and from account both are same`,
      },
    ];

    return store
      .dispatch(
        transferTheMoney(
          toAccountNum,
          fromAccountnum,
          amount,
          otherCurrency,
          cust_name,
          cust_id
        )
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
describe("Testing transferTheMoney action", () => {
  it("Transfer fails requested amount is greater than balance", () => {
    let store = mockStore(bankAccountsInfo);
    let fromAccountnum = "1313";
    let toAccountNum = "1314";
    let amount = 100000;
    let otherCurrency = "";
    let cust_name = "for jest";
    let cust_id = "10";
    const expectedActions = [
      {
        type: types.TRANSFER_INFO,
        payload: "Requested Transfer amount is greater than balance",
      },
    ];

    return store
      .dispatch(
        transferTheMoney(
          toAccountNum,
          fromAccountnum,
          amount,
          otherCurrency,
          cust_name,
          cust_id
        )
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
