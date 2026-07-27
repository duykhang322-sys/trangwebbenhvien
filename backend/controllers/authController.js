const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = new User({ username, password: hashedPassword, role });
        await newUser.save();
        
        res.status(201).json({ message: 'Tạo tài khoản thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo tài khoản', error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: 'Không tìm thấy tài khoản' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Mật khẩu không đúng' });

        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            'BIMAT_CUA_HE_THONG', 
            { expiresIn: '1d' }
        );
        
        res.status(200).json({ token, user: { username: user.username, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi đăng nhập', error: error.message });
    }
};

module.exports = { register, login };