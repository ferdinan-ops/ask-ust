const express = require("express");
const { createPost } = require("../controllers/postController");
const { verifyToken } = require("../middlewares/verfiyToken")

const router = express.Router();

router.post("/post/create", verifyToken, createPost);

module.exports = router;