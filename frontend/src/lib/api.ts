import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://affederation-1526cb5810b7.herokuapp.com/api"
    : "http://192.168.1.7:5000/api";

export const api = axios.create({
  baseURL: baseURL,
});

export function setAuthToken(token: string) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
