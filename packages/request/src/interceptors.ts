import type { AxiosInstance } from "axios";

export function attachInterceptors(instance: AxiosInstance) {
  instance.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
  );
}
