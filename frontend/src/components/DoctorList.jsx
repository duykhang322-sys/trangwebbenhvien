import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 

const DoctorList = () => {
    // 1. Khởi tạo kho chứa dữ liệu rỗng
    const [doctors, setDoctors] = useState([]);

    // 2. Hàm gọi API kéo dữ liệu có gắn "Thẻ VIP"
    const fetchDoctors = async () => {
        try {
            const token = localStorage.getItem('token'); 
            const response = await axios.get('http://localhost:5000/api/doctors', {
                headers: { Authorization: `Bearer ${token}` }
            }); 
            setDoctors(response.data); 
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu bác sĩ:", error);
        }
    };

    // 3. Tự động chạy hàm kéo dữ liệu khi mở trang Admin
    useEffect(() => {
        fetchDoctors();
    }, []);

    const handleDelete = async (id) => {
        // Hiện thông báo hỏi lại cho chắc chắn
        if (window.confirm("Khang có chắc chắn muốn xóa bác sĩ này khỏi hệ thống không?")) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:5000/api/doctors/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // Xóa xong thì lọc ông đó ra khỏi màn hình ngay lập tức (không cần F5)
                setDoctors(doctors.filter(doc => doc._id !== id));
                alert("Xóa thành công!");
            } catch (error) {
                console.error("Lỗi khi xóa:", error);
                alert("Xóa thất bại, kiểm tra lại server nhé!");
            }
        }
    };

    return (
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            
            {/* Header của bảng */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h2 style={{ color: '#1565c0', margin: 0 }}>👨‍⚕️ Quản lý Bác sĩ</h2>
                <Link to="/admin/add-doctor" className="hover-btn" style={{ padding: '10px 20px', backgroundColor: '#4caf50', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold' }}>
                    + Thêm Bác Sĩ Mới
                </Link>
            </div>

            {/* Bảng dữ liệu */}
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f4f6f8', borderBottom: '2px solid #e0e0e0' }}>
                            <th style={{ padding: '15px', color: '#333' }}>STT</th>
                            <th style={{ padding: '15px', color: '#333' }}>Họ và Tên</th>
                            <th style={{ padding: '15px', color: '#333' }}>Chuyên khoa</th>
                            <th style={{ padding: '15px', color: '#333' }}>Số điện thoại</th>
                            <th style={{ padding: '15px', color: '#333' }}>Trạng thái</th>
                            <th style={{ padding: '15px', color: '#333', textAlign: 'center' }}>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.map((doc, index) => (
                            // Dùng _id của MongoDB làm key
                            <tr key={doc._id || index} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '15px', color: '#666' }}>#{index + 1}</td>
                                <td style={{ padding: '15px', fontWeight: 'bold', color: '#1565c0' }}>{doc.name}</td>
                                <td style={{ padding: '15px', color: '#555' }}>{doc.specialty}</td>
                                {/* Nếu DB chưa có phone thì hiện chữ Chưa cập nhật */}
                                <td style={{ padding: '15px', color: '#555' }}>{doc.phone || "Chưa cập nhật"}</td>
                                <td style={{ padding: '15px' }}>
                                    <span style={{ 
                                        padding: '5px 10px', 
                                        borderRadius: '20px', 
                                        fontSize: '0.85rem', 
                                        fontWeight: 'bold',
                                        backgroundColor: doc.status === 'Đang làm việc' ? '#e8f5e9' : '#fff3e0',
                                        color: doc.status === 'Đang làm việc' ? '#2e7d32' : '#ef6c00'
                                    }}>
                                        {doc.status || "Đang làm việc"}
                                    </span>
                                </td>
                                <td style={{ padding: '15px', textAlign: 'center' }}>
                                {/* Biến nút Sửa thành Link để nó biết đường chuyển trang */}
                                <Link 
                                    to={`/admin/edit-doctor/${doc._id}`} 
                                    style={{ display: 'inline-block', marginRight: '10px', padding: '6px 12px', backgroundColor: '#fff', border: '1px solid #2196F3', color: '#2196F3', borderRadius: '5px', textDecoration: 'none', cursor: 'pointer' }}
                                >
                                    Sửa
                                </Link>
                                    <button 
                                        onClick={() => handleDelete(doc._id)}
                                        style={{ padding: '6px 12px', backgroundColor: '#fff', border: '1px solid #f44336', color: '#f44336', borderRadius: '5px', cursor: 'pointer' }}
                                    >
                                        Xóa
                                    </button>   
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        </div>
    );
};

export default DoctorList;