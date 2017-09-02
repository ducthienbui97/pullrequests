import React, { Component } from "react";
import { Col } from "react-bootstrap";
import Axios from "axios";
import Octicon from "react-octicon";
const style = {
  border: "1px solid black",
  margin: "auto",
  marginTop: "1em",
  borderRadius: "5px",
  fontSize: "1.2em"
};

const tableStyle = {
  textAlign: "left",
  height: "5em"
};
class PullRequest extends Component {
  state = {
    icon: "git-pull-request"
  };
  componentDidMount() {
    const url = this.props.data.url.replace("/issues/", "/pulls/");
    Axios.get(url)
      .then(response => {
        const { state, merged } = response.data;
        const { full_name, owner, html_url } = response.data.base.repo;
        this.setState({ html_url, full_name, owner, done: true });
        if (merged) this.setState({ state: "merged", icon: "git-merge" });
        else this.setState({ state });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    const { html_url, title, number } = this.props.data;
    const created_at = new Date(this.props.data.created_at);
    return (
      <Col className="Col" xs={10} md={5} style={style}>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <td>
                <Octicon
                  mega
                  name={this.state.icon}
                  className={this.state.state}
                />&nbsp;
                <strong>
                  <a href={html_url} target="_blank">
                    {title}
                  </a>
                </strong>
                <span> #{number} </span>
              </td>
            </tr>
            <tr hidden={!this.state.done}>
              <td>
                <span>to </span>
                <a href={this.state.html_url} target="_blank">
                  {this.state.full_name}
                </a>
                <span> on </span>
                {created_at.toLocaleDateString()}
              </td>
            </tr>
          </tbody>
        </table>
      </Col>
    );
  }
}

export default PullRequest;
