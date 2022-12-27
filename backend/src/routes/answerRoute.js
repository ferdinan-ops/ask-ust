const express = require("express");
const { verifyToken } = require("../middlewares/verfiyToken");
const { createAnswer, updateAnswer, deleteAnswer, likeAnswer, dislikeAnswer, getAnswers, getAnswer } = require("../controllers/answerController");

const router = express.Router();

router.get("/answers/:postId", verifyToken, getAnswers);
router.get("/answer/:id", verifyToken, getAnswer);
router.post("/answer", verifyToken, createAnswer);
router.put("/answer/:id", verifyToken, updateAnswer);
router.delete("/answer/:id", verifyToken, deleteAnswer);
router.put("/answer/like/:id", verifyToken, likeAnswer);
router.put("/answer/dislike/:id", verifyToken, dislikeAnswer);

module.exports = router;