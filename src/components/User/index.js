import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import PullRequest from "../PullRequest/index";
import Load from "../Load";
import githubService from "../../services/GithubService";
import "./styles.css";

export default class User extends Component {
  state = {
    loading: true
  };

  handleError(err) {
    let errorMessage = "There is something wrong, open log for more information!";
    if (err.response &&
        err.response.data &&
        err.response.data.errors &&
        err.response.data.errors.length > 0
    ) {
      let errors = err.response.data.errors;
      errorMessage = errors.length > 1
        ? errors.map((e) => "- " + e.message).join("\r\n")
        : errors[0].message;
    }

    console.log(err);
    alert(errorMessage);
  }

  async componentDidMount() {
    const { user } = this.props.match.params;

    try {
      const response = await githubService.getIssues(user);
      this.setState({ data: response.data, loading: false });
    } catch (err) {
      this.handleError(err);
      this.props.history.push("/");
    }
  }
  getUserData() {
    let userData = {}
    const { items } = this.state.data;
    if(items.length > 0) {
      userData = items[0].user
    }    
    return userData
  }
  render() {
    console.log(this.props);
    if (this.state.loading) { return (<Load />); };
    const { items } = this.state.data;
    const { user } = this.props.match.params;
    const userData = this.getUserData()
    return items.length === 0
      ? (
        <Col className="Col Empty-PR" xs={10} sm={8} md={4}>
          There are <strong>no pull requests</strong> associated with user <strong>{user}</strong>
        </Col>
      )
      : (
        <div>
          <Row>
            <Col className="user-info" xs={10} md={5}>
              <img className="user-avatar" src={userData.avatar_url} alt={`${user} avatar`} />
              <span className="user-name">
                PRs by <a href={`https://github.com/${user}`}>@{user}</a>
              </span>
            </Col>
          </Row>
          <Row>
            {this.state.data.items.map((pullrequest, idx) => {
              return <PullRequest data={pullrequest} key={idx} />;
            })}
          </Row>
        </div>
      );
  }
}
