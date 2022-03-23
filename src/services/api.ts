import type RollerPlace from "@/types/RollerPlace";
import axios, { type AxiosResponse } from "axios";

let token: any = localStorage.getItem("userToken");
token = "Bearer " + JSON.parse(token);

const api = axios.create({
  baseURL: "http://localhost:4500",
  timeout: 20000,
});

const apiToken = axios.create({
  baseURL: "http://localhost:4500",
  timeout: 20000,
  headers: { Authorization: token },
});

export function login(user: object) {
  return api.post("/login", user);
}

export function register(user: object) {
  return api({
    method: "post",
    url: `users`,
    data: user,
  });
}

export function getAllRollerPlaces(): Promise<AxiosResponse<RollerPlace[]>> {
  return apiToken.get("/rollerplaces", { headers: { Authorization: token } });
}

export function toggleFavorites(placeId: string) {
  return apiToken({
    method: "put",
    url: `rollerplaces/favorites/${placeId}`,
    data: {},
  });
}
