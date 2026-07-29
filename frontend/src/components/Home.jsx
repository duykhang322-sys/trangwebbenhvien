import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    
    const [featuredDoctors, setFeaturedDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('https://mediconnect-backend-api.onrender.com/api/doctors');
                setFeaturedDoctors(response.data.slice(0, 4));
                setLoading(false);
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu bác sĩ:", error);
                setLoading(false);
            }
        };
        fetchDoctors();
    }, []);

    // 🔴 Danh sách 8 chuyên khoa nổi bật (Đã nâng cấp đầy đủ)
    const specialties = [
        { name: 'Tim mạch', desc: 'Dịch vụ chuyên sâu về tim mạch.', icon: 'https://cdn-icons-png.flaticon.com/512/875/875513.png' },
        { name: 'Thần kinh', desc: 'Chẩn đoán và điều trị bệnh thần kinh.', icon: 'https://cdn-icons-png.flaticon.com/512/2854/2854199.png' },
        { name: 'Chỉnh hình', desc: 'Điều trị chấn thương và cơ xương khớp.', icon: 'https://cdn-icons-png.flaticon.com/512/3063/3063224.png' },
        { name: 'Nhi khoa', desc: 'Chăm sóc sức khỏe toàn diện cho trẻ em.', icon: 'https://cdn-icons-png.flaticon.com/512/2966/2966453.png' },
        { name: 'Da liễu', desc: 'Điều trị và thẩm mỹ da liễu chuyên sâu.', icon: 'https://cdn-icons-png.flaticon.com/512/3141/3141203.png' },
        { name: 'Nha khoa', desc: 'Chăm sóc răng miệng và thiết kế nụ cười.', icon: 'https://cdn-icons-png.flaticon.com/512/2854/2854228.png' },
        { name: 'Mắt', desc: 'Bảo vệ và điều trị các bệnh lý về thị lực.', icon: 'https://cdn-icons-png.flaticon.com/512/2854/2854146.png' },
        { name: 'Tiêu hóa', desc: 'Nội soi và điều trị bệnh lý đường ruột.', icon: 'https://cdn-icons-png.flaticon.com/512/2854/2854284.png' }
    ];

    return (
        <div style={{ width: '100%', backgroundColor: '#ffffff', minHeight: '80vh', color: '#333' }}>
            
            {/* 1. Hero Banner */}
            <div style={{ backgroundColor: '#e3f2fd', padding: '80px 5%', textAlign: 'center', width: '100%', boxSizing: 'border-box' }}>
                <h1 style={{ color: '#1565c0', fontSize: '3rem', marginBottom: '10px' }}>Bệnh viện Đa khoa MediConnect</h1>
                <p style={{ fontSize: '1.2rem', color: '#555', margin: '0 auto 30px', lineHeight: '1.6', maxWidth: '700px' }}>
                    Kế thừa tinh hoa y học, tiên phong ứng dụng công nghệ. Đội ngũ y bác sĩ chuyên môn cao của chúng tôi luôn sẵn sàng đồng hành cùng sức khỏe của bạn và gia đình.
                </p>
                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                    <Link to="/book" className="hover-btn" style={{ padding: '12px 28px', backgroundColor: '#2196F3', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold' }}>
                        Đặt Lịch Khám Ngay
                    </Link>
                    <Link to="/doctors" className="hover-btn" style={{ padding: '12px 28px', backgroundColor: 'white', color: '#2196F3', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold', border: '2px solid #2196F3' }}>
                        Tìm Bác Sĩ
                    </Link>
                </div>
            </div>

            {/* 2. Thống kê */}
            <div style={{ display: 'flex', justifyContent: 'space-around', padding: '50px 5%', color: '#333', flexWrap: 'wrap', gap: '20px' }}>
                <div style={{ textAlign: 'center' }}>
                    <h2 style={{ color: '#2196F3', fontSize: '2.5rem', margin: '0' }}>50+</h2>
                    <p style={{ fontWeight: 'bold' }}>Bác sĩ chuyên khoa</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <h2 style={{ color: '#2196F3', fontSize: '2.5rem', margin: '0' }}>10k+</h2>
                    <p style={{ fontWeight: 'bold' }}>Bệnh nhân tin tưởng</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <h2 style={{ color: '#2196F3', fontSize: '2.5rem', margin: '0' }}>24/7</h2>
                    <p style={{ fontWeight: 'bold' }}>Hỗ trợ y tế</p>
                </div>
            </div>

            {/* 3. Chuyên khoa nổi bật (ĐÃ NÂNG CẤP DẠNG LƯỚI 8 CHUYÊN KHOA) */}
            <div style={{ padding: '20px 5% 60px 5%', backgroundColor: '#f9fafa' }}>
                <h2 style={{ textAlign: 'center', color: '#1565c0', fontSize: '2.2rem', marginBottom: '10px' }}>Chuyên Khoa Nổi Bật</h2>
                <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px', fontSize: '1.05rem' }}>Hệ thống y tế đa khoa với các dịch vụ chăm sóc sức khỏe hàng đầu</p>
                
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '25px',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    {specialties.map((spec, index) => (
                        <div 
                            key={index} 
                            style={{
                                backgroundColor: 'white',
                                padding: '30px 20px',
                                borderRadius: '14px',
                                textAlign: 'center',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
                                border: '1px solid #eef2f6',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <div style={{ 
                                width: '70px', 
                                height: '70px', 
                                margin: '0 auto 15px', 
                                backgroundColor: '#e3f2fd', 
                                borderRadius: '50%', 
                                display: 'flex', 
                                justifyContent: 'center', 
                                alignItems: 'center' 
                            }}>
                                <img src={spec.icon} alt={spec.name} style={{ width: '38px', height: '38px', objectFit: 'contain' }} />
                            </div>
                            <h3 style={{ color: '#1565c0', fontSize: '1.2rem', margin: '0 0 8px 0' }}>{spec.name}</h3>
                            <p style={{ color: '#555', fontSize: '0.9rem', margin: 0, lineHeight: '1.4' }}>{spec.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 4. Đội ngũ Bác sĩ */}
            <div style={{ padding: '50px 5%', backgroundColor: '#ffffff' }}>
                <h2 style={{ textAlign: 'center', color: '#333', fontSize: '2rem', marginBottom: '10px' }}>Đội Ngũ Bác Sĩ Tiêu Biểu</h2>
                <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px' }}>Những chuyên gia y tế hàng đầu luôn tận tâm vì sức khỏe của bạn.</p>
                
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {featuredDoctors.map((doc, index) => (
                        <div key={index} className="hover-card" style={{ padding: '20px', backgroundColor: '#f9fafa', borderRadius: '12px', width: '250px', textAlign: 'center', border: '1px solid #eee' }}>
                            <img 
                                src={doc.image || "https://cdn-icons-png.flaticon.com/512/3774/3774299.png"} 
                                alt={doc.name} 
                                style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', marginBottom: '15px', border: '4px solid #e3f2fd' }} 
                            />
                            <h3 style={{ color: '#2196F3', fontSize: '1.2rem', margin: '0 0 10px 0' }}>{doc.name}</h3>
                            <p style={{ color: '#555', margin: '0', fontWeight: '500' }}>Khoa {doc.specialty}</p>
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <Link to="/doctors" className="hover-btn" style={{ padding: '12px 30px', backgroundColor: 'transparent', color: '#2196F3', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold', border: '2px solid #2196F3', display: 'inline-block' }}>
                        Xem Tất Cả Bác Sĩ &rarr;
                    </Link>
                </div>
            </div>
            
            {/* 5. Cẩm nang Y tế / Tin tức */}
            <div style={{ padding: '50px 5% 80px 5%', backgroundColor: '#f9fafa' }}>
                <h2 style={{ textAlign: 'center', color: '#333', fontSize: '2rem', marginBottom: '10px' }}>Cẩm Nang Y Tế</h2>
                <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px' }}>Kiến thức chăm sóc sức khỏe từ các chuyên gia y tế.</p>
                
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {[
                        { title: "5 Dấu hiệu cảnh báo bệnh tim mạch", desc: "Đừng chủ quan với những cơn đau thắt ngực bất chợt...", date: "20/07/2026" },
                        { title: "Chế độ dinh dưỡng cho người tiểu đường", desc: "Cân bằng chế độ ăn uống giúp kiểm soát lượng đường huyết...", date: "18/07/2026" },
                        { title: "Cách phòng ngừa thoái hóa cột sống", desc: "Tư thế ngồi làm việc chuẩn giúp bảo vệ cột sống của bạn...", date: "15/07/2026" }
                    ].map((news, index) => (
                        <div key={index} className="hover-card" style={{ padding: '20px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #eee', width: '320px', textAlign: 'left', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
                            <div style={{ backgroundColor: '#e3f2fd', height: '160px', borderRadius: '8px', marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>
                                📰
                            </div>
                            <span style={{ fontSize: '0.9rem', color: '#2196F3', fontWeight: 'bold' }}>{news.date}</span>
                            <h3 style={{ color: '#333', fontSize: '1.2rem', margin: '10px 0' }}>{news.title}</h3>
                            <p style={{ color: '#666', margin: '0 0 15px 0', fontSize: '0.95rem', lineHeight: '1.5' }}>{news.desc}</p>
                            <Link to="/news" style={{ color: '#2196F3', textDecoration: 'none', fontWeight: 'bold' }}>Đọc tiếp &rarr;</Link>
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    );
};

export default Home;