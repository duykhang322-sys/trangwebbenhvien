const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Model
const Doctor = require('./models/Doctor');
// const Appointment = require('./models/Appointment'); // Nếu Khang có file model Appointment thì bỏ dấu // ở đầu dòng này nha

// Import Routes cũ
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const authRoutes = require('./routes/authRoutes');
const medicalRecordRoutes = require('./routes/medicalRecordRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const userRoutes = require('./routes/userRoutes');
const statsRoutes = require('./routes/statsRoutes'); 
const newsRoutes = require('./routes/newsRoutes'); 

const app = express();

app.use(cors());
app.use(express.json());

// Kết nối Database
mongoose.connect('mongodb+srv://duykhang322_db_user:231124@cluster0.d8rv5cp.mongodb.net/?appName=Cluster0').then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});


// ==============================================================
// ĐẶT API MỚI Ở ĐÂY ĐỂ CHẠY TRƯỚC, KHÔNG BỊ ROUTER CŨ CHẶN LẠI
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
        // Tạm thời log ra để Khang thấy dữ liệu chạy xuống Backend thành công
        console.log("Đã nhận đơn đặt lịch:", req.body);
        res.status(201).json({ message: 'Đặt lịch thành công!' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi đặt lịch', error });
    }
});


// ==============================================================
// KHAI BÁO CÁC ROUTER CŨ Ở DƯỚI CÙNG
// ==============================================================
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/records', medicalRecordRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/auth', authRoutes);
// Khởi động Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});