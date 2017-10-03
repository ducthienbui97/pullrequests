import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import '../assets/user.css'
import Axios from "axios";
import PullRequest from "./PullRequest";
import Load from "./Load";

class User extends Component {
  state = {
    loading: true
  };
  async componentDidMount() {
    const { user } = this.props.match.params;
    const query = "type:pr author:" + user + " -user:" + user;
    const url = "https://api.github.com/search/issues";

    try {
      const response = await Axios.get(url, {
        params: { q: query }
      });
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
    const { items } = this.state.data;
    const { user } = this.props.match.params;    
    return items.length === 0 
      ? (
          <Col className="Col Empty-PR" xs={10} sm={8} md={4}>
            There are <strong>no pull requests</strong> associated with user <strong>{user}</strong>
          </Col>
        )
      : (
          <Row>
            {this.state.data.items.map((pullrequest, idx) => {
              return <PullRequest data={pullrequest} key={idx} />;
            })}
          </Row>
        );
  }
}
export default User;
