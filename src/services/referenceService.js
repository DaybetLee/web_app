import http from "../services/httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/reference";

export function getAgents() {
  return http.get(apiEndpoint);
}

export function saveReference(output) {
  const body = { message: output };
  return http.post(apiEndpoint, body);
}
