import http from "../services/httpService";
import { apiUrl } from "../config.json";

/////////////////////////////////

export function getPolicyholders() {
  return http.get(apiUrl + "/policyholder");
}

////////////////////////////

const policyholders = [
  {
    policy: [
      "5f09aa112882ec58b02e9171",
      "5f09aa112882ec58b02e9172",
      "5f09aa112882ec58b02e9173",
      "5f09aa112882ec58b02e9174",
      "5f09aa112882ec58b02e9175",
      "5f09aa112882ec58b02e9176",
      "5f09aa112882ec58b02e9177",
      "5f09aa112882ec58b02e9178",
      "5f09aa112882ec58b02e9179",
    ],
    _id: "5f09a9cc2882ec58b02e9171",
    name: "policyholder1",
    email: "policyholder1@example.com",
    mobile: 12345678,
    nric: "s1234567a",
    agent: "5f09a9af2882ec58b02e9170",
    __v: 0,
  },
  {
    policy: [],
    _id: "5f09a9e22882ec58b02e9172",
    name: "policyholder2",
    email: "policyholder2@example.com",
    mobile: 12345678,
    nric: "s1234567a",
    agent: "5f09a9af2882ec58b02e9170",
    __v: 0,
  },
  {
    policy: [],
    _id: "5f09a9e22882ec58b02e9173",
    name: "policyholder3",
    email: "policyholder3@example.com",
    mobile: 12345678,
    nric: "s1234567a",
    agent: "5f09a9af2882ec58b02e9170",
    __v: 0,
  },
  {
    policy: [],
    _id: "5f09a9e22882ec58b02e9174",
    name: "policyholder4",
    email: "policyholder4@example.com",
    mobile: 12345678,
    nric: "s1234567a",
    agent: "5f09a9af2882ec58b02e9170",
    __v: 0,
  },
  {
    policy: [],
    _id: "5f09a9e22882ec58b02e9175",
    name: "policyholder5",
    email: "policyholder5@example.com",
    mobile: 12345678,
    nric: "s1234567a",
    agent: "5f09a9af2882ec58b02e9170",
    __v: 0,
  },
  {
    policy: [],
    _id: "5f09a9e22882ec58b02e9176",
    name: "policyholder6",
    email: "policyholder6@example.com",
    mobile: 12345678,
    nric: "s1234567a",
    agent: "5f09a9af2882ec58b02e9170",
    __v: 0,
  },
  {
    policy: [],
    _id: "5f09a9e22882ec58b02e9177",
    name: "policyholder7",
    email: "policyholder7@example.com",
    mobile: 12345678,
    nric: "s1234567a",
    agent: "5f09a9af2882ec58b02e9170",
    __v: 0,
  },
  {
    policy: [],
    _id: "5f09a9e22882ec58b02e9178",
    name: "policyholder8",
    email: "policyholder8@example.com",
    mobile: 12345678,
    nric: "s1234567a",
    agent: "5f09a9af2882ec58b02e9170",
    __v: 0,
  },
  {
    policy: [],
    _id: "5f09a9e22882ec58b02e9179",
    name: "policyholder9",
    email: "policyholder9@example.com",
    mobile: 12345678,
    nric: "s1234567a",
    agent: "5f09a9af2882ec58b02e9170",
    __v: 0,
  },
];

// export function getPolicyholders() {
//   return policyholders;
// }

export function getPolicyholder(id) {
  return policyholders.find((m) => m._id === id);
}

export function savePolicyholder(policyholder) {
  let policyholderInDb =
    policyholders.find((p) => p._id === policyholder._id) || {};

  policyholderInDb.name = policyholder.name;

  policyholderInDb.email = policyholder.email;

  policyholderInDb.nric = policyholder.nric;

  policyholderInDb.mobile = policyholder.mobile;

  // policyholderInDb.company = companyAPI.companies.find(
  //   (c) => c._id === policyholder.companyId
  // );

  if (!policyholderInDb._id) {
    policyholderInDb._id = Date.now().toString();
    policyholders.push(policyholderInDb);
  }

  return policyholderInDb;
}

// name: req.body.name,
// email: req.body.email,
// mobile: req.body.mobile,
// nric: req.body.nric,
// agent: req.body.agentId,
