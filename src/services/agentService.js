import http from "../services/httpService";
import { apiUrl } from "../config.json";
import { addToObject } from "./../components/utils/addToObject";

const apiEndpoint = apiUrl + "/agent";

export function getAgents() {
  return http.get(apiEndpoint);
}

export function getAgent(id) {
  return http.get(apiEndpoint + "/" + id);
}

export function getCompanyAgent(id) {
  return http.get(apiEndpoint + "/param?cid=" + id);
}

export function deactivateAgent(agent) {
  const { email, mobile, name, password } = agent;
  let body = { email, mobile, name, password };
  body = addToObject(body, "active", false);
  body = addToObject(body, "companyId", agent.company._id);
  return http.put(apiEndpoint + "/" + agent._id, body);
}

export function saveAgent(agent) {
  if (agent._id) {
    let body = { ...agent };
    delete body._id;
    body = addToObject(body, "active", true);
    return http.put(apiEndpoint + "/" + agent._id, body);
  }
  return http.post(apiEndpoint, agent);
}
