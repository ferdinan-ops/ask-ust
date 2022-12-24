import axios from "axios";

const API = axios.create({
   baseURL: process.env.REACT_APP_API_URI,
   withCredentials: true,
   headers: { "Content-Type": "Application/json" },
});

/* AUTHENTICATION */
export const loginAPI = (fields) => API.post("/login", fields);
export const registerAPI = (fields) => API.post("/register", fields);

/* TAGS */
export const searchTagsAPI = (keyword, page) => API.get(`/tags?search=${keyword}&page${page}`);
export const createTagAPI = (fields) => API.post("/tag/create", fields);
export const getTagsAPI = (page) => API.get(`/tags?page=${page}`);

/* POSTS */
export const createPostAPI = (fields) => API.post("/post/create", fields);

/* USERS */
export const searchUserAPI = (keyword) => API.get(`/users?search=${keyword}`);
export const getMySavedPostsAPI = () => API.get("/user/saved-posts");
export const getUserAPI = (userId) => API.get(`/user/${userId}`);
export const getUsersAPI = () => API.get("/users");

