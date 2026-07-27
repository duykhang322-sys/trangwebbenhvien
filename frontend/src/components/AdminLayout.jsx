import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from '../components/Logo';

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Để tô màu menu đang được chọn

    const handleLogout = () => {
        // Tạm thời chỉ chuyển hướng về trang login, sau này làm logic xóa token sau
        navigate('/login');
    };

    // Danh sách menu bên trái
    const menuItems = [
        { path: '/admin/dashboard', label: '📊 Tổng quan' },
        { path: '/admin/users', label: '👥 Quản lý Người dùng' },
        { path: '/admin/doctors', label: '👨‍⚕️ Quản lý Bác sĩ' },
        { path: '/admin/appointments', label: '📅 Lịch khám' },
        { path: '/admin/records', label: '📋 Hồ sơ bệnh án' },
        { path: '/admin/invoices', label: '💰 Quản lý Viện phí' },
        { path: '/admin/news', label: '📝 Cẩm nang y tế' } // <-- Dòng mới ông vừa thêm vào
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f6f8' }}>
            
            {/* Cột Sidebar bên trái */}
            <div style={{ width: '260px', backgroundColor: '#1565c0', color: 'white', display: 'flex', flexDirection: 'column', boxShadow: '2px 0 10px rgba(0,0,0,0.1)' }}>
                <div style={{ padding: '25px 20px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    
                    {/* 🔴 ĐÃ THAY THẾ CHỮ BẰNG COMPONENT LOGO VÀ ÉP RA GIỮA */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
                        <Logo width={160} height={35} darkTheme={true} />
                    </div>
                    
                    <p style={{ margin: '0', fontSize: '0.9rem', color: '#90caf9', fontWeight: 'bold' }}>Hệ Thống Quản Trị</p>
                </div>
                
                <nav style={{ flex: 1, padding: '20px 0' }}>
                    {menuItems.map((item, index) => {
                        // Kiểm tra xem URL hiện tại có khớp với menu này không để tô đậm
                        const isActive = location.pathname.includes(item.path);
                        return (
                            <Link 
                                key={index} 
                                to={item.path} 
                                style={{
                                    display: 'block',
                                    padding: '15px 25px',
                                    color: 'white',
                                    textDecoration: 'none',
                                    backgroundColor: isActive ? '#0d47a1' : 'transparent',
                                    borderLeft: isActive ? '5px solid #64b5f6' : '5px solid transparent',
                                    transition: 'background-color 0.2s',
                                    fontWeight: isActive ? 'bold' : 'normal'
                                }}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
                
                <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
                    <Link to="/" style={{ color: '#90caf9', textDecoration: 'none', fontSize: '0.9rem' }}>
                        &larr; Xem giao diện Bệnh nhân
                    </Link>
                </div>
            </div>

            {/* Khu vực Nội dung chính bên phải */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                
                {/* Thanh Topbar */}
                <header style={{ backgroundColor: 'white', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ margin: 0, color: '#333' }}>Trang Chủ Quản Trị</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <span style={{ color: '#1565c0', fontWeight: 'bold' }}>Chào, Admin Khang!</span>
                        <button onClick={handleLogout} className="hover-btn" style={{ padding: '8px 20px', backgroundColor: '#ffebee', color: '#d32f2f', border: '1px solid #ffcdd2', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                            Đăng xuất
                        </button>
                    </div>
                </header>

                {/* Nội dung các trang con sẽ được nhúng vào đây nhờ <Outlet /> */}
                <main style={{ padding: '30px', flex: 1, overflowY: 'auto' }}>
                    <Outlet />
                </main>
                
            </div>
        </div>
    );
};

export default AdminLayout;