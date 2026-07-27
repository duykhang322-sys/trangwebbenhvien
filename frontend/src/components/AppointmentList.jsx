import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentList = () => {
    // 1. Khởi tạo state rỗng để chứa dữ liệu từ Backend
    const [appointments, setAppointments] = useState([]);

    // 2. Tự động gọi API kéo dữ liệu khi vừa mở trang
    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            // Lấy thẻ VIP từ kho chứa của trình duyệt
            const token = localStorage.getItem('token'); 
            
            // Gửi kèm thẻ VIP qua headers
            const response = await axios.get('http://localhost:5000/api/appointments', {
                headers: { Authorization: `Bearer ${token}` }
            }); 
            setAppointments(response.data);
        } catch (error) {
            console.error("Lỗi kéo dữ liệu:", error);
            alert("Không lấy được danh sách lịch khám!");
        }
    };

    // 3. Hàm xử lý khi bấm nút "Duyệt" hoặc "Hủy"
    const handleUpdateStatus = async (id, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            console.log("🕵️‍♂️ Thẻ VIP đang cầm là:", token);  
            // Tham số thứ 3 của axios.put chính là headers chứa Token
            await axios.put(`http://localhost:5000/api/appointments/${id}/status`, 
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            setAppointments(appointments.map(app => 
                app._id === id ? { ...app, status: newStatus } : app
            ));
            alert(`Đã chuyển trạng thái thành: ${newStatus}`);
        } catch (error) {
            console.error("Lỗi cập nhật:", error);
            alert("Lỗi khi cập nhật trạng thái!");
        }
    };
    return (
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            
            <div style={{ marginBottom: '25px' }}>
                <h2 style={{ color: '#1565c0', margin: 0 }}>📅 Quản lý Lịch hẹn</h2>
                <p style={{ color: '#666', marginTop: '5px' }}>Xem và xử lý các yêu cầu đặt lịch khám từ bệnh nhân.</p>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f4f6f8', borderBottom: '2px solid #e0e0e0' }}>
                            <th style={{ padding: '15px', color: '#333' }}>Mã LH</th>
                            <th style={{ padding: '15px', color: '#333' }}>Bệnh nhân</th>
                            <th style={{ padding: '15px', color: '#333' }}>SĐT</th>
                            <th style={{ padding: '15px', color: '#333' }}>Triệu chứng</th>
                            <th style={{ padding: '15px', color: '#333' }}>Ngày khám</th>
                            <th style={{ padding: '15px', color: '#333' }}>Trạng thái</th>
                            <th style={{ padding: '15px', color: '#333', textAlign: 'center' }}>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((app) => (
                            <tr key={app._id} style={{ borderBottom: '1px solid #eee' }}>
                                {/* Dùng slice( -5) để cắt lấy 5 số cuối của ID cho gọn */}
                                <td style={{ padding: '15px', color: '#1565c0', fontWeight: 'bold' }}>#{app._id.slice(-5)}</td>
                                
                                {/* Phải đổi tên biến cho khớp với Schema Backend */}
                                <td style={{ padding: '15px', color: '#333', fontWeight: 'bold' }}>{app.patientName}</td>
                                <td style={{ padding: '15px', color: '#555' }}>{app.patientPhone}</td>
                                <td style={{ padding: '15px', color: '#555' }}>{app.reason}</td>
                                
                                {/* Format lại ngày tháng cho đẹp */}
                                <td style={{ padding: '15px', color: '#555' }}>
                                    {new Date(app.appointmentDate).toLocaleDateString('vi-VN')}
                                </td>
                                
                                <td style={{ padding: '15px' }}>
                                    <span style={{ 
                                        padding: '5px 10px', 
                                        borderRadius: '20px', 
                                        fontSize: '0.85rem', 
                                        fontWeight: 'bold',
                                        backgroundColor: app.status === 'Chờ xác nhận' ? '#fff3e0' : app.status === 'Đã xác nhận' ? '#e3f2fd' : '#e8f5e9',
                                        color: app.status === 'Chờ xác nhận' ? '#ef6c00' : app.status === 'Đã xác nhận' ? '#1565c0' : '#2e7d32'
                                    }}>
                                        {app.status}
                                    </span>
                                </td>
                                <td style={{ padding: '15px', textAlign: 'center' }}>
                                    {app.status === 'Chờ xác nhận' && (
                                        <>
                                            {/* Gắn sự kiện onClick gọi hàm cập nhật */}
                                            <button 
                                                onClick={() => handleUpdateStatus(app._id, 'Đã xác nhận')}
                                                style={{ marginRight: '10px', padding: '6px 12px', backgroundColor: '#4caf50', border: 'none', color: 'white', borderRadius: '5px', cursor: 'pointer' }}>
                                                Duyệt
                                            </button>
                                            <button 
                                                onClick={() => handleUpdateStatus(app._id, 'Hủy')}
                                                style={{ padding: '6px 12px', backgroundColor: '#fff', border: '1px solid #f44336', color: '#f44336', borderRadius: '5px', cursor: 'pointer' }}>
                                                Hủy
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        </div>
    );
};

export default AppointmentList;