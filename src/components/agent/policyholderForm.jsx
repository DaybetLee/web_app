import React from "react";

const policyholderForm = ({ match, history }) => {
  return (
    <div>
      <h1>PolicyholderForm{match.params.id}</h1>
      <button
        className="btn btn-primary"
        onClick={() => history.push("/policyholder")}
      >
        Back
      </button>
    </div>
  );
};
export default policyholderForm;
