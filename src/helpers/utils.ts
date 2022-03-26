export function getToken(): string | boolean {
  let token: string | null = localStorage.getItem("userToken");
  if (token) {
    token = "Bearer " + JSON.parse(token);
    return token;
  } else {
    return false;
  }
}

export function getUserId(): string | boolean {
  const userId: string | null = localStorage.getItem("userId");
  if (userId) {
    return JSON.parse(userId);
  } else {
    return false;
  }
}
