import { LIVE_BASE_URL, DEV_BASE_URL } from "./constant";

const baseUrl = (env: string) => {
  if (env === "production") {
    return LIVE_BASE_URL;
  } else if (env === "development") {
    return DEV_BASE_URL;
  }
};

export const BASE_URL = baseUrl(import.meta.env.VITE_NODE_ENV);
