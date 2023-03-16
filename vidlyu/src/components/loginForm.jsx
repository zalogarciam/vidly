import React, { Component } from "react";
import { createRef } from "react";
import { useRef } from "react";
import Input from "./common/input";
import Joi from "joi-browser";
import Form from "./common/form";

class LoginForm extends Form {
  username = createRef();

  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = () => {
    // Call the server
    console.log("Submitted");
  };

  render() {
    const { data, errors } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={data.username}
            label="Username"
            onChange={this.handleChange}
            error={errors.username}
          ></Input>
          <Input
            name="password"
            value={data.password}
            label="Password"
            onChange={this.handleChange}
            error={errors.password}
          ></Input>
          <button className="btn btn-primary" disabled={this.validate()}>
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
