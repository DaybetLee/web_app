import React from "react";

const Select = ({ name, label, options, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Select className="form-control" {...rest} name={name} id={name}>
        {/* <option value="" /> */}
        {/* <option>true</option>
        <option>false</option> */}
      </Select>
      {error && <div className="alert alert-danger ">{error}</div>}
    </div>
  );
};

export default Select;
