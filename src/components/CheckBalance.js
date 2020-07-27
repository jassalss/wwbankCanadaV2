import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleAccount } from "../actions";
import ReactJson from "react-json-view";
class CheckBalance extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.fetchSingleAccount(event.target.accountNumber.value);
  };
  render() {
    return (
      <div>
        <h3 className="ui center aligned header">Account Details</h3>
        <h4 className="ui center aligned header">Admin Only</h4>
        <div className="ui centered grid">
          <div className="ten wide column">
            <form className="ui form" onSubmit={this.handleSubmit}>
              <div className="field">
                <label>Account Number</label>
                <input
                  required
                  type="number"
                  step="0.001"
                  name="accountNumber"
                  placeholder="Customer Name"
                />
              </div>
              <button className="ui button" type="submit">
                Submit
              </button>
            </form>
            <ReactJson src={this.props.singleAccount} />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    singleAccount: state.bankAccountsInfo.singleAccount,
  };
};
export default connect(mapStateToProps, { fetchSingleAccount })(CheckBalance);
