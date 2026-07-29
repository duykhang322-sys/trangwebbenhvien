const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Gọi thư viện để đọc file .env

// Import Model
const Doctor = require('./models/Doctor');
// const Appointment = require('./models/Appointment');

// Import Routes cũ
const DoctorRoutes = require('./routes/DoctorRoutes');
const AppointmentRoutes = require('./routes/AppointmentRoutes');
const AuthRoutes = require('./routes/AuthRoutes');
const MedicalRecordRoutes = require('./routes/MedicalRecordRoutes');
const InvoiceRoutes = require('./routes/InvoiceRoutes');
const UserRoutes = require('./routes/UserRoutes');
const StatsRoutes = require('./routes/StatsRoutes'); 
const NewsRoutes = require('./routes/NewsRoutes'); 

const app = express();

app.use(cors());
app.use(express.json());

// ==============================================================
// BẢO MẬT KẾT NỐI DATABASE BẰNG BIẾN MÔI TRƯỜNG
// ==============================================================
// Đọc đúng tên biến MONGODB_URI từ file .env
const mongoURI = process.env.MONGODB_URI; 

mongoose.connect(mongoURI).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});


// ==============================================================
// CÁC API MỚI 
// ==============================================================

// 1. Lấy danh sách toàn bộ bác sĩ
app.get('/api/doctors', async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server nội bộ" });
    }
});

// 2. Thêm Bác sĩ mới
app.post('/api/doctors', async (req, res) => {
    try {
        const newDoctor = new Doctor(req.body);
        await newDoctor.save();
        res.status(201).json({ message: 'Thêm bác sĩ thành công!', doctor: newDoctor });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error });
    }
});

// 3. Xóa bác sĩ
app.delete('/api/doctors/:id', async (req, res) => {
    try {
        await Doctor.findByIdAndDelete(req.params.id);
        res.json({ message: 'Đã xóa bác sĩ thành công!' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa', error });
    }
});

// 4. Lấy thông tin 1 bác sĩ
app.get('/api/doctors/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi tìm bác sĩ', error });
    }
});

// 5. Cập nhật dữ liệu mới
app.put('/api/doctors/:id', async (req, res) => {
    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedDoctor);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi cập nhật', error });
    }
});

// 6. Lưu Lịch khám mới
app.post('/api/appointments', async (req, res) => {
    try {
        console.log("Đã nhận đơn đặt lịch:", req.body);
        res.status(201).json({ message: 'Đặt lịch thành công!' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi đặt lịch', error });
    }
});


// ==============================================================
// KHAI BÁO CÁC ROUTER CŨ Ở DƯỚI CÙNG
// ==============================================================
app.use('/api/doctors', DoctorRoutes);
app.use('/api/appointments', AppointmentRoutes);
app.use('/api/auth', AuthRoutes); // Đã xóa dòng auth bị lặp dư
app.use('/api/records', MedicalRecordRoutes);
app.use('/api/invoices', InvoiceRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/stats', StatsRoutes);
app.use('/api/news', NewsRoutes);


// ==============================================================
// CẤU HÌNH PORT ĐỘNG CHO RENDER
// ==============================================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//ep git nhan code moi