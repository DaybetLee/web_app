import React from "react";
import "./App.css";

import { Route, Switch, Redirect } from "react-router-dom";

import NavBar from "./components/common/navbar";
import Agent from "./components/companyAdmin/agent";
import Policyholder from "./components/agent/policyholder";
import Policy from "./components/policyholder/policy";
import UpdateForm from "./components/companyAdmin/updateForm";
import policyholderForm from "./components/agent/policyholderForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/register" exact component={RegisterForm} />
          <Route path="/login" exact component={LoginForm} />
          <Route path="/agent" exact component={Agent} />
          <Route path="/agent/:id" component={UpdateForm} />
          <Route path="/policyholder" exact component={Policyholder} />
          <Route path="/policyholder/:id" component={policyholderForm} />
          <Route path="/policy" exact component={Policy} />
          <Redirect from="/" exact to="/login" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
