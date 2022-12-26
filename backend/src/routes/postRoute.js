const express = require("express");
const { verifyToken } = require("../middlewares/verfiyToken")
const { createPost, updatePost, deletePost, likePost, savePost, getPosts, getPost } = require("../controllers/postController");

const router = express.Router();

router.get("/posts", verifyToken, getPosts);
router.get("/post/:postId", verifyToken, getPost);
router.post("/post", verifyToken, createPost);
router.put("/post/:postId", verifyToken, updatePost);
router.delete("/post/:postId", verifyToken, deletePost);
router.put("/post/like/:postId", verifyToken, likePost);
router.put("/post/save/:postId", verifyToken, savePost);

module.exports = router;