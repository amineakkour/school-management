import axios from "axios";

export const customAxios = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "/api/",
  timeout: 10_000
});