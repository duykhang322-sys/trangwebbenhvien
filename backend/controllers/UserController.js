const User = require('../models/User');

const getUsersByRole = async (req, res) => {
    try {
        const users = await User.find({ role: req.params.role }).select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi lấy danh sách người dùng', error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi lấy danh sách người dùng', error: error.message });
    }
};

const updateUserRole = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            { role: req.body.role }, 
            { new: true }
        ).select('-password');
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi cập nhật quyền', error: error.message });
    }
};

module.exports = { getUsersByRole, getAllUsers, updateUserRole };