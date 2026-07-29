const express = require('express');
const router = express.Router();
const { createAppointment, getAppointments, deleteAppointment, updateStatus } = require('../controllers/appointmentController');
const { verifyToken, verifyRole } = require('../middleware/authMiddleWare');

router.post('/book', createAppointment);

// API Lấy danh sách
router.get('/', verifyToken, verifyRole(['Admin']), getAppointments);

// 🔴 ĐÃ SỬA LẠI ĐƯỜNG LINK CHỖ NÀY CHO KHỚP VỚI FRONTEND:
router.put('/:id/status', verifyToken, verifyRole(['Admin', 'Receptionist', 'Doctor']), updateStatus);

// API Xóa
router.delete('/:id', verifyToken, verifyRole(['Admin', 'Receptionist']), deleteAppointment);

module.exports = router;