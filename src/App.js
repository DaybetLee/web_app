import { Route, Switch, Redirect } from "react-router-dom";
import React, { Component } from "react";
import auth from "./services/authService";
import "./App.css";
import NavBar from "./components/common/navbar";
import Agent from "./components/companyAdmin/agent";
import Policyholder from "./components/agent/policyholder";
import Policy from "./components/policyholder/policy";
import policyholderForm from "./components/agent/policyholderForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import SuccessRegisterForm from "./components/successRegisterForm";
import AgentForm from "./components/companyAdmin/agentForm";
import NotFound from "./components/notFound";
import PolicyholderPolicy from "./components/agent/policyholderPolicy";
import PolicyholderPolicyForm from "./components/agent/policyholderPolicyForm.jsx";
import Logout from "./components/logout";
import Resign from "./components/companyAdmin/resign";
import PolicyApproval from "./components/policyholder/policyApproval";
import AllPolicyholder from "./components/superadmin/allPolicyholder";
import OverallPolicy from "./components/superadmin/overallPolicy";

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const user = auth.getCurrentUser();
      this.setState({ user });
    } catch (ex) {}
  }
  render() {
    return (
      <React.Fragment>
        <NavBar user={this.state.user} />
        <main className="container">
          <Switch>
            <Route
              path="/policyholderpolicy2/:id"
              component={PolicyholderPolicyForm}
            />
            <Route path="/register" exact component={RegisterForm} />
            <Route path="/login" exact component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route
              user={this.state.user}
              path="/agent"
              exact
              component={Agent}
            />
            <Route path="/agent/:id" component={AgentForm} />
            <Route path="/resign/:id" component={Resign} />
            <Route path="/policyholder" exact component={Policyholder} />
            <Route
              path="/policyholderpolicy/:id"
              component={PolicyholderPolicy}
            />
            <Route path="/policyholder/:id" component={policyholderForm} />
            <Route path="/policy" exact component={Policy} />
            <Route path="/allPolicyholder" exact component={AllPolicyholder} />
            <Route path="/overallpolicy/:id" exact component={OverallPolicy} />
            <Route path="/policy/approval" exact component={PolicyApproval} />
            <Route path="/you-shall-not-pass-!" exact component={NotFound} />
            <Redirect from="/" exact to="/login" />
            <Route
              path="/register-successful-redirect"
              exact
              component={SuccessRegisterForm}
            />
            <Redirect to="/you-shall-not-pass-!" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}
export default App;
