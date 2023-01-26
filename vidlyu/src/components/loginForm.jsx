import React, { Component } from "react";
import { createRef } from "react";
import { useRef } from "react";
import Input from "./common/input";

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
          <Input
            name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChange}
          ></Input>
          <Input
            name="password"
            value={account.password}
            label="Password"
            onChange={this.handleChange}
          ></Input>
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
