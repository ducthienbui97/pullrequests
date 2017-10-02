import React, { Component } from "react";
import { Row } from "react-bootstrap";
import PullRequest from "./PullRequest";
import Load from "./Load";
import githubService from "../services/GithubService";

class User extends Component {
  state = {
    loading: true
  };
  async componentDidMount() {
    const { user } = this.props.match.params;

    try {
      const response = await githubService.getIssues(user);
      this.setState({ data: response.data, loading: false });
    } catch(err) {
      console.log(err);
      alert("There is something wrong, open log for more information!");
      this.props.history.push("/");
    }
  }
  render() {
    console.log(this.props);
    if (this.state.loading) { return (<Load />); };
    return (
      <Row>
        {this.state.data.items.map((pullrequest, idx) => {
          return <PullRequest data={pullrequest} key={idx} />;
        })}
      </Row>
    );
  }
}
export default User;
