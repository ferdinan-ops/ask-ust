const express = require('express');
const { createTag } = require('../controllers/tagController');
const { verifyToken } = require('../middlewares/verfiyToken');

const router = express.Router();

router.post("/create-tag", verifyToken, createTag);

module.exports = router;