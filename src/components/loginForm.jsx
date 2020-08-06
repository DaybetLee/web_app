import React from "react";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import Form from "./common/form";
import Brand from "../assets/brand/IPM Brand.png";
import auth from "./../services/authService";

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
      await auth.login(data.email, data.password);
      const user = auth.getCurrentUser();
      if (user.isAgent) window.location = "/policyholder";
      else if (user.isCompanyAdmin) window.location = "/agent";
      else if (user.isUser) window.location = "/policy";
      else if (user.isSuperadmin) window.location = "/allPolicyholder";
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
