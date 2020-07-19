import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import Brand from "../assets/brand/IPM Brand.png";
import { Link } from "react-router-dom";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },

    errors: {},
  };

  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  dosubmit = () => {
    console.log("Submitted");
  };

  render() {
    return (
      <div>
        <h1>
          Login
          <img
            src={Brand}
            className="rounded float-right"
            alt=""
            width="280"
          ></img>
        </h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
        Don't have an account? <Link to={`/register/`}>Register Here</Link>
      </div>
    );
  }
}

export default LoginForm;
