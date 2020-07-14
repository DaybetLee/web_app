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
    date: "2020-07-11T12:01:21.122Z",
    __v: 0,
  },
  {
    inforce: true,
    _id: "5f09aa112882ec58b02e9173",
    name: "policy3",
    policyholder: { _id: "5f09a9cc2882ec58b02e9171", name: "policyholder1" },
    company: { _id: "5f09a9972882ec58b02e916e", name: "AIA" },
    date: "2020-07-11T12:01:21.122Z",
    __v: 0,
  },
  {
    inforce: true,
    _id: "5f09aa112882ec58b02e9174",
    name: "policy4",
    policyholder: { _id: "5f09a9cc2882ec58b02e9171", name: "policyholder1" },
    company: { _id: "5f09a9972882ec58b02e916e", name: "AIA" },
    date: "2020-07-11T12:01:21.122Z",
    __v: 0,
  },
  {
    inforce: true,
    _id: "5f09aa112882ec58b02e9175",
    name: "policy5",
    policyholder: { _id: "5f09a9cc2882ec58b02e9171", name: "policyholder1" },
    company: { _id: "5f09a9972882ec58b02e916e", name: "AIA" },
    date: "2020-07-11T12:01:21.122Z",
    __v: 0,
  },
  {
    inforce: true,
    _id: "5f09aa112882ec58b02e9176",
    name: "policy6",
    policyholder: { _id: "5f09a9cc2882ec58b02e9171", name: "policyholder1" },
    company: { _id: "5f09a9972882ec58b02e916e", name: "AIA" },
    date: "2020-07-11T12:01:21.122Z",
    __v: 0,
  },
  {
    inforce: true,
    _id: "5f09aa112882ec58b02e9177",
    name: "policy7",
    policyholder: { _id: "5f09a9cc2882ec58b02e9171", name: "policyholder1" },
    company: { _id: "5f09a9972882ec58b02e916e", name: "AIA" },
    date: "2020-07-11T12:01:21.122Z",
    __v: 0,
  },
  {
    inforce: true,
    _id: "5f09aa112882ec58b02e9178",
    name: "policy8",
    policyholder: { _id: "5f09a9cc2882ec58b02e9171", name: "policyholder1" },
    company: { _id: "5f09a9972882ec58b02e916e", name: "AIA" },
    date: "2020-07-11T12:01:21.122Z",
    __v: 0,
  },
  {
    inforce: true,
    _id: "5f09aa112882ec58b02e9179",
    name: "policy9",
    policyholder: { _id: "5f09a9cc2882ec58b02e9171", name: "policyholder1" },
    company: { _id: "5f09a9972882ec58b02e916a", name: "Prudential" },
    date: "2020-07-11T12:01:21.122Z",
    __v: 0,
  },
];

export function getPolicies() {
  return policies;
}

export function getPolicy(id) {
  return policies.find((m) => m._id === id);
}
