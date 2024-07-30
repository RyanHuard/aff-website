import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://affederation.net/api"
    : "http://127.0.0.1:5000/api";

export const api = axios.create({
  baseURL: baseURL,
});

export function setAuthToken(token: string) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
