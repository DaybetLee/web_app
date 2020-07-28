import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import Brand from "../assets/brand/IPM Brand.png";
import { Link } from "react-router-dom";
import { login } from "./../services/authService";
import jwtDecode from "jwt-decode";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },

    errors: {},
  };

  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const { data: jwt } = await login(data.email, data.password);
      localStorage.setItem("token", jwt);
      const user = jwtDecode(jwt);
      if (user.isAgent) window.location = "/policyholder";
      else if (user.isCompanyAdmin) window.location = "/agent";
      else if (user.isUser) window.location = "/policy";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
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
