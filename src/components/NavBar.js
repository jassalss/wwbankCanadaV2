import React, { Component } from "react";
import { NavLink } from "react-router-dom";
class NavBar extends Component {
  state = { active: "active item" };
  render() {
    return (
      <div className="ui secondary pointing menu">
        <NavLink exact to="/" className="item">
          Home
        </NavLink>
        <NavLink to="/create-account" className="item">
          Create Account
        </NavLink>
        <NavLink to="/deposit" className="item">
          Deposit
        </NavLink>
        <NavLink to="/withdraw" className="item">
          Withdraw
        </NavLink>
        <NavLink to="/transfer" className="item">
          Transfer
        </NavLink>
        <NavLink to="/account" className="item">
          Check Balance
        </NavLink>
        <NavLink to="/allAccunts" className="item">
          Display All Accounts
        </NavLink>
      </div>
    );
  }
}

export default NavBar;
