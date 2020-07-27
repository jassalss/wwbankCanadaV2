import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllAccounts } from "../actions";
import ReactJson from "react-json-view";
class DisplayAllAccount extends Component {
  componentDidMount() {
    this.props.fetchAllAccounts();
  }
  render() {
    return (
      <div>
        <h3 className="ui center aligned header">All Account Details</h3>
        <h4 className="ui center aligned header">Admin Only</h4>
        <ReactJson src={this.props.allAccountData} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allAccountData: state.bankAccountsInfo.allAccountData,
  };
};
export default connect(mapStateToProps, { fetchAllAccounts })(
  DisplayAllAccount
);
