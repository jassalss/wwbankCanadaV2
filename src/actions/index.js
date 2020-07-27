import {
  SAVE_CUSTOMER,
  DEPOSIT_INFO,
  WITHDRAW_INFO,
  TRANSFER_INFO,
  FETCH_ALL_DATA,
  SINGLE_ACCOUNT,
} from "./types";
import { realTimeDB } from "../firebaseConfig/firebase";
export const saveNewCustomer = (customerObj, otherCurrency) => async (
  dispatch
) => {
  const eventref = realTimeDB.ref(`allAccounts/${customerObj.AccountNumber}`);
  const snapshot = await eventref.once("value");
  var message = "Account Already exists. Please use another Account Number";
  try {
    if (!snapshot.exists()) {
      await realTimeDB
        .ref(`allAccounts/${customerObj.AccountNumber}`)
        .set(customerObj);
      message = `New Account Created Successfully With balance $${customerObj.Balance} CAD ${otherCurrency}`;
    } else {
    }
  } catch (error) {
    console.log("ERR ===", error);
    alert("New Account Creation failed!");
  }
  dispatch({
    type: SAVE_CUSTOMER,
    payload: message,
  });
};
export const depositTheMoney = (customerObj, otherCurrency) => async (
  dispatch
) => {
  const eventref = realTimeDB.ref(`allAccounts/${customerObj.AccountNumber}`);
  const snapshot = await eventref.once("value");
  let payload = `Account with account number ${customerObj.AccountNumber} don't exist`;
  var dateTime = currentDateTime();
  if (snapshot.exists()) {
    let account = snapshot.val();
    let currentBal = parseFloat(account.Balance);
    currentBal += parseFloat(customerObj.Amount);
    account.Balance = currentBal;
    if (account.depositHistory) {
      account.depositHistory += `, ${customerObj.CustomerName} deposited $${customerObj.Amount} CAD ${otherCurrency} in this account at ${dateTime}`;
    } else {
      account.depositHistory = `${customerObj.CustomerName} deposited $${customerObj.Amount} CAD ${otherCurrency} in this account at ${dateTime}`;
    }
    eventref.set(account);
    payload = `Amount $${customerObj.Amount} CAD ${otherCurrency} in account with account number ${customerObj.AccountNumber} by ${customerObj.CustomerName} successfully deposited.`;
  }
  dispatch({
    type: DEPOSIT_INFO,
    payload: payload,
  });
};
export const withDrawTheMoney = (customerObj, otherCurrency) => async (
  dispatch
) => {
  const eventref = realTimeDB.ref(`allAccounts/${customerObj.AccountNumber}`);
  const snapshot = await eventref.once("value");
  let payload = `No Account exists with given account`;
  var dateTime = currentDateTime();
  if (snapshot.exists()) {
    let account = snapshot.val();
    let result = comapreTheAccount(account, customerObj);
    if (result.result) {
      let currentBal = parseFloat(account.Balance);
      let requestBal = parseFloat(customerObj.Amount);
      if (currentBal > 0) {
        if (currentBal - requestBal >= 0) {
          currentBal -= requestBal;
          account.Balance = currentBal;
          eventref.set(account);
          if (account.depositHistory) {
            account.depositHistory += `, ${customerObj.CustomerName} withdraw $${customerObj.Amount} CAD ${otherCurrency} from this account at ${dateTime}`;
          } else {
            account.depositHistory = `${customerObj.CustomerName} withdraw $${customerObj.Amount} CAD ${otherCurrency} from this account at ${dateTime}`;
          }
          payload = `${customerObj.CustomerName} withdraw $${customerObj.Amount} CAD ${otherCurrency} from account with account# ${customerObj.AccountNumber}.`;
        } else {
          payload = "Requested withdraw amount is greater than balance";
        }
      } else {
        payload = "Not enough Balance in the account";
      }
    } else {
      payload = result.message;
    }
  }
  dispatch({
    type: WITHDRAW_INFO,
    payload: payload,
  });
};
export const transferTheMoney = (
  toAccountNum,
  fromAccountnum,
  amount,
  otherCurrency,
  cust_name,
  cust_id
) => async (dispatch) => {
  let payload = "";
  if (await checkAccountExist(toAccountNum)) {
    if (await checkAccountExist(fromAccountnum)) {
      var eventref = realTimeDB.ref(`allAccounts/${fromAccountnum}`);
      var snapshot = await eventref.once("value");
      let FromAccount = snapshot.val();
      let currentBal = parseFloat(FromAccount.Balance);
      let requestBal = parseFloat(amount);
      var dateTime = currentDateTime();
      if (
        FromAccount.CustomerName === cust_name &&
        FromAccount.CustomerId === cust_id
      ) {
        if (toAccountNum !== fromAccountnum) {
          if (currentBal > 0) {
            if (currentBal - requestBal >= 0) {
              currentBal -= requestBal;
              FromAccount.Balance = currentBal;
              eventref.set(FromAccount);
              if (FromAccount.trasferHoster) {
                FromAccount.depositHistory += `, From account with account# ${fromAccountnum} $${amount} CAD ${otherCurrency} deducted for transfer at ${dateTime}`;
              } else {
                FromAccount.depositHistory = `From account with account# ${fromAccountnum} $${amount} CAD ${otherCurrency} deducted for transfer at ${dateTime}`;
              }
              eventref = realTimeDB.ref(`allAccounts/${toAccountNum}`);
              snapshot = await eventref.once("value");
              let ToAccount = snapshot.val();
              let currentBal2 = parseFloat(ToAccount.Balance);
              currentBal2 += requestBal;
              ToAccount.Balance = currentBal2;
              eventref.set(ToAccount);
              payload = `From account# ${fromAccountnum} $${amount} CAD ${otherCurrency} successfully transfer to account# ${toAccountNum}`;
            } else {
              payload = "Requested Transfer amount is greater than balance";
            }
          } else {
            payload = "Not enough Balance in the account";
          }
        } else {
          payload = `To account and from account both are same`;
        }
      } else {
        payload = `Customer Name or Customer Id did not match with provided account number`;
      }
    } else {
      payload = `From account with account# ${fromAccountnum} doesnot exist`;
    }
  } else {
    payload = `To account with account# ${toAccountNum} doesnot exist`;
  }
  dispatch({
    type: TRANSFER_INFO,
    payload: payload,
  });
};
export const fetchAllAccounts = () => async (dispatch) => {
  const eventref = realTimeDB.ref(`allAccounts`);
  const snapshot = await eventref.once("value");
  dispatch({
    type: FETCH_ALL_DATA,
    payload: snapshot.val(),
  });
};
export const fetchSingleAccount = (accountNumber) => async (dispatch) => {
  const eventref = realTimeDB.ref(`allAccounts/${accountNumber}`);
  const snapshot = await eventref.once("value");
  let payload = {};
  if (!snapshot.exists()) {
    payload = { Error: "Account Don't Exist. Try again!" };
  } else {
    payload = snapshot.val();
  }
  dispatch({
    type: SINGLE_ACCOUNT,
    payload,
  });
};
const comapreTheAccount = (objFromDB, userInput) => {
  let message = "";
  let result = false;
  if (objFromDB.AccountNumber === userInput.AccountNumber) {
    if (objFromDB.CustomerId === userInput.CustomerId) {
      if (objFromDB.CustomerName === userInput.CustomerName) {
        result = true;
      } else {
        message =
          "Customer name did not match with provided account number. This is not your account";
      }
    } else {
      message =
        "Customer Id did not match with provided account number. This is not your account";
    }
  } else {
    message = "No account match!";
  }
  return { result, message };
};

const checkAccountExist = async (accountNumber) => {
  const eventref = realTimeDB.ref(`allAccounts/${accountNumber}`);
  const snapshot = await eventref.once("value");
  return await snapshot.exists();
};
const currentDateTime = () => {
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;
  return dateTime;
};
