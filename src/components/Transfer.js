import React, { Component } from "react";
import { connect } from "react-redux";
import { transferTheMoney } from "../actions";
import Converter from "../Converter";
class Transfer extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    let fromAccount = event.target.fromaccountNumber.value;
    let toAccount = event.target.toaccountNumber.value;
    let trasnferAmount = event.target.amount.value;
    let currency = event.target.currency.value;
    let CustomerName = event.target.customerName.value;
    let CustomerId = event.target.customerId.value;
    let otherCurrency = "";
    if (trasnferAmount < 0) {
      alert("Transfer amount should more than 0");
      return;
    }
    if (currency !== "CAD") {
      otherCurrency = ` = $${trasnferAmount} ${currency}`;
      trasnferAmount = Converter(trasnferAmount, currency);
    }
    this.props.transferTheMoney(
      toAccount,
      fromAccount,
      trasnferAmount,
      otherCurrency,
      CustomerName,
      CustomerId
    );
  };
  render() {
    if (this.props.trasferInfo) {
      alert(this.props.trasferInfo);
      window.location.reload();
    }
    return (
      <div>
        <h3 className="ui center aligned header">Transfer Money</h3>
        <div className="ui centered grid">
          <div className="ten wide column">
            <form className="ui form" onSubmit={this.handleSubmit}>
              <div className="field">
                <select className="ui dropdown" required name="currency">
                  <option value="">Select Currency</option>
                  <option value="CAD">CAD</option>
                  <option value="USD">USD</option>
                  <option value="MXN">MXN</option>
                </select>
              </div>
              <div className="field">
                <label>Trasfer Amount</label>
                <input
                  type="number"
                  name="amount"
                  step="0.001"
                  placeholder="Amount for transfer"
                />
              </div>
              <div className="field">
                <label>From Account</label>
                <input
                  required
                  type="number"
                  name="fromaccountNumber"
                  placeholder="From Account"
                />
              </div>
              <div className="field">
                <label>To Account</label>
                <input
                  required
                  type="number"
                  name="toaccountNumber"
                  placeholder="To Account"
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
    trasferInfo: state.bankAccountsInfo.trasferInfo,
  };
};
export default connect(mapStateToProps, { transferTheMoney })(Transfer);
