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
export const createTagAPI = (fields) => API.post("/tag", fields);
export const getTagsAPI = (page) => API.get(`/tags?page=${page}`);
export const getAllTagsAPI = () => API.get("/tags/all");
export const getPostByTagAPI = (page, tag) => API.get(`/tag?tag=${tag}&page=${page}`);
export const getTagAPI = (name) => API.get(`/tag/${name}`);

/* POSTS */
export const updatePostAPI = (postId, fields) => API.put(`/post/${postId}`, fields);
export const deletePostAPI = (postId) => API.delete(`/post/${postId}`);
export const createPostAPI = (fields) => API.post("/post", fields);
export const getPostsAPI = (page) => API.get(`/posts?page=${page}`);
export const getPostAPI = (postId) => API.get(`/post/${postId}`);
export const likePostAPI = (postId) => API.put(`/post/like/${postId}`);
export const savePostAPI = (postId) => API.put(`/post/save/${postId}`);

/* USERS */
export const searchUserAPI = (keyword, page) => API.get(`/users?search=${keyword}&page=${page}`);
export const getMySavedPostsAPI = () => API.get("/user/saved-posts");
export const getUserAPI = (userId) => API.get(`/user/${userId}`);
export const getUsersAPI = (page) => API.get(`/users?page=${page}`);
export const getActiveUserAPI = () => API.get("/users/active");

/* ANSWERS */
export const getAnswersAPI = (postId) => API.get(`/answers/${postId}`);
export const getAnswerAPI = (id) => API.get(`/answer/${id}`);
export const createAnswerAPI = (fields) => API.post("/answer", fields);
export const updateAnswerAPI = (id, fields) => API.put(`/answer/${id}`, fields);
export const deleteAnswerAPI = (id) => API.delete(`/answer/${id}`);
export const likeAnswerAPI = (answerId) => API.put(`/answer/like/${answerId}`);
export const dislikeAnswerAPI = (answerId) => API.put(`/answer/dislike/${answerId}`);