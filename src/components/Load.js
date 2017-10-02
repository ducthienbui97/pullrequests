import React, { Component } from "react";
import Octicon from "react-octicon";
import { Col } from "react-bootstrap";

export default class Load extends Component {
  render() {
    return (
      <Col className="Col">
        <Octicon mega name="sync" />;
      </Col>
    );
  }
}
