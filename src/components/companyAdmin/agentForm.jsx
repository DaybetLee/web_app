import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import { getAgent, saveAgent } from "../../services/agentService";

class AgentForm extends Form {
  state = {
    data: {
      name: "",
      email: "",
      password: "",
      mobile: "",
    },
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().required().label("Name"),
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(5).label("Password"),
    mobile: Joi.number().required().label("Mobile"),
  };

  doSubmit = () => {
    saveAgent(this.state.data);
    this.props.history.push("/agent");
  };

  componentDidMount() {
    const agentId = this.props.match.params.id;
    if (agentId === "new") return;

    const agent = getAgent(agentId);
    if (!agent) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(agent) });
  }

  mapToViewModel(agent) {
    return {
      _id: agent._id,
      name: agent.name,
      email: agent.email,
      password: agent.password,
      mobile: agent.mobile,
    };
  }

  render() {
    return (
      <div>
        <h1>Agent</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("mobile", "Mobile")}
          {this.renderBackButton()}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default AgentForm;

// name: Joi.string().required(),
// email: Joi.string()
//   .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
//   .required(),
// password: Joi.string().min(5).required(),
// mobile: Joi.number().min(8).required(),
// companyId: Joi.objectId().required(),
