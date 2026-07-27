const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const jwt = require('jsonwebtoken');

// Middleware 2 lớp: Vừa check Token, vừa check quyền Admin
const protectAdmin = (req, res, next) => {
    let token = req.headers.authorization;
    
    if (token && token.startsWith('Bearer')) {
        try {
            // Cắt lấy đoạn mã Token thực sự
            token = token.split(' ')[1];
            
            // Giải mã bằng đúng chìa khóa đã dùng lúc Login
            const decoded = jwt.verify(token, 'KhangMedic_Secret_Key'); 
            console.log("DỮ LIỆU TRONG TOKEN LÀ:", decoded);

            // Kiểm tra phân quyền
            if (decoded.role === 'Admin') {
                next(); // Cho phép đi tiếp vào lấy dữ liệu
            } else {
                res.status(403).json({ message: "Chỉ có Admin mới được vào đây!" });
            }
        } catch (error) {
            res.status(401).json({ message: "Token đã bị can thiệp hoặc hết hạn!" });
        }
    } else {
        res.status(401).json({ message: "Không tìm thấy thẻ Token!" });
    }
};

// API Lấy danh sách Tài khoản (Gắn chốt bảo vệ protectAdmin vào giữa)
router.get('/', protectAdmin, async (req, res) => {
    try {
        // Lấy tất cả user nhưng loại bỏ trường password cho an toàn
        const users = await User.find().select('-password').sort({ createdAt: -1 }); 
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Lỗi hệ thống", error });
    }
});

module.exports = router;