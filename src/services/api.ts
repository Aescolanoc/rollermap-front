import axios from "axios";

let token: any = localStorage.getItem("userToken");
token = "Bearer " + JSON.parse(token);

const apiLogin = axios.create({
  baseURL: "http://localhost:4500",
  timeout: 20000,
});

const apiToken = axios.create({
  baseURL: "http://localhost:4500",
  timeout: 20000,
  headers: { Authorization: token },
});

export function login(user: object) {
  return apiLogin.post("/login", user);
}

export function getAllRollerPlaces() {
  return apiToken.get("/rollerplaces", { headers: { Authorization: token } });
}

export function toggleFavorites(placeId: string) {
  return apiToken({
    method: "put",
    url: `rollerplaces/favorites/${placeId}`,
    data: {},
  });
}
