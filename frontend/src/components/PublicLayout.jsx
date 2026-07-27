import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Logo from '../components/Logo';
const PublicLayout = () => {
    return (
        <div style={{ width: '100vw', minHeight: '100vh', display: 'flex', flexDirection: 'column', margin: 0, padding: 0, overflowX: 'hidden'}}>
            <nav style={{ width: '100%', padding: '15px 5%', boxSizing: 'border-box', backgroundColor: '#ffffff', boxShadow: '0 2px 10px rgba(219, 35, 35, 0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ color: '#2196F3', textDecoration: 'none', fontSize: '1.8rem', fontWeight: '900' }}>
                    <Logo width={180} height={40} />
                </Link>
                <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: '#555', fontWeight: '600' }}>Trang chủ</Link>
                    <Link to="/doctors" style={{ textDecoration: 'none', color: '#555', fontWeight: '600' }}>Bác sĩ</Link>
                    <Link to="/news" style={{ textDecoration: 'none', color: '#555', fontWeight: '600' }}>Cẩm nang y tế</Link>
                    <Link to="/login" style={{ textDecoration: 'none', color: '#2196F3', fontWeight: 'bold', border: '1px solid #2196F3', padding: '8px 16px', borderRadius: '6px' }}>Nhân viên</Link>
                </div>
            </nav>

            {/* Outlet này sẽ nhận full width từ cha */}
            <div style={{ width: '100%', flex: 1, }}>
                <Outlet />
            </div>

            {/* Footer Mới */}
            <footer style={{ backgroundColor: '#0d47a1', color: 'white', padding: '50px 5% 20px 5%', marginTop: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '30px', marginBottom: '40px' }}>
                    
                    <div style={{ flex: '1', minWidth: '250px' }}>
                        <h3 style={{ fontSize: '1.8rem', marginBottom: '15px', color: '#90caf9', margin: '0 0 15px 0' }}>MediConnect</h3>
                        <p style={{ lineHeight: '1.6', color: '#bbdefb' }}>Kế thừa tinh hoa y học, tiên phong ứng dụng công nghệ. MediConnect cam kết mang lại dịch vụ chăm sóc sức khỏe tiêu chuẩn quốc tế.</p>
                    </div>

                    <div style={{ flex: '1', minWidth: '250px' }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', borderBottom: '2px solid #1976d2', paddingBottom: '10px', display: 'inline-block' }}>Liên hệ</h3>
                        <p style={{ margin: '10px 0', color: '#bbdefb' }}>📍 Đại học Văn Lang, Cơ sở chính, TP.HCM</p>
                        <p style={{ margin: '10px 0', color: '#bbdefb' }}>📞 Hotline: 1900 1234</p>
                        <p style={{ margin: '10px 0', color: '#bbdefb' }}>📧 Email: cskh@mediconnect.vn</p>
                    </div>

                    <div style={{ flex: '1', minWidth: '250px' }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', borderBottom: '2px solid #1976d2', paddingBottom: '10px', display: 'inline-block' }}>Giờ làm việc</h3>
                        <p style={{ margin: '10px 0', color: '#bbdefb' }}>Thứ 2 - Thứ 6: 07:00 - 20:00</p>
                        <p style={{ margin: '10px 0', color: '#bbdefb' }}>Thứ 7 - Chủ Nhật: 07:00 - 17:00</p>
                        <p style={{ margin: '10px 0', color: '#ffb74d', fontWeight: 'bold' }}>🚨 Cấp cứu: 24/7</p>
                    </div>
                </div>

                <div style={{ textAlign: 'center', borderTop: '1px solid #1976d2', paddingTop: '20px', color: '#90caf9', fontSize: '0.9rem' }}>
                    &copy; 2026 Bệnh viện Đa khoa MediConnect. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default PublicLayout;