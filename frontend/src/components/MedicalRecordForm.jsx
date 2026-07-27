import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MedicalRecordForm = () => {
    const navigate = useNavigate();

    // 1. State lưu danh sách bác sĩ để đổ vào Select
    const [doctors, setDoctors] = useState([]);
    
    // 2. State gom toàn bộ dữ liệu người dùng nhập vào form
    const [formData, setFormData] = useState({
        patientName: '',
        doctorId: '',
        diagnosis: '',
        treatment: '',
        notes: ''
    });

    // Kéo danh sách bác sĩ khi vừa mở form
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/doctors');
                setDoctors(response.data);
            } catch (error) {
                console.error("Lỗi tải danh sách bác sĩ:", error);
            }
        };
        fetchDoctors();
    }, []);

    // 3. Hàm bắt sự kiện khi gõ phím hoặc chọn select
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 4. Hàm xử lý khi bấm nút "Lưu Bệnh Án"
    const handleSubmit = async (e) => {
        e.preventDefault(); // Chặn hành vi load lại trang mặc định
        
        try {
            const token = localStorage.getItem('token'); // Lấy thẻ VIP
            
            // Bắn dữ liệu lên Backend (Nhớ check lại đường link API bên backend nha)
            await axios.post('http://localhost:5000/api/records', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            alert("Lưu bệnh án thành công!");
            navigate('/admin/records'); // Lưu xong cho quay về trang danh sách bệnh án
            
        } catch (error) {
            console.error("Lỗi khi lưu bệnh án:", error);
            alert("Lỗi hệ thống! Không thể lưu bệnh án lúc này.");
        }
    };

    return (
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', maxWidth: '800px', margin: '0 auto' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '2px solid #f0f0f0', paddingBottom: '15px' }}>
                <h2 style={{ color: '#1565c0', margin: 0 }}>📝 Thêm Bệnh Án Mới</h2>
                <button onClick={() => navigate('/admin/records')} className="hover-btn" style={{ padding: '8px 15px', backgroundColor: '#f4f6f8', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', color: '#555', fontWeight: 'bold' }}>
                    &larr; Quay lại
                </button>
            </div>

            {/* Gắn sự kiện onSubmit vào thẻ form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1', minWidth: '300px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Tên Bệnh Nhân (*)</label>
                        <input 
                            name="patientName" value={formData.patientName} onChange={handleChange} required
                            type="text" placeholder="Nhập tên bệnh nhân..." 
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }} 
                        />
                    </div>
                    <div style={{ flex: '1', minWidth: '300px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Bác sĩ phụ trách (*)</label>
                        <select 
                            name="doctorId" value={formData.doctorId} onChange={handleChange} required
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                        >
                            <option value="">-- Chọn bác sĩ --</option>
                            {doctors.map((doc) => (
                                <option key={doc._id} value={doc._id}>
                                    {doc.name} - {doc.specialty}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Chẩn đoán sơ bộ (*)</label>
                    <input 
                        name="diagnosis" value={formData.diagnosis} onChange={handleChange} required
                        type="text" placeholder="Ví dụ: Viêm phế quản cấp tính..." 
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }} 
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Hướng điều trị / Kê đơn thuốc</label>
                    <textarea 
                        name="treatment" value={formData.treatment} onChange={handleChange}
                        rows="4" placeholder="Ghi rõ tên thuốc, số lượng và liều dùng..." 
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', fontFamily: 'inherit' }}
                    ></textarea>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Lời dặn của bác sĩ</label>
                    <textarea 
                        name="notes" value={formData.notes} onChange={handleChange}
                        rows="3" placeholder="Ví dụ: Kiêng đồ lạnh, uống nhiều nước..." 
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', fontFamily: 'inherit' }}
                    ></textarea>
                </div>

                <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button type="submit" className="hover-btn" style={{ padding: '12px 30px', backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}>
                        Lưu Bệnh Án
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MedicalRecordForm;