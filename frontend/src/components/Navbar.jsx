import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
        window.location.reload();
    };

    return (
        <nav style={{ padding: '15px', backgroundColor: '#2196F3', marginBottom: '20px', display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Trang chủ</Link>
            
            {user?.role === 'Admin' && (
                <>
                    <Link to="/admin/dashboard" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Thống kê</Link>
                    <Link to="/admin/users" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Tài khoản</Link>
                </>
            )}

            <Link to="/admin/doctors" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Bác sĩ</Link>
            
            {user?.role === 'Admin' && (
                <Link to="/admin/add-doctor" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Thêm Bác sĩ</Link>
            )}
            
            {(user?.role === 'Patient' || user?.role === 'Receptionist' || user?.role === 'Admin') && (
                <Link to="/admin/book" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Đặt lịch</Link>
            )}
            
            {(user?.role === 'Admin' || user?.role === 'Receptionist' || user?.role === 'Doctor') && (
                <Link to="/admin/appointments" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Lịch hẹn</Link>
            )}

            {(user?.role === 'Admin' || user?.role === 'Doctor') && (
                <Link to="/admin/add-record" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Tạo Bệnh án</Link>
            )}

            {token && (
                <>
                    <Link to="/admin/records" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Hồ sơ Bệnh án</Link>
                    <Link to="/admin/invoices" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Viện phí</Link>
                </>
            )}
            
            <div style={{ marginLeft: 'auto' }}>
                {token ? (
                    <>
                        <span style={{ color: 'white', marginRight: '15px' }}>{user?.username} ({user?.role})</span>
                        <button onClick={handleLogout} style={{ padding: '5px 10px', cursor: 'pointer', border: 'none', backgroundColor: 'white', color: '#2196F3', fontWeight: 'bold' }}>
                            Đăng xuất
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', marginRight: '15px' }}>Đăng nhập</Link>
                        <Link to="/register" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Đăng ký</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;