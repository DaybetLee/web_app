import React from "react";
import Logo from "../../assets/brand/IPM Logo.png";

const Navbar = ({ totalCounters }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <span className="navbar-brand mb-0 h1">
        <img src={Logo} alt="" className="img-fluid" width="30"></img>IPM
      </span>
    </nav>
  );
};

export default Navbar;
