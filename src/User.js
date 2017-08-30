import React, { Component } from "react";
import { Row } from "react-bootstrap";
import Axios from "axios";
import PullRequest from "./PullRequest";
import Load from "./Load";
class User extends Component {
  state = {
    loading: true
  };
  render() {
    console.log(this.props);

    const { user } = this.props.match.params;
    const query = "type:pr author:" + user + " -user:" + user;
    const url = "https://api.github.com/search/issues";

    if (this.state.loading) {
      Axios.get(url, {
        params: { q: query }
      })
        .then(response => {
          this.setState({ data: response.data, loading: false });
        })
        .catch(err => {
          console.log(err);
          alert("There is something wrong, open log for more information!");
          this.props.history.push("/");
        });
      return <Load />;
    }
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
