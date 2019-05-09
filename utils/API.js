import axios from "axios";

export const API_credential = axios.create({
  baseURL: "http://localhost:8892/",
  withCredentials: true
});

export const API = axios.create({
  baseURL: "http://localhost:8892/",
  withCredentials: false
});
