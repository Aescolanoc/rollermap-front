import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4500",
  timeout: 20000,
});

export function login(user: object) {
  return api.post("/login", user);
}
