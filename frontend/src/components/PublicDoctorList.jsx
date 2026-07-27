import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PublicDoctorList = () => {
    // 1. Khai báo kho chứa dữ liệu rỗng
    const [doctors, setDoctors] = useState([]);

    // 2. Tự động gọi API lấy dữ liệu thật từ Backend
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/doctors');
                setDoctors(response.data);
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu bác sĩ:", error);
            }
        };
        fetchDoctors();
    }, []);

    return (
        <div style={{ width: '100%', backgroundColor: '#f9fafa', minHeight: '80vh', paddingBottom: '50px' }}>
            
            {/* Banner Trang Bác sĩ */}
            <div style={{ backgroundColor: '#1565c0', padding: '60px 5%', textAlign: 'center', color: 'white' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Đội ngũ Bác sĩ Chuyên khoa</h1>
                <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', color: '#bbdefb', lineHeight: '1.6' }}>
                    MediConnect tự hào quy tụ đội ngũ chuyên gia, bác sĩ đầu ngành với nhiều năm kinh nghiệm, luôn tận tâm vì sức khỏe của bạn.
                </p>
            </div>

            {/* Danh sách Bác sĩ (Dạng lưới - Grid) */}
            <div style={{ padding: '50px 5%', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {doctors.map((doc, index) => (
                        <div key={doc._id || index} className="hover-card" style={{ backgroundColor: 'white', padding: '30px', borderRadius: '15px', width: '280px', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
                            
                            {/* 🔴 ĐÃ SỬA: Đổi doc.img thành doc.image */}
                            <img 
                                src={doc.image || "https://cdn-icons-png.flaticon.com/512/3774/3774299.png"} 
                                alt={doc.name} 
                                style={{ width: '130px', height: '130px', borderRadius: '50%', objectFit: 'cover', marginBottom: '20px', border: '4px solid #e3f2fd' }} 
                            />
                            
                            <h3 style={{ color: '#1565c0', fontSize: '1.3rem', margin: '0 0 10px 0' }}>{doc.name}</h3>
                            <p style={{ color: '#2196F3', fontWeight: 'bold', margin: '0 0 5px 0' }}>Khoa {doc.specialty}</p>
                            
                            {/* 🔴 ĐÃ SỬA: Đổi doc.exp thành doc.experience */}
                            <p style={{ color: '#666', fontSize: '0.9rem', margin: '0 0 20px 0' }}>🎓 {doc.experience || "Chưa cập nhật kinh nghiệm"}</p>
                            
                            {/* Link đặt lịch */}
                            <Link to={`/book?doctor=${doc._id}`} className="hover-btn" style={{ display: 'block', padding: '12px', backgroundColor: '#2196F3', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold' }}>
                                Đặt Lịch Khám
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default PublicDoctorList;