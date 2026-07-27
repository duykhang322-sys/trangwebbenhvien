const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// 1. API ĐĂNG KÝ
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Kiểm tra email trùng
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "Email này đã được sử dụng!" });

        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: "Đăng ký thành công!" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
});

// 2. API ĐĂNG NHẬP
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Tìm user có email và password khớp nhau
        const user = await User.findOne({ email, password });
        if (!user) return res.status(400).json({ message: "Sai email hoặc mật khẩu!" });

        // Tạo thẻ Token (Kẹp ID và Role vào thẻ)
        const token = jwt.sign({ id: user._id, role: user.role }, 'KhangMedic_Secret_Key', { expiresIn: '1d' });

        res.status(200).json({ 
            message: "Đăng nhập thành công!", 
            token: token, 
            user: { name: user.name, email: user.email, role: user.role } 
        });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
});

module.exports = router;