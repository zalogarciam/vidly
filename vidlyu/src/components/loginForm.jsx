import React, { Component } from "react";
import { createRef } from "react";
import { useRef } from "react";

class LoginForm extends Component {
  username = createRef();

  state = {
    account: { username: "", password: "" },
  };
  //   componentDidMount() {
  //     this.username.current.focus();
  //   }

  handleSubmit = (e) => {
    e.preventDefault();
    // Call the server
    const username = this.username.current?.value;
    console.log("Submitted:" + username);
  };

  handleChange = ({ target: input }) => {
    const account = { ...this.state.account };
    account[input.id] = input.value;
    this.setState({ account });
  };

  render() {
    const { account } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              value={account.username}
              onChange={this.handleChange}
              autoFocus
              ref={this.username}
              id="username"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              value={account.password}
              onChange={this.handleChange}
              id="password"
              type="password"
              className="form-control"
            />
          </div>
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
