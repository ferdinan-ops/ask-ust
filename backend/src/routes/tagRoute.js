const express = require('express');
const { createTag, getTags, getAllTags, getPostByTag, getTag } = require('../controllers/tagController');
const { verifyToken } = require('../middlewares/verfiyToken');

const router = express.Router();

router.post("/tag", verifyToken, createTag);
router.get("/tags", verifyToken, getTags);
router.get("/tag", verifyToken, getPostByTag);
router.get("/tag/:name", verifyToken, getTag);
router.get("/tags/all", verifyToken, getAllTags);

module.exports = router;