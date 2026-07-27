const Doctor = require('../models/Doctor');

const getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách', error: error.message });
    }
};

const addDoctor = async (req, res) => {
    try {
        const newDoctor = new Doctor(req.body);
        const savedDoctor = await newDoctor.save();
        res.status(201).json({ message: 'Thêm bác sĩ thành công', doctor: savedDoctor });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi thêm bác sĩ', error: error.message });
    }
};

const deleteDoctor = async (req, res) => {
    try {
        await Doctor.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Xóa bác sĩ thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa bác sĩ', error: error.message });
    }
};

const updateDoctor = async (req, res) => {
    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedDoctor);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi cập nhật bác sĩ', error: error.message });
    }
};

module.exports = { getDoctors, addDoctor, deleteDoctor, updateDoctor };