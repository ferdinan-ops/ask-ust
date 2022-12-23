const express = require('express');
const { createTag, getTags } = require('../controllers/tagController');
const { verifyToken } = require('../middlewares/verfiyToken');

const router = express.Router();

router.post("/tag/create", verifyToken, createTag);
router.get("/tags", verifyToken, getTags);

module.exports = router;