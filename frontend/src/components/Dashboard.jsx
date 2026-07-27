import React from 'react';

const Dashboard = () => {
    // Dữ liệu giả lập cho các thẻ thống kê
    const stats = [
        { title: 'Tổng Bác Sĩ', value: '52', icon: '👨‍⚕️', color: '#e3f2fd', textColor: '#1565c0' },
        { title: 'Bệnh Nhân Mới', value: '128', icon: '👥', color: '#e8f5e9', textColor: '#2e7d32' },
        { title: 'Lịch Hẹn Hôm Nay', value: '45', icon: '📅', color: '#fff3e0', textColor: '#ef6c00' },
        { title: 'Doanh Thu (Tháng)', value: '1.2B VNĐ', icon: '💰', color: '#fce4ec', textColor: '#c2185b' },
    ];

    return (
        <div>
            <h2 style={{ color: '#1565c0', marginBottom: '20px', marginTop: 0 }}>📊 Tổng Quan Hệ Thống</h2>
            
            {/* Các thẻ thống kê */}
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '40px' }}>
                {stats.map((stat, index) => (
                    <div key={index} className="hover-card" style={{ flex: '1', minWidth: '200px', backgroundColor: stat.color, padding: '25px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                        <div>
                            <p style={{ margin: '0 0 10px 0', color: '#555', fontWeight: 'bold' }}>{stat.title}</p>
                            <h3 style={{ margin: 0, fontSize: '1.8rem', color: stat.textColor }}>{stat.value}</h3>
                        </div>
                        <div style={{ fontSize: '3rem' }}>{stat.icon}</div>
                    </div>
                ))}
            </div>

            {/* Hoạt động gần đây */}
            <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                <h3 style={{ margin: '0 0 20px 0', color: '#333', borderBottom: '2px solid #f0f0f0', paddingBottom: '10px' }}>Hoạt động gần đây</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    <li style={{ padding: '15px 0', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
                        <span>🟢 Bệnh nhân <strong>Trần Văn X</strong> vừa đặt lịch khám Khoa Tim mạch.</span>
                        <span style={{ color: '#888', fontSize: '0.9rem' }}>5 phút trước</span>
                    </li>
                    <li style={{ padding: '15px 0', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
                        <span>🔵 Bác sĩ <strong>Nguyễn Văn A</strong> đã cập nhật hồ sơ bệnh án.</span>
                        <span style={{ color: '#888', fontSize: '0.9rem' }}>20 phút trước</span>
                    </li>
                    <li style={{ padding: '15px 0', display: 'flex', justifyContent: 'space-between' }}>
                        <span>🟡 Bệnh nhân <strong>Lê Thị Y</strong> đã thanh toán viện phí thành công.</span>
                        <span style={{ color: '#888', fontSize: '0.9rem' }}>1 giờ trước</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;