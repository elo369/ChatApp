import axios from "axios";

const DB_URL = import.meta.env.VITE_DB_URL;

export const axiosInstance = axios.create({
  baseURL: DB_URL,
  withCredentials: true,
  // timeout: 1000,
  // headers: { ContentType: "application/json" },
  headers: { "Content-Type": "application/json" },
});

console.log("DB_URL:", import.meta.env.VITE_DB_URL);
