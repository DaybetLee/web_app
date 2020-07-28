import React from "react";
import { Link } from "react-router-dom";
import Form from "./common/form";

class SuccessRegisterForm extends Form {
  render() {
    return (
      <div className="jumbotron">
        <h1>Congratulations</h1>
        <p>You have successfully registered</p>

        <Link
          to="/policy"
          className="btn btn-primary"
          style={{ marginBottom: 20 }}
        >
          Enter
        </Link>
      </div>
    );
  }
}

export default SuccessRegisterForm;
