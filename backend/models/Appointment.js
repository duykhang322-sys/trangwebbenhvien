const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patientName: { type: String, required: true },
    patientPhone: { type: String, required: true },
    age: { type: Number, required: false }, // Cho phép trống tạm thời
    reason: { type: String, required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: false }, // Lễ tân sẽ xếp bác sĩ sau
    appointmentDate: { type: Date, required: true },
    timeSlot: { type: String, required: false }, // Cho phép trống
    status: { 
        type: String, 
        enum: ['Chờ xác nhận', 'Đã xác nhận', 'Đã khám', 'Hủy'], 
        default: 'Chờ xác nhận' 
    }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);