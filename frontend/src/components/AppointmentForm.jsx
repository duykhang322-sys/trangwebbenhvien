import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentForm = () => {
    const [doctors, setDoctors] = useState([]);
    const [formData, setFormData] = useState({
        patientName: '',
        patientPhone: '',
        age: '',
        reason: '',
        doctorId: '',
        appointmentDate: '',
        timeSlot: ''
    });

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/doctors');
                setDoctors(response.data);
            } catch (error) {
                console.error('Lỗi lấy danh sách bác sĩ:', error);
            }
        };
        fetchDoctors();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            await axios.post('http://localhost:5000/api/appointments/book', formData);
            alert('Đặt lịch khám thành công!');
            setFormData({
                patientName: '', patientPhone: '', age: '', reason: '', 
                doctorId: '', appointmentDate: '', timeSlot: ''
            });
        } catch (error) {
            alert('Lỗi khi đặt lịch, vui lòng thử lại.');
            console.error(error);
        }
    };

    return (
        <div style={{ marginTop: '40px', padding: '20px', border: '1px dashed #2196F3', borderRadius: '8px', maxWidth: '500px' }}>
            <h2>Đăng ký lịch khám</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input type="text" name="patientName" placeholder="Tên bệnh nhân" value={formData.patientName} onChange={handleChange} required />
                <input type="text" name="patientPhone" placeholder="Số điện thoại" value={formData.patientPhone} onChange={handleChange} required />
                <input type="number" name="age" placeholder="Tuổi" value={formData.age} onChange={handleChange} required />
                <textarea name="reason" placeholder="Triệu chứng/Lý do khám" value={formData.reason} onChange={handleChange} required />
                
                <select name="doctorId" value={formData.doctorId} onChange={handleChange} required>
                    <option value="">-- Chọn Bác sĩ --</option>
                    {doctors.map(doctor => (
                        <option key={doctor._id} value={doctor._id}>
                            {doctor.name} ({doctor.specialty})
                        </option>
                    ))}
                </select>

                <input type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} required />
                
                <select name="timeSlot" value={formData.timeSlot} onChange={handleChange} required>
                    <option value="">-- Chọn Giờ --</option>
                    <option value="08:00 - 09:00">08:00 - 09:00</option>
                    <option value="09:00 - 10:00">09:00 - 10:00</option>
                    <option value="14:00 - 15:00">14:00 - 15:00</option>
                </select>

                <button type="submit" style={{ padding: '10px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Xác nhận đặt lịch
                </button>
            </form>
        </div>
    );
};

export default AppointmentForm;