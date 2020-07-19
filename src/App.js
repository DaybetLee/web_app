import React from "react";
import "./App.css";

import { Route, Switch, Redirect } from "react-router-dom";

import NavBar from "./components/common/navbar";
import Agent from "./components/companyAdmin/agent";
import Policyholder from "./components/agent/policyholder";
import Policy from "./components/policyholder/policy";
import policyholderForm from "./components/agent/policyholderForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import agentForm from "./components/companyAdmin/agentForm";
import NotFound from "./components/notFound";
import PolicyholderPolicy from "./components/agent/policyholderPolicy";
import PolicyholderPolicyForm from "./components/agent/policyholderPolicyForm.jsx";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route
            // temp to /policyholderpolicy2/:id due to conflict
            path="/policyholderpolicy2/:id"
            component={PolicyholderPolicyForm}
          />
          <Route path="/register" exact component={RegisterForm} />
          <Route path="/login" exact component={LoginForm} />
          <Route path="/agent" exact component={Agent} />
          <Route path="/agent/:id" component={agentForm} />
          <Route path="/policyholder" exact component={Policyholder} />

          <Route
            path="/policyholderpolicy/:id"
            component={PolicyholderPolicy}
          />

          <Route path="/policyholder/:id" component={policyholderForm} />
          <Route path="/policy" exact component={Policy} />
          <Route path="/you-shall-not-pass-!" exact component={NotFound} />
          <Redirect from="/" exact to="/login" />
          <Redirect to="/you-shall-not-pass-!" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
