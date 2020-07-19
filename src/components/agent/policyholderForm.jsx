import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import {
  getPolicyholder,
  savePolicyholder,
} from "../../services/policyholderService";

class PolicyholderForm extends Form {
  state = {
    data: {
      name: "",
      email: "",
      mobile: "",
      nric: "",
    },
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().required().label("Name"),
    email: Joi.string().required().email().label("Email"),
    mobile: Joi.number().required().label("Mobile"),
    nric: Joi.string().min(9).required().label("Nric"),
  };

  doSubmit = () => {
    savePolicyholder(this.state.data);
    this.props.history.push("/policyholder");
  };

  componentDidMount() {
    const policyholderId = this.props.match.params.id;
    if (policyholderId === "new") return;

    const policyholder = getPolicyholder(policyholderId);
    if (!policyholder) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(policyholder) });
  }

  mapToViewModel(policyholder) {
    return {
      _id: policyholder._id,
      name: policyholder.name,
      email: policyholder.email,
      mobile: policyholder.mobile,
      nric: policyholder.nric,
    };
  }

  render() {
    return (
      <div>
        <h1>Policyholder</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("email", "Email")}
          {this.renderInput("mobile", "Mobile")}
          {this.renderInput("nric", "Nric")}
          {this.renderBackButton()}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default PolicyholderForm;

// name: Joi.string().required(),
// email: Joi.string()
//   .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
//   .required(),
// nric: Joi.string().min(9).required(),
// mobile: Joi.number().min(8).required(),
// agentId: Joi.objectId().required(),
