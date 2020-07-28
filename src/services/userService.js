import http from "../services/httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/user";

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.email,
    password: user.password,
    name: user.name,
  });
}
