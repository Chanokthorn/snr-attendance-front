import axios from "axios";

export const baseURL = "https://cgci.cp.eng.chula.ac.th/thananop/ssdfaces/";

export const API_credential = axios.create({
  baseURL: baseURL,
  withCredentials: true
});

export const API = axios.create({
  baseURL: baseURL,
  withCredentials: false
});
