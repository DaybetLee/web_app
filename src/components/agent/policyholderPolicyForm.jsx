import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import { getPolicy, savePolicy } from "../../services/policyService";

class PolicyholderPolicyForm extends Form {
  state = {
    data: {
      name: "",
      inforce: "",
    },
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().required().label("Name"),
    inforce: Joi.boolean().required().label("Inforce"),
  };

  componentDidMount() {
    const policyId = this.props.match.params.id;
    if (policyId === "new") return;

    const policy = getPolicy(policyId);
    if (!policy) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(policy) });
  }

  mapToViewModel(policy) {
    return {
      _id: policy._id,
      name: policy.name,
      inforce: policy.inforce,
    };
  }

  // submit button temp in-force
  doSubmit = () => {
    savePolicy(this.state.data);
    this.props.history.push("/policyholderpolicy/123");
  };

  render() {
    return (
      <div>
        <h1>Policyholder</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("inforce", "Inforce")}
          {this.renderBackButton()}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default PolicyholderPolicyForm;
