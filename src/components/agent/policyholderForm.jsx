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

  doSubmit = async () => {
    await savePolicyholder(this.state.data);
    this.props.history.push("/policyholder");
  };

  async populatePolicyholder() {
    try {
      const policyholderId = this.props.match.params.id;
      if (policyholderId === "new") return;
      const { data: policyholder } = await getPolicyholder(policyholderId);
      this.setState({ data: this.mapToViewModel(policyholder) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populatePolicyholder();
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
          {this.renderButton("Save")}
        </form>
        {this.renderBackButton()}
      </div>
    );
  }
}

export default PolicyholderForm;
