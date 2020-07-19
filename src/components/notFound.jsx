import React from "react";
import Missing from "../assets/brand/Missing.png";

const NotFound = () => {
  return (
    <div>
      <img src={Missing} className="rounded" alt="" width="100"></img>
      <h1>Page Not Found</h1>
      <span>The requested URL was not found on this server.</span>
    </div>
  );
};

export default NotFound;
