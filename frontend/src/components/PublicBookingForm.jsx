import React, { useState, useEffect } from 'react'; // Bổ sung import useEffect
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PublicBookingForm = () => {
    const navigate = useNavigate();

    // 1. THÊM MỚI: Khai báo state chứa danh sách bác sĩ
    const [doctors, setDoctors] = useState([]);

    // 2. Khởi tạo state lưu dữ liệu người dùng nhập
    const [formData, setFormData] = useState({
        patientName: '', phone: '', specialty: '', date: '', symptoms: ''
    });

    // 3. THÊM MỚI: Kéo dữ liệu bác sĩ từ Backend khi vừa mở form
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                // Lưu ý: Đảm bảo link API này khớp với Backend của ông nha
                const response = await axios.get('http://localhost:5000/api/doctors'); 
                setDoctors(response.data);
            } catch (error) {
                console.error("Lỗi khi tải danh sách bác sĩ:", error);
            }
        };
        fetchDoctors();
    }, []);

    // Hàm bắt sự kiện gõ phím
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Hàm gửi dữ liệu lên server
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/appointments/book', formData);
            alert("Đặt lịch thành công! KhangMedic sẽ liên hệ bạn sớm.");
            navigate('/'); // Quay về trang chủ
        } catch (error) {
            console.error("Lỗi:", error);
            alert("Lỗi đặt lịch, vui lòng thử lại!");
        }
    };

    // Bây giờ biến này sẽ hoạt động hoàn hảo vì doctors đã có dữ liệu
    const uniqueSpecialties = [...new Set(doctors.map(doc => doc.specialty))];

    return (
        <div style={{ width: '100%', backgroundColor: '#f9fafa', minHeight: '80vh', padding: '50px 5%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '15px', width: '100%', maxWidth: '600px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
                <h2 style={{ color: '#1565c0', textAlign: 'center', fontSize: '2rem', marginBottom: '10px' }}>Đặt Lịch Khám</h2>
                <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>Vui lòng điền thông tin để chúng tôi sắp xếp lịch tốt nhất cho bạn.</p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                        <div style={{ flex: '1', minWidth: '250px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Họ và Tên</label>
                            <input name="patientName" value={formData.patientName} onChange={handleChange} required type="text" placeholder="Nguyễn Văn A" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', backgroundColor: 'white', color: '#333' }} />
                        </div>
                        <div style={{ flex: '1', minWidth: '250px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Số điện thoại</label>
                            <input name="phone" value={formData.phone} onChange={handleChange} required type="tel" placeholder="0909..." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', backgroundColor: 'white', color: '#333' }} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                        <div style={{ flex: '1', minWidth: '250px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Chuyên khoa</label>
                            <select name="specialty" value={formData.specialty} onChange={handleChange} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', backgroundColor: 'white', color: '#333' }}>
                                <option value="">-- Chọn chuyên khoa --</option>
                                {uniqueSpecialties.map((spec, index) => (
                                    <option key={index} value={spec}>
                                        {spec}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div style={{ flex: '1', minWidth: '250px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Ngày khám mong muốn</label>
                            <input name="date" value={formData.date} onChange={handleChange} required type="date" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', backgroundColor: 'white', color: '#333' }} />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Triệu chứng / Vấn đề sức khỏe</label>
                        <textarea name="symptoms" value={formData.symptoms} onChange={handleChange} rows="4" placeholder="Mô tả ngắn gọn tình trạng của bạn..." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', fontFamily: 'inherit', backgroundColor: 'white', color: '#333' }}></textarea>
                    </div>

                    <button type="submit" className="hover-btn" style={{ marginTop: '10px', padding: '15px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}>
                        Xác Nhận Đặt Lịch
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PublicBookingForm;