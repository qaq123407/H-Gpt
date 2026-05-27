import axios from "axios";
import { attachInterceptors } from "./interceptors";

export const request = axios.create({
  baseURL: "/api",
  timeout: 30_000
});

attachInterceptors(request);
