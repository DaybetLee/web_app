import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import { addToObject } from "./../utils/addToObject";
import auth from "../../services/authService";
import { getPolicy, savePolicy } from "../../services/policyService";

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
    agent: {},
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
      // if (policyId === "5f1f12ec38e7835064b60ba7") return;

      const { data: policy } = await getPolicy(policyId);
      const policyholder = policy.policyholder;
      this.setState({
        data: this.mapToViewModel(policy),
        policyholder: this.policyholderModel(policyholder),
      });
    } catch (ex) {
      const policyholderid = this.props.match.params.id;
      this.setState({
        policyholder: {
          _id: policyholderid,
        },
      });
      // if (ex.response && ex.response.status === 404)
      // this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    try {
      const agent = auth.getCurrentUser();
      this.setState({ agent });
      await this.populatePolicy();
    } catch (ex) {}
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
    let newData = addToObject(
      this.state.data,
      "policyholderId",
      this.state.policyholder._id
    );
    newData = addToObject(newData, "companyId", this.state.agent.company);
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
