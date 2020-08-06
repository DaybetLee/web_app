import http from "../services/httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/mailer";

export function getAgents() {
  return http.get(apiEndpoint);
}

export function sendClaimant(policyholder, email, link) {
  const body = { policyholder, email, link };
  return http.post(apiEndpoint + "/claimant", body);
}

export function sendReject(policyholder, company, email, nric, reject) {
  const body = { policyholder, company, email, nric, reject };
  return http.post(apiEndpoint + "/reject", body);
}

export function sendCompany(policyholder, company, email, nric) {
  const body = { policyholder, company, email, nric };
  return http.post(apiEndpoint + "/company", body);
}
