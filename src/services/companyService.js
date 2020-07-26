import http from "../services/httpService";
import { apiUrl } from "../config.json";

//////////////////////////////

export function getCompanies() {
  return http.get(apiUrl + "/company");
}

//////////////////////////////

export const companies = [
  {
    isCompanyAdmin: true,
    name: "AIA",
    _id: "5f09a9972882ec58b02e916e",
    email: "admin@aia.net",
    password: "$2b$10$rgDWSa9.eAx4uG1tRihVkOdSldckcyNRO4ptkI4bV/XwbOjWQdA/S",
    __v: 0,
  },
  {
    isCompanyAdmin: true,
    name: "Prudential",
    _id: "5f09a9972882ec58b02e916a",
    email: "admin@prudential.net",
    password: "$2b$10$rgDWSa9.eAx4uG1tRihVkOdSldckcyNRO4ptkI4bV/XwbOjWQdA/S",
    __v: 0,
  },
  {
    isCompanyAdmin: true,
    name: "ManualLife",
    _id: "5f09a9972882ec58b02e916b",
    email: "admin@ManualLife.net",
    password: "$2b$10$rgDWSa9.eAx4uG1tRihVkOdSldckcyNRO4ptkI4bV/XwbOjWQdA/S",
    __v: 0,
  },
];

// export function getCompanies() {
//   return companies;
// }

export function getCompany(id) {
  return companies.find((m) => m._id === id);
}
