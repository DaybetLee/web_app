import React from "react";
import { Link } from "react-router-dom";

const NotificationBtn = ({ policyCount }) => {
  if (policyCount.length === 0)
    return (
      <button type="button" className="btn btn-primary pull-right" disabled>
        Notifications{" "}
        <span className="badge badge-light">{policyCount.length}</span>
      </button>
    );
  else
    return (
      <Link to="/policy/approval" className="btn btn-primary pull-right">
        Notifications{" "}
        <span className="badge badge-light">{policyCount.length}</span>
      </Link>
    );
};

export default NotificationBtn;
