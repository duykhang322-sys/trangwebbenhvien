import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DoctorForm = () => {
    const navigate = useNavigate();

    // Đã đổi 'exp' thành 'experience' cho khớp với Database
    const [formData, setFormData] = useState({
        name: '', specialty: '', phone: '', email: '', experience: '', consultationFee: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/doctors', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Thêm bác sĩ mới thành công!");
            navigate('/admin/doctors');
        } catch (error) {
            console.error("Lỗi:", error);
            alert("Thêm thất bại, check lại thông tin nha!");
        }
    };

    return (
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', maxWidth: '800px', margin: '0 auto' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '2px solid #f0f0f0', paddingBottom: '15px' }}>
                <h2 style={{ color: '#1565c0', margin: 0 }}>➕ Thêm Bác Sĩ Mới</h2>
                <button type="button" onClick={() => navigate('/admin/doctors')} style={{ padding: '8px 15px', backgroundColor: '#f4f6f8', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', color: '#555', fontWeight: 'bold' }}>
                    &larr; Quay lại
                </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1', minWidth: '300px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Họ và Tên (*)</label>
                        <input name="name" value={formData.name} onChange={handleChange} required type="text" placeholder="Nhập tên bác sĩ" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', backgroundColor: 'white', color: '#333' }} />
                    </div>
                    <div style={{ flex: '1', minWidth: '300px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Chuyên khoa (*)</label>
                        <select name="specialty" value={formData.specialty} onChange={handleChange} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', backgroundColor: 'white', color: '#333' }}>
                            <option value="">-- Chọn chuyên khoa --</option>
                            <option value="Tim mạch">Tim mạch</option>
                            <option value="Thần kinh">Thần kinh</option>
                            <option value="Chỉnh hình">Chỉnh hình</option>
                            <option value="Nhi khoa">Nhi khoa</option>
                        </select>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1', minWidth: '300px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Số điện thoại (*)</label>
                        <input name="phone" value={formData.phone} onChange={handleChange} required type="tel" placeholder="090..." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', backgroundColor: 'white', color: '#333' }} />
                    </div>
                    <div style={{ flex: '1', minWidth: '300px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Email</label>
                        <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="bacsia@khangmedic.vn" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', backgroundColor: 'white', color: '#333' }} />
                    </div>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Phí khám bệnh (VNĐ) (*)</label>
                    <input name="consultationFee" value={formData.consultationFee} onChange={handleChange} required type="number" placeholder="Ví dụ: 200000" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', backgroundColor: 'white', color: '#333' }} />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Tiểu sử / Kinh nghiệm làm việc</label>
                    {/* Đổi name="experience" và value={formData.experience} */}
                    <textarea name="experience" value={formData.experience} onChange={handleChange} rows="5" placeholder="Nhập thông tin chi tiết về kinh nghiệm làm việc..." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', fontFamily: 'inherit', backgroundColor: 'white', color: '#333' }}></textarea>
                </div>

                <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button type="submit" className="hover-btn" style={{ padding: '12px 30px', backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}>
                        Lưu Thông Tin
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DoctorForm;