import React, { Component } from "react";
import { saveNewCustomer } from "../actions";
import { connect } from "react-redux";
import Converter from "../Converter";
class CreeatAccount extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    let CustomerName = event.target.customerName.value;
    let CustomerId = event.target.customerId.value;
    let AccountNumber = event.target.accountNumber.value;
    let Balance = event.target.balance.value;
    let currency = event.target.currency.value;
    if (Balance === "") {
      Balance = 0;
    }
    let otherCurrency = "";
    if (currency !== "CAD") {
      otherCurrency = ` = $${Balance} ${currency}`;
      Balance = Converter(Balance, currency);
    }
    let objectToBeSaved = {
      CustomerName,
      CustomerId,
      AccountNumber,
      Balance,
    };
    this.props.saveNewCustomer(objectToBeSaved, otherCurrency);
  };
  render() {
    if (this.props.submitedMessage) {
      alert(this.props.submitedMessage);
      window.location.reload();
    }
    return (
      <div>
        <h3 className="ui center aligned header">Create Customer</h3>
        <h4 className="ui center aligned header">Admin Only</h4>
        <div className="ui centered grid">
          <div className="ten wide column">
            <form className="ui form" onSubmit={this.handleSubmit}>
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
                <select class="ui dropdown" required name="currency">
                  <option value="">Select Currency</option>
                  <option value="CAD">CAD</option>
                  <option value="USD">USD</option>
                  <option value="MXN">MXN</option>
                </select>
              </div>
              <div className="field">
                <label>Initial Balance</label>
                <input
                  type="number"
                  name="balance"
                  step="0.001"
                  placeholder="Initial Balance (Input is Number not letter)"
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
    submitedMessage: state.bankAccountsInfo.savingMessage,
  };
};
export default connect(mapStateToProps, { saveNewCustomer })(CreeatAccount);
