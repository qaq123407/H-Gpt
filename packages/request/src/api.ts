import { request } from "./axios";

export const api = {
  health: () => request.get("/health")
};
