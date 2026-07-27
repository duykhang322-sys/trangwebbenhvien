const MedicalRecord = require('../models/MedicalRecord');

// API Lưu bệnh án mới
const createRecord = async (req, res) => {
    try {
        const newRecord = new MedicalRecord(req.body);
        const savedRecord = await newRecord.save();
        res.status(201).json(savedRecord);
    } catch (error) {
        console.error("Lỗi tạo bệnh án:", error);
        res.status(500).json({ message: 'Lỗi khi lưu bệnh án', error: error.message });
    }
};

// API Lấy danh sách bệnh án (Có nối bảng để lấy thông tin bác sĩ)
const getRecords = async (req, res) => {
    try {
        // Hàm populate giúp lôi luôn cái 'name' và 'specialty' của bác sĩ ra
        const records = await MedicalRecord.find().populate('doctorId', 'name specialty');
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi lấy danh sách bệnh án', error: error.message });
    }
};

module.exports = { createRecord, getRecords };