import axios, { AxiosError } from "axios";

export type ApiError = AxiosError<{ error: string }>;

const baseURL =
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_API_URL + "/api"
    : "/api";

export const api = axios.create({
  baseURL,
  withCredentials: true,
});
