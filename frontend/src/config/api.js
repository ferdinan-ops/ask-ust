import axios from "axios";

const API = axios.create({
   baseURL: process.env.REACT_APP_API_URI,
   withCredentials: true,
   headers: { "Content-Type": "Application/json" },
});

/* AUTHENTICATION */
export const loginAPI = (fields) => API.post("/login", fields);
export const registerAPI = (fields) => API.post("/register", fields);
export const logoutAPI = () => API.delete("/logout");

/* TAGS */
export const searchTagsAPI = (keyword, page) => API.get(`/tags?search=${keyword}&page=${page}`);
export const createTagAPI = (fields) => API.post("/tag/create", fields);
export const getTagsAPI = (page) => API.get(`/tags?page=${page}`);
export const getAllTagsAPI = () => API.get("/tags/all");

/* POSTS */
export const updatePostAPI = (postId, fields) => API.put(`/post/${postId}`, fields);
export const deletePostAPI = (postId) => API.delete(`/post/${postId}`);
export const createPostAPI = (fields) => API.post("/post", fields);
export const getPostsAPI = (page) => API.get(`/posts?page=${page}`);
export const getPostAPI = (postId) => API.get(`/post/${postId}`);
export const likePostAPI = (postId) => API.put(`/post/like/${postId}`);
export const savePostAPI = (postId) => API.put(`/post/save/${postId}`);

/* USERS */
export const searchUserAPI = (keyword) => API.get(`/users?search=${keyword}`);
export const getMySavedPostsAPI = () => API.get("/user/saved-posts");
export const getUserAPI = (userId) => API.get(`/user/${userId}`);
export const getUsersAPI = () => API.get("/users");

/* ANSWERS */
export const getAnswersAPI = (id) => API.get(`/answers/${id}`);
export const createAnswerAPI = (fields) => API.post("/answer", fields);