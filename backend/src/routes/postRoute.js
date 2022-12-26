const express = require("express");
const { verifyToken } = require("../middlewares/verfiyToken")
const { createPost, updatePost, deletePost, likePost, savePost, getPosts, getPost } = require("../controllers/postController");

const router = express.Router();

router.post("/post", verifyToken, createPost);
router.put("/post/:postId", verifyToken, updatePost);
router.delete("/post/:postId", verifyToken, deletePost);
router.put("/post/like", verifyToken, likePost);
router.put("/post/save", verifyToken, savePost);
router.get("/posts", verifyToken, getPosts);
router.get("/post/:postId", verifyToken, getPost);

module.exports = router;