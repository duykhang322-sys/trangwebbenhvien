const Appointment = require('../models/Appointment');

const createAppointment = async (req, res) => {
    try {
        console.log("1️⃣ Dữ liệu gốc từ Frontend gửi xuống:", req.body);

        // Phiên dịch sang ngôn ngữ của MongoDB
        const translatedData = {
            patientName: req.body.patientName,
            patientPhone: req.body.phone,           // Chuyển phone -> patientPhone
            reason: req.body.symptoms,              // Chuyển symptoms -> reason
            appointmentDate: req.body.date,         // Chuyển date -> appointmentDate
            age: 18,                                // Gán đại 18 tuổi để không bị báo lỗi thiếu
            timeSlot: 'Chờ xếp lịch'
        };
        console.log("2️⃣ Dữ liệu sau khi phiên dịch:", translatedData);

        const newApp = new Appointment(translatedData);
        const savedApp = await newApp.save();
        
        console.log("3️⃣ ✅ ĐÃ LƯU THÀNH CÔNG VÀO MONGODB:", savedApp);
        res.status(201).json(savedApp);
    } catch (error) {
        console.error("❌ BÁO ĐỘNG LỖI LƯU DATABASE:", error.message);
        res.status(500).json({ message: 'Lỗi đặt lịch', error: error.message });
    }
};

const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().populate('doctorId', 'name specialty');
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi lấy lịch khám', error: error.message });
    }
};

const deleteAppointment = async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Xóa lịch khám thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi xóa lịch khám', error: error.message });
    }
};

const updateStatus = async (req, res) => {
    try {
        const updatedApp = await Appointment.findByIdAndUpdate(
            req.params.id, 
            { status: req.body.status }, 
            { new: true }
        );
        res.status(200).json(updatedApp);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi cập nhật trạng thái', error: error.message });
    }
};

module.exports = { createAppointment, getAppointments, deleteAppointment, updateStatus };