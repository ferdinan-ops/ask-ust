const express = require("express");
const { verifyToken } = require("../middlewares/verfiyToken");
const { getUsers, getUser, getMySavedPosts, getActiveUser } = require("../controllers/userController");

const router = express.Router();

router.get("/users", verifyToken, getUsers);
router.get("/user/:userId", verifyToken, getUser);
router.get("/user/saved-posts", verifyToken, getMySavedPosts);
router.get("/users/active", verifyToken, getActiveUser);

module.exports = router;