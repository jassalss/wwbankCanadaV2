import {
  SAVE_CUSTOMER,
  DEPOSIT_INFO,
  WITHDRAW_INFO,
  FETCH_ALL_DATA,
  TRANSFER_INFO,
  SINGLE_ACCOUNT,
} from "../actions/types";
const INTIAL_STATE = {
  savingMessage: "",
  depositInfo: "",
  withDrawInfo: "",
  trasferInfo: "",
  allAccountData: { name: "Simer" },
  singleAccount: {},
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_CUSTOMER:
      return { ...state, savingMessage: action.payload };
    case DEPOSIT_INFO:
      return { ...state, depositInfo: action.payload };
    case WITHDRAW_INFO:
      return { ...state, withDrawInfo: action.payload };
    case TRANSFER_INFO:
      return { ...state, trasferInfo: action.payload };
    case FETCH_ALL_DATA:
      return { ...state, allAccountData: action.payload };
    case SINGLE_ACCOUNT:
      return { ...state, singleAccount: action.payload };
    default:
      return state;
  }
};
