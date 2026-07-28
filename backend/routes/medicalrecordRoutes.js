const express = require('express');
const router = express.Router();
const { createRecord, getRecords } = require('../controllers/medicalRecordController');
const { verifyToken, verifyRole } = require('../middleware/authMiddleWare');

// Chỉ Admin hoặc Bác sĩ mới được quyền Tạo và Xem bệnh án
router.post('/', verifyToken, verifyRole(['Admin', 'Doctor']), createRecord);
router.get('/', verifyToken, verifyRole(['Admin', 'Doctor']), getRecords);

module.exports = router;