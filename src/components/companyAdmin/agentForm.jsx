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

  doSubmit = async () => {
    await saveAgent(this.state.data);
    this.props.history.push("/agent");
  };

  async populateAgent() {
    try {
      const agentId = this.props.match.params.id;
      if (agentId === "new") return;
      const { data: agent } = await getAgent(agentId);
      this.setState({ data: this.mapToViewModel(agent) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateAgent();
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
          {this.renderButton("Save")}
        </form>
        {this.renderBackButton()}
      </div>
    );
  }
}

export default AgentForm;
