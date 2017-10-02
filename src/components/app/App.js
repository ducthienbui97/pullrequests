import React, { Component } from "react";
import { Jumbotron } from "react-bootstrap";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import Home from "../home/Home";
import User from "../user/User";
import "./App.css";

export default class App extends Component {
  render() {
    return (
      <Jumbotron>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/:user" component={User} />
          </Switch>
        </BrowserRouter>
      </Jumbotron>
    );
  }
}
