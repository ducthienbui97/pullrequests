import { FormGroup, FormControl, Col, InputGroup } from "react-bootstrap";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Octicon from "react-octicon";

import icon from "../../assets/Octocat.png";
import "./Home.css"

export default class Home extends Component {
  state = {
    user: ""
  };
  handleChange = (e) => {
    this.setState({ user: e.target.value });
  };
  render() {
    return (
      <Col xs={10} sm={8} md={4} className="Col">
        <img src={icon} alt="logo" />
        <p>Display all pull requests you sent on GitHub!</p>
        <form action={`/${this.state.user}`} method="GET">
          <FormGroup>
            <InputGroup>
              <FormControl
                className="Input"
                type="text"
                value={this.state.user}
                onChange={this.handleChange}
                placeholder="Enter Github username"
              />
              <InputGroup.Addon>
                <Link to={"/" + this.state.user}>
                  <Octicon name="search" />
                </Link>
              </InputGroup.Addon>
            </InputGroup>
          </FormGroup>
          <button type="submit" hidden />
        </form>
      </Col>
    );
  }
}
