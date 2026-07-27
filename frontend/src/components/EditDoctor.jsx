import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditDoctor = () => {
    const { id } = useParams(); // Lấy ID bác sĩ từ thanh URL
    const navigate = useNavigate(); // Dùng để chuyển trang sau khi lưu
    
    // Kho chứa dữ liệu form
    const [formData, setFormData] = useState({
        name: '', specialty: '', phone: '', exp: '', img: '', status: 'Đang làm việc'
    });

    // Vừa mở trang lên là đi lấy dữ liệu cũ đắp vào form
    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/doctors/${id}`);
                setFormData(res.data);
            } catch (error) {
                console.error("Lỗi lấy thông tin:", error);
            }
        };
        fetchDoctor();
    }, [id]);

    // Hàm xử lý khi gõ phím vào ô text
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Hàm xử lý khi bấm nút Lưu
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/doctors/${id}`, formData);
            alert("Cập nhật thông tin thành công!");
            navigate('/admin/doctors'); // Về lại danh sách
        } catch (error) {
            alert("Lỗi khi cập nhật!");
        }
    };

   return (
            <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', maxWidth: '600px', margin: '0 auto', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                <h2 style={{ color: '#1565c0', marginBottom: '20px' }}>✏️ Cập nhật Bác sĩ</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Họ và tên bác sĩ" required style={inputStyle} />
                    <input type="text" name="specialty" value={formData.specialty} onChange={handleChange} placeholder="Chuyên khoa (VD: Tim mạch)" required style={inputStyle} />
                    <input type="text" name="phone" value={formData.phone || ''} onChange={handleChange} placeholder="Số điện thoại" style={inputStyle} />
                    <input type="text" name="exp" value={formData.exp} onChange={handleChange} placeholder="Kinh nghiệm (VD: 10 năm kinh nghiệm)" style={inputStyle} />
                    <input type="text" name="img" value={formData.img} onChange={handleChange} placeholder="Link ảnh (https://...)" style={inputStyle} />
                    
                    <select name="status" value={formData.status} onChange={handleChange} style={inputStyle}>
                        <option value="Đang làm việc">Đang làm việc</option>
                        <option value="Nghỉ phép">Nghỉ phép</option>
                    </select>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        <button type="button" onClick={() => navigate('/admin/doctors')} style={cancelBtnStyle}>Hủy</button>
                        <button type="submit" style={submitBtnStyle}>Lưu thay đổi</button>
                    </div>
                </form>
            </div>
        );
    }
// CSS viết gọn
const inputStyle = { padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem' };
const submitBtnStyle = { flex: 1, padding: '12px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' };
const cancelBtnStyle = { flex: 1, padding: '12px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' };

export default EditDoctor;