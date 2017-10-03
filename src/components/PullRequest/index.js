import React, { Component } from "react";
import { Col } from "react-bootstrap";
import Octicon from "react-octicon";
import githubService from "../../services/GithubService";

import "./styles.css";

export default class PullRequest extends Component {
  state = {
    icon: "git-pull-request",
    state: "",
    htmlUrl: "",
    fullName: "",
    owner: "",
    done: false
  };
  async componentDidMount() {
    const issue = this.props.data;
    try {
      const response = await githubService.getPullRequestInfoByIssue(issue);
      const { state, merged } = response.data;
      const {
        owner,
        "full_name": fullName,
        "html_url": htmlUrl
      } = response.data.base.repo;
      this.setState({ htmlUrl, fullName, owner, done: true });

      if (merged) {
        this.setState({ state: "merged", icon: "git-merge" });
      } else {
        this.setState({ state });
      }
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    const { "html_url": htmlUrl, title, number } = this.props.data;
    return (
      <Col className="PullRequest" xs={10} md={5}>
        <table>
          <tbody>
            <tr>
              <td>
                <Octicon
                  mega
                  name={this.state.icon}
                  className={this.state.state}
                />&nbsp;
                <strong>
                  <a href={htmlUrl} target="_blank">
                    {title}
                  </a>
                </strong>
                <span> #{number} </span>
              </td>
            </tr>
            <tr hidden={!this.state.done}>
              <td>
                <span>to </span>
                <a href={this.state.htmlUrl} target="_blank">
                  {this.state.fullName}
                </a>
                <span> on </span>
                {new Date(this.props.data.created_at).toLocaleDateString()}
              </td>
            </tr>
          </tbody>
        </table>
      </Col>
    );
  }
}
