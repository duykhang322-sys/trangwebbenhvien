const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Không có quyền truy cập' });

    const token = authHeader.split(' ')[1];
    
    try {
        // 🔴 CHỖ NÀY ĐÂY! Đổi chìa khóa cho giống hệt bên User là chạy mượt:
        const decoded = jwt.verify(token, 'KhangMedic_Secret_Key'); 
        
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
    }
};

const verifyRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Bạn không đủ quyền thực hiện hành động này' });
        }
        next();
    };
};

module.exports = { verifyToken, verifyRole };