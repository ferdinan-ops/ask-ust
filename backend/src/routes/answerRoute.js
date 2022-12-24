const express = require("express");
const { verifyToken } = require("../middlewares/verfiyToken");
const { createAnswer, updateAnswer, deleteAnswer, likeAnswer, dislikeAnswer, getAnswers } = require("../controllers/answerController");

const router = express.Router();

router.post("/answer/create", verifyToken, createAnswer);
router.put("/answer/update", verifyToken, updateAnswer);
router.delete("/answer/delete", verifyToken, deleteAnswer);
router.put("/answer/like", verifyToken, likeAnswer);
router.put("/answer/dislike", verifyToken, dislikeAnswer);
router.get("/answers", verifyToken, getAnswers);

module.exports = router;