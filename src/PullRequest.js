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
    done: false,
    icon: "git-pull-request",
    state: "open"
  };
  render() {
    const { html_url, title, number } = this.props.data;
    const url = this.props.data.url.replace("/issues/", "/pulls/");
    const created_at = new Date(this.props.data.created_at);
    if (!this.state.done)
      Axios.get(url)
        .then(response => {
          const { state, merged, html_url } = response.data;
          const { full_name, owner } = response.data.base.repo;
          this.setState({ html_url, full_name, owner });
          if (merged)
            this.setState({ state: "merged", icon: "git-merge", done: true });
          else this.setState({ state, done: true });
        })
        .catch(err => {
          console.log(err);
        });
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
                <span>&nbsp;#{number} </span>
              </td>
            </tr>
            <tr hidden={!this.state.done}>
              <td>
                to&nbsp;
                <a href={this.state.html_url} target="_blank">
                  {this.state.full_name}
                </a>
                <span>&nbsp;at&nbsp;</span>
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
