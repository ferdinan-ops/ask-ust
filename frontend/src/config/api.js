import axios from "axios";

const API = axios.create({
   baseURL: process.env.REACT_APP_API_URI,
   withCredentials: true,
   headers: { "Content-Type": "Application/json" },
});

export const loginAPI = (fields) => API.post("/login", fields);
export const registerAPI = (fields) => API.post("/register", fields);

export const createTagAPI = (fields) => API.post("/create-tag", fields);