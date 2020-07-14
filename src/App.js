import React from "react";
import "./App.css";

import Company from "./components/company";
import Agent from "./components/agent";
import Policyholder from "./components/policyholder";

function App() {
  return (
    <main className="container">
      <Company />
      <Agent />
      <Policyholder />
    </main>
  );
}

export default App;
