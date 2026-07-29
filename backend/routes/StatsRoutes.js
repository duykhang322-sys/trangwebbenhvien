const express = require('express');
const router = express.Router();
const { getStats } = require('../controllers/StatsController');
const { verifyToken, verifyRole } = require('../middleware/AuthMiddleWare');

// Chỉ Admin mới được xem thống kê
router.get('/', verifyToken, verifyRole(['Admin']), getStats);

module.exports = router;