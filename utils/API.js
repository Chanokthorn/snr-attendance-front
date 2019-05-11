import axios from "axios";

export const baseURL = "http://localhost:8892/";

export const API_credential = axios.create({
  baseURL: baseURL,
  withCredentials: true
});

export const API = axios.create({
  baseURL: baseURL,
  withCredentials: false
});
