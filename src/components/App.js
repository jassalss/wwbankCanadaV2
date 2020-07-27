import React from "react";
import history from "../history";
import { Router, Route, Switch } from "react-router-dom";
import Homepage from "./HomePage";
import NavBar from "./NavBar";
import CreeatAccount from "./CreeatAccount";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import Transfer from "./Transfer";
import DisplayAllAccount from "./DisplayAllAccount";
import CheckBalance from "./CheckBalance";
const App = () => {
  return (
    <div>
      <Router history={history}>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/create-account" exact component={CreeatAccount} />
          <Route path="/deposit" exact component={Deposit} />
          <Route path="/withdraw" exact component={Withdraw} />
          <Route path="/transfer" exact component={Transfer} />
          <Route path="/account" exact component={CheckBalance} />
          <Route path="/allAccunts" exact component={DisplayAllAccount} />
        </Switch>
      </Router>
    </div>
  );
};
export default App;
