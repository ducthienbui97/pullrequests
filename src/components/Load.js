import React, { Component } from "react";
import Octicon from "react-octicon";
import { Col } from "react-bootstrap";

class Load extends Component {
  render() {
    return (
      <Col className="Col">
        <Octicon mega name="sync" />
      </Col>
    );
  }
}

export default Load;
