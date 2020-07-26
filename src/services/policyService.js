import http from "../services/httpService";
import { apiUrl } from "../config.json";

/////////////////////////////////////////
export function getPolicies() {
  return http.get(apiUrl + "/policy");
}

//////////////////////////////////////////

const policies = [
  {
    inforce: true,
    _id: "5f09aa112882ec58b02e9171",
    name: "policy1",
    policyholder: { _id: "5f09a9cc2882ec58b02e9171", name: "policyholder1" },
    company: { _id: "5f09a9972882ec58b02e916e", name: "AIA" },
    date: "2020-07-11T12:01:21.122Z",
    __v: 0,
  },
  {
    inforce: false,
    _id: "5f09aa112882ec58b02e9172",
    name: "policy2",
    policyholder: { _id: "5f09a9cc2882ec58b02e9171", name: "policyholder1" },
    company: { _id: "5f09a9972882ec58b02e916e", name: "AIA" },
    date: "2020-07-12T12:01:21.122Z",
    __v: 0,
  },
  {
    inforce: true,
    _id: "5f09aa112882ec58b02e9173",
    name: "policy3",
    policyholder: { _id: "5f09a9cc2882ec58b02e9171", name: "policyholder1" },
    company: { _id: "5f09a9972882ec58b02e916e", name: "AIA" },
    date: "2020-07-13T12:01:21.122Z",
    __v: 0,
  },
  {
    inforce: true,
    _id: "5f09aa112882ec58b02e9174",
    name: "policy4",
    policyholder: { _id: "5f09a9cc2882ec58b02e9171", name: "policyholder1" },
    company: { _id: "5f09a9972882ec58b02e916e", name: "AIA" },
    date: "2020-07-14T12:01:21.122Z",
    __v: 0,
  },
  {
    inforce: true,
    _id: "5f09aa112882ec58b02e9175",
    name: "policy5",
    policyholder: { _id: "5f09a9cc2882ec58b02e9171", name: "policyholder1" },
    company: { _id: "5f09a9972882ec58b02e916e", name: "AIA" },
    date: "2020-07-15T12:01:21.122Z",
    __v: 0,
  },
  {
    inforce: true,
    _id: "5f09aa112882ec58b02e9176",
    name: "policy6",
    policyholder: { _id: "5f09a9cc2882ec58b02e9171", name: "policyholder1" },
    company: { _id: "5f09a9972882ec58b02e916e", name: "AIA" },
    date: "2020-07-16T12:01:21.122Z",
    __v: 0,
  },
  {
    inforce: true,
    _id: "5f09aa112882ec58b02e9177",
    name: "policy7",
    policyholder: { _id: "5f09a9cc2882ec58b02e9171", name: "policyholder1" },
    company: { _id: "5f09a9972882ec58b02e916e", name: "AIA" },
    date: "2020-07-17T12:01:21.122Z",
    __v: 0,
  },
  {
    inforce: true,
    _id: "5f09aa112882ec58b02e9178",
    name: "policy8",
    policyholder: { _id: "5f09a9cc2882ec58b02e9171", name: "policyholder1" },
    company: { _id: "5f09a9972882ec58b02e916e", name: "AIA" },
    date: "2020-07-18T12:01:21.122Z",
    __v: 0,
  },
  {
    inforce: true,
    _id: "5f09aa112882ec58b02e9179",
    name: "policy9",
    policyholder: { _id: "5f09a9cc2882ec58b02e9171", name: "policyholder1" },
    company: { _id: "5f09a9972882ec58b02e916a", name: "Prudential" },
    date: "2020-07-19T12:01:21.122Z",
    __v: 0,
  },
];

// export function getPolicies() {
//   return policies;
// }

export function getPolicy(id) {
  return policies.find((m) => m._id === id);
}

export function savePolicy(policy) {
  let policyInDb = policies.find((p) => p._id === policy._id) || {};

  policyInDb.name = policy.name;

  policyInDb.inforce = policy.inforce;

  // policyInDb.company = companyAPI.companies.find(
  //   (c) => c._id === policy.companyId
  // );

  if (!policyInDb._id) {
    policyInDb._id = Date.now().toString();
    policies.push(policyInDb);
  }

  return policyInDb;
}

// let policy = new Policy({
//   name: req.body.name,
//   policyholder: req.body.policyholderId,
//   company: req.body.companyId,
// });
