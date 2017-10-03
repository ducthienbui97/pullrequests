import React from "react";
import { Jumbotron } from "react-bootstrap";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import Home from "../Home/index";
import User from "../User/index";
import "./styles.css";

const App = () => (
  <Jumbotron className="Cover">
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/:user" component={User} />
      </Switch>
    </BrowserRouter>
  </Jumbotron>
);

export default App;
