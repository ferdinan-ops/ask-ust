const express = require('express');
const { verifyToken } = require('../middlewares/verfiyToken');
const { getNotifications, markAllAsRead, markAsRead, getReadCounts } = require('../controllers/notifController');

const router = express.Router();

router.get('/notif', verifyToken, getNotifications);
router.put('/notif/mark/:id', verifyToken, markAsRead);
router.put('/notif/mark-all', verifyToken, markAllAsRead);
router.get('/notif/read-count', verifyToken, getReadCounts);

module.exports = router;