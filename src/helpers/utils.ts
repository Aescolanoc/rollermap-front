export function getToken(): string | boolean {
  let token: string | null = localStorage.getItem("userToken");
  if (token) {
    token = "Bearer " + JSON.parse(token);
    return token;
  } else {
    return false;
  }
}
