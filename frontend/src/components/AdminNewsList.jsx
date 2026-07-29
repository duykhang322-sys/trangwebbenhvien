import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminNewsList = () => {
    const [news, setNews] = useState([]);
    const navigate = useNavigate();

    // 1. Phải KHAI BÁO hàm trước
    const fetchNews = async () => {
        try {
            const response = await axios.get('https://mediconnect-backend-api.onrender.com/api/news');
            setNews(response.data);
        } catch (error) {
            console.error("Lỗi lấy danh sách cẩm nang:", error);
        }
    };

    // 2. Rồi mới được GỌI HÀM trong useEffect
    useEffect(() => {
        fetchNews();
    }, []);

    const handleDelete = async (id) => {
        const isConfirm = window.confirm("Bạn có chắc chắn muốn xóa bài viết này không?");
        if (isConfirm) {
            try {
                await axios.delete(`https://mediconnect-backend-api.onrender.com/api/news/${id}`);
                alert("Đã xóa bài viết thành công!");
                setNews(news.filter(item => item._id !== id));
            } catch (error) {
                console.error("Lỗi khi xóa:", error);
                alert("Xóa thất bại, kiểm tra lại server nhé!");
            }
        }
    };

    return (
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ color: '#1565c0', margin: 0 }}>📰 Quản Lý Cẩm Nang Y Tế</h2>
                <button onClick={() => navigate('/admin/news/add')} className="hover-btn" style={{ padding: '10px 20px', backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                    + Thêm Bài Mới
                </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f4f6f8', borderBottom: '2px solid #ddd' }}>
                            <th style={{ padding: '15px', color: '#333' }}>STT</th>
                            <th style={{ padding: '15px', color: '#333' }}>Tiêu đề</th>
                            <th style={{ padding: '15px', color: '#333' }}>Tác giả</th>
                            <th style={{ padding: '15px', color: '#333' }}>Ngày đăng</th>
                            <th style={{ padding: '15px', color: '#333', textAlign: 'center' }}>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {news.length > 0 ? (
                            news.map((item, index) => (
                                <tr key={item._id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '15px', color: '#555' }}>{index + 1}</td>
                                    <td style={{ padding: '15px', color: '#1565c0', fontWeight: 'bold' }}>{item.title}</td>
                                    <td style={{ padding: '15px', color: '#555' }}>{item.author}</td>
                                    <td style={{ padding: '15px', color: '#555' }}>
                                        {new Date(item.createdAt).toLocaleDateString('vi-VN')}
                                    </td>
                                    <td style={{ padding: '15px', textAlign: 'center' }}>
                                        {/* Thay nút Sửa cũ bằng dòng này */}
                                        <button onClick={() => navigate(`/admin/news/edit/${item._id}`)} style={{ padding: '6px 12px', backgroundColor: '#ff9800', color: 'white', border: 'none', borderRadius: '5px', marginRight: '5px', cursor: 'pointer' }}>Sửa</button>
                                        <button onClick={() => handleDelete(item._id)} style={{ padding: '6px 12px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Xóa</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
                                    Chưa có bài viết nào. Hãy bấm "Thêm Bài Mới" nhé!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminNewsList;