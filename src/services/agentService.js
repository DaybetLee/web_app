import * as companyAPI from "./companyService";

const agents = [
  {
    policyholder: [
      "5f09a9e22882ec58b02e9171",
      "5f09a9cc2882ec58b02e9172",
      "5f09a9e22882ec58b02e9173",
      "5f09a9e22882ec58b02e9174",
      "5f09a9e22882ec58b02e9175",
      "5f09a9e22882ec58b02e9176",
      "5f09a9e22882ec58b02e9177",
      "5f09a9e22882ec58b02e9178",
      "5f09a9e22882ec58b02e9179",
    ],
    isAgent: true,
    _id: "5f09a9af2882ec58b02e9171",
    name: "agent1",
    email: "agent1@aia.com",
    password: "$2b$10$4t9F58s6PDjdQTJwhbfIvu3E/.G6H06MTEXT/wrU0AZWIKIpL3cma",
    mobile: 12345678,
    company: { _id: "5f09a9972882ec58b02e916e", name: "AIA" },
    __v: 0,
  },
  {
    policyholder: [],
    isAgent: true,
    _id: "5f09a9af2882ec58b02e9172",
    name: "agent2",
    email: "agent2@aia.com",
    password: "$2b$10$4t9F58s6PDjdQTJwhbfIvu3E/.G6H06MTEXT/wrU0AZWIKIpL3cma",
    mobile: 12345678,
    company: { _id: "5f09a9972882ec58b02e916e", name: "AIA" },
    __v: 0,
  },
  {
    policyholder: [],
    isAgent: true,
    _id: "5f09a9af2882ec58b02e9173",
    name: "agent3",
    email: "agent3@aia.com",
    password: "$2b$10$4t9F58s6PDjdQTJwhbfIvu3E/.G6H06MTEXT/wrU0AZWIKIpL3cma",
    mobile: 12345678,
    company: { _id: "5f09a9972882ec58b02e916e", name: "AIA" },
    __v: 0,
  },
  {
    policyholder: [],
    isAgent: true,
    _id: "5f09a9af2882ec58b02e9174",
    name: "agent4",
    email: "agent4@aia.com",
    password: "$2b$10$4t9F58s6PDjdQTJwhbfIvu3E/.G6H06MTEXT/wrU0AZWIKIpL3cma",
    mobile: 12345678,
    company: { _id: "5f09a9972882ec58b02e916e", name: "AIA" },
    __v: 0,
  },
  {
    policyholder: [],
    isAgent: true,
    _id: "5f09a9af2882ec58b02e9175",
    name: "agent5",
    email: "agent5@aia.com",
    password: "$2b$10$4t9F58s6PDjdQTJwhbfIvu3E/.G6H06MTEXT/wrU0AZWIKIpL3cma",
    mobile: 12345678,
    company: { _id: "5f09a9972882ec58b02e916e", name: "AIA" },
    __v: 0,
  },
  {
    policyholder: [],
    isAgent: true,
    _id: "5f09a9af2882ec58b02e9176",
    name: "agent6",
    email: "agent6@aia.com",
    password: "$2b$10$4t9F58s6PDjdQTJwhbfIvu3E/.G6H06MTEXT/wrU0AZWIKIpL3cma",
    mobile: 12345678,
    company: { _id: "5f09a9972882ec58b02e916e", name: "AIA" },
    __v: 0,
  },
  {
    policyholder: [],
    isAgent: true,
    _id: "5f09a9af2882ec58b02e9177",
    name: "agent7",
    email: "agent7@aia.com",
    password: "$2b$10$4t9F58s6PDjdQTJwhbfIvu3E/.G6H06MTEXT/wrU0AZWIKIpL3cma",
    mobile: 12345678,
    company: { _id: "5f09a9972882ec58b02e916e", name: "AIA" },
    __v: 0,
  },
  {
    policyholder: [],
    isAgent: true,
    _id: "5f09a9af2882ec58b02e9178",
    name: "agent8",
    email: "agent8@aia.com",
    password: "$2b$10$4t9F58s6PDjdQTJwhbfIvu3E/.G6H06MTEXT/wrU0AZWIKIpL3cma",
    mobile: 12345678,
    company: { _id: "5f09a9972882ec58b02e916e", name: "AIA" },
    __v: 0,
  },
  {
    policyholder: [],
    isAgent: true,
    _id: "5f09a9af2882ec58b02e9179",
    name: "agent9",
    email: "agent9@aia.com",
    password: "$2b$10$4t9F58s6PDjdQTJwhbfIvu3E/.G6H06MTEXT/wrU0AZWIKIpL3cma",
    mobile: 12345678,
    company: { _id: "5f09a9972882ec58b02e916e", name: "AIA" },
    __v: 0,
  },
];

export function getAgents() {
  return agents;
}

export function getAgent(id) {
  return agents.find((m) => m._id === id);
}

export function saveAgent(agent) {
  let agentInDb = agents.find((a) => a._id === agent._id) || {};

  agentInDb.name = agent.name;

  agentInDb.email = agent.email;

  agentInDb.password = agent.password;

  agentInDb.mobile = agent.mobile;

  // agentInDb.company = companyAPI.companies.find(
  //   (c) => c._id === agent.companyId
  // );

  if (!agentInDb._id) {
    agentInDb._id = Date.now().toString();
    agents.push(agentInDb);
  }

  return agentInDb;
}
