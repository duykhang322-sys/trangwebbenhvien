const express = require('express');
const router = express.Router();
const { getStats } = require('../controllers/statsController');
const { verifyToken, verifyRole } = require('../middleware/authMiddleWare');

// Chỉ Admin mới được xem thống kê
router.get('/', verifyToken, verifyRole(['Admin']), getStats);

module.exports = router;