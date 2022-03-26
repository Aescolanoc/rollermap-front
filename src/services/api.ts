import type RollerPlace from "@/types/RollerPlace";
import axios, { type AxiosResponse } from "axios";
import { useRollerMapStore } from "@/stores/store";
import { getToken } from "../helpers/utils";

const api = axios.create({
  baseURL: "http://localhost:4500",
  timeout: 20000,
});

const apiToken = axios.create({
  baseURL: "http://localhost:4500",
  timeout: 20000,
});

apiToken.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("Interceptor error:", error, error.response.status);
    if (error?.response?.status === 401) {
      const store = useRollerMapStore();
      store.userLogOut();
    }
    return Promise.reject(error);
  }
);

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

export function getUserDetails(userId: string) {
  return apiToken({
    method: "get",
    url: `users/${userId}`,
    headers: { Authorization: getToken() },
  });
}

export function updateUser(userId: string, user: object) {
  return apiToken({
    method: "patch",
    url: `users/${userId}`,
    data: user,
    headers: { Authorization: getToken() },
  });
}

export function getAllRollerPlaces(): Promise<AxiosResponse<RollerPlace[]>> {
  return apiToken.get("/rollerplaces", { headers: { Authorization: getToken() } });
}

export function getMyRollerPlaces(): Promise<AxiosResponse<RollerPlace[]>> {
  return apiToken.get("/rollerplaces/myrollerplaces", {
    headers: { Authorization: getToken() },
  });
}

export function toggleFavorites(placeId: string) {
  return apiToken({
    method: "put",
    url: `rollerplaces/favorites/${placeId}`,
    data: {},
    headers: { Authorization: getToken() },
  });
}

export function createRollerPlace(rollerPlace: object) {
  return apiToken({
    method: "post",
    url: `rollerplaces`,
    data: rollerPlace,
    headers: { Authorization: getToken() },
  });
}

export function updateRollerPlace(placeId: string, rollerPlace: object) {
  return apiToken({
    method: "put",
    url: `rollerplaces/${placeId}`,
    data: rollerPlace,
    headers: { Authorization: getToken() },
  });
}

export function deleteRollerPlace(placeId: string) {
  return apiToken({
    method: "delete",
    url: `rollerplaces/${placeId}`,
    headers: { Authorization: getToken() },
  });
}
