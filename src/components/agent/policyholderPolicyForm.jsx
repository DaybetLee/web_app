import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import { getPolicy, savePolicy } from "../../services/policyService";
import { addToObject } from "./../utils/addToObject";

class PolicyholderPolicyForm extends Form {
  state = {
    data: {
      name: "",
      inforce: "",
    },
    policyholder: {
      _id: "",
      name: "",
    },
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().required().label("Name"),
    inforce: Joi.boolean().required().label("Inforce"),
  };

  async populatePolicy() {
    try {
      const policyId = this.props.match.params.id;
      if (policyId === "new") return;

      const { data: policy } = await getPolicy(policyId);
      const policyholder = policy.policyholder;
      this.setState({
        data: this.mapToViewModel(policy),
        policyholder: this.policyholderModel(policyholder),
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populatePolicy();
  }

  mapToViewModel(policy) {
    return {
      _id: policy._id,
      name: policy.name,
      inforce: policy.inforce,
    };
  }

  policyholderModel(policyholder) {
    return {
      _id: policyholder._id,
      name: policyholder.name,
    };
  }

  // submit button temp in-force
  doSubmit = async () => {
    console.log(this.state.data);
    const newData = addToObject(
      this.state.data,
      "policyholderId",
      this.state.policyholder._id
    );
    console.log(newData);
    await savePolicy(newData);

    this.props.history.push(
      "/policyholderpolicy/" + this.state.policyholder._id
    );
  };

  render() {
    return (
      <div>
        <h1>{this.state.policyholder.name}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("inforce", "Inforce")}
          {this.renderButton("Save")}
        </form>
        {this.renderBackButton()}
      </div>
    );
  }
}

export default PolicyholderPolicyForm;
