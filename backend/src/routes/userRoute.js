const express = require("express");
const { verifyToken } = require("../middlewares/verfiyToken");
const { getUsers, getUser, getActiveUser, getMySavedPosts, getMyPosts, updateUser } = require("../controllers/userController");

const router = express.Router();

router.get("/users", verifyToken, getUsers);
router.get("/user/:id", verifyToken, getUser);
router.get("/users/:id/my-posts", verifyToken, getMyPosts);
router.get("/users/saved-posts", verifyToken, getMySavedPosts);
router.get("/users/active", verifyToken, getActiveUser);
router.put("/user", verifyToken, updateUser);

module.exports = router;