const express = require("express");

const router = express.Router();

const { register, login, logout, refreshToken } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.delete("/logout", logout);
router.get("/token", refreshToken);

module.exports = router;
