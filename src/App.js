import React, { Component } from "react";
import { Jumbotron } from "react-bootstrap";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import User from "./User";
class App extends Component {
  render() {
    return (
      <Jumbotron className="Cover">
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

export default App;
