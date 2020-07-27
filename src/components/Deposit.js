import React, { Component } from "react";
import { depositTheMoney } from "../actions";
import { connect } from "react-redux";
import Converter from "../Converter";
class Deposit extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    let CustomerName = event.target.customerName.value;
    let CustomerId = event.target.customerId.value;
    let AccountNumber = event.target.accountNumber.value;
    let Amount = event.target.amount.value;
    let currency = event.target.currency.value;
    let otherCurrency = "";
    if (Amount < 0) {
      alert("For deposit amount should more than 0");
      return;
    }
    if (currency !== "CAD") {
      otherCurrency = ` = $${Amount} ${currency}`;
      Amount = Converter(Amount, currency);
    }
    let objectToBeSaved = {
      CustomerName,
      CustomerId,
      AccountNumber,
      Amount,
    };
    this.props.depositTheMoney(objectToBeSaved, otherCurrency);
  };
  render() {
    if (this.props.depositInfo) {
      alert(this.props.depositInfo);
      window.location.reload();
    }
    return (
      <div>
        <h3 className="ui center aligned header">Deposit</h3>
        <div className="ui centered grid">
          <div className="ten wide column">
            <form className="ui form" onSubmit={this.handleSubmit}>
              <div className="field">
                <select class="ui dropdown" required name="currency">
                  <option value="">Select Currency</option>
                  <option value="CAD">CAD</option>
                  <option value="USD">USD</option>
                  <option value="MXN">MXN</option>
                </select>
              </div>
              <div className="field">
                <label>Amount</label>
                <input
                  type="number"
                  name="amount"
                  step="0.001"
                  placeholder="Amount (Input is Number not letter)"
                />
              </div>
              <div className="field">
                <label>Account Number</label>
                <input
                  required
                  type="number"
                  name="accountNumber"
                  placeholder="Account Number (Input is Number not letter)"
                />
              </div>
              <div className="field">
                <label>Customer Name</label>
                <input
                  required
                  type="text"
                  name="customerName"
                  placeholder="Customer Name"
                />
              </div>
              <div className="field">
                <label>Customer ID</label>
                <input
                  required
                  type="number"
                  name="customerId"
                  placeholder="Customer ID (Input is Number not letter)"
                />
              </div>
              <button className="ui button" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    depositInfo: state.bankAccountsInfo.depositInfo,
  };
};
export default connect(mapStateToProps, { depositTheMoney })(Deposit);
