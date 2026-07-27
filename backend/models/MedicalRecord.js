const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
    patientName: { type: String, required: true },
    doctorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Doctor', // Liên kết sang bảng Doctor để lấy tên và chuyên khoa
        required: true 
    },
    diagnosis: { type: String, required: true },
    treatment: { type: String },
    notes: { type: String }
}, { timestamps: true }); // Tự động thêm ngày giờ tạo bệnh án (createdAt)

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);