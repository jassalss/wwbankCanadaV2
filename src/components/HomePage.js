import React, { Component } from "react";

class Homepage extends Component {
  render() {
    return (
      <div className="ui centered grid">
        <div className="ten wide column">
          <h3 class="ui center aligned header">
            This is React + Redux + Firebase web app. This web app is MVP of the
            first sprint (Not a complete product. More features can be added in
            next iterations). All features in the first sprint are implemented
            by value, means priority was to satisfy the test cases defined in
            coding challenges.
          </h3>
          <h3 class="ui center aligned header">
            This web app is a solution to Option B. It is react app in
            javascript. In this app, Redux is used for state management. Jest is
            used for testing. The app is passing all test cases defined in the
            coding challenge. For your convenience test data for test case# 4 is
            already initialized in the database. Please test further.
          </h3>
          <h3 class="ui center aligned header">
            Kindly check the source code at the following address at GitHub.
            More instructions are on GitHub ReadMe.
          </h3>
          <h4 class="ui center aligned header">
            <a href="https://github.com/jassalss/wwbankCanadaV2">Soruce code</a>
          </h4>
        </div>
      </div>
    );
  }
}

export default Homepage;
