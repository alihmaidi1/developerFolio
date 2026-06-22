import axios from "axios";

export const publicClient = axios.create({
  baseURL: "/",
  timeout: 10_000,
  headers: {
    Accept: "application/json",
  },
});
