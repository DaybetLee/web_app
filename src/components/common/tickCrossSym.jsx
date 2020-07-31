import React from "react";

const TickCrossSym = (props) => {
  let classes = "fa fa-check";
  if (!props.true) classes = "fa fa-times";
  return <i className={classes} aria-hidden="true"></i>;
};

export default TickCrossSym;
