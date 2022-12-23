import axios from "axios";

const API = axios.create({
   baseURL: process.env.REACT_APP_API_URI,
   withCredentials: true,
   headers: { "Content-Type": "Application/json" },
});

export const loginAPI = (fields) => API.post("/login", fields);
export const registerAPI = (fields) => API.post("/register", fields);

export const searchTagsAPI = (keyword) => API.get(`/tags?search=${keyword}`);
export const createTagAPI = (fields) => API.post("/tag/create", fields);
export const getTagsAPI = () => API.get("/tags");

export const createPostAPI = (fields) => API.post("/post/create", fields);