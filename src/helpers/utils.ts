export function getToken(): string | boolean {
  let token: string | null = sessionStorage.getItem("userToken");
  if (token) {
    token = "Bearer " + JSON.parse(token);
    return token;
  } else {
    return false;
  }
}

export function getUserId(): string | boolean {
  const userId: string | null = sessionStorage.getItem("userId");
  if (userId) {
    return JSON.parse(userId);
  } else {
    return false;
  }
}

export function getGeoJson() {
  return {
    type: "geojson",
    data: {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: [] as any[],
      },
    },
  };
}
