const express = require("express");
const { verifyToken } = require("../middlewares/verfiyToken");
const { createAnswer, updateAnswer, deleteAnswer, likeAnswer, dislikeAnswer, getAnswers } = require("../controllers/answerController");

const router = express.Router();

router.get("/answers/:postId", verifyToken, getAnswers);
router.post("/answer", verifyToken, createAnswer);
router.put("/answer/:id", verifyToken, updateAnswer);
router.delete("/answer/:id", verifyToken, deleteAnswer);
router.put("/answer/like", verifyToken, likeAnswer);
router.put("/answer/dislike", verifyToken, dislikeAnswer);

module.exports = router;