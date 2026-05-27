import { request } from "@h-gpt/request";

export type HealthResponse = {
  status: string;
  timestamp: string;
};

export function getHealth() {
  return request.get<HealthResponse>("/health");
}
