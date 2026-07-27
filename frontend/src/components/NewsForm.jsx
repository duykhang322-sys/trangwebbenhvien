import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewsForm = () => {
    const navigate = useNavigate();
    
    // ĐÃ THÊM: Biến summary vào kho chứa dữ liệu
    const [formData, setFormData] = useState({
        title: '', summary: '', content: '', author: 'Admin Khang', imageUrl: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/news', formData);
            alert("Đăng bài Cẩm nang thành công!");
            navigate('/admin/news'); 
        } catch (error) {
            console.error("Lỗi:", error);
            alert("Đăng bài thất bại, vui lòng kiểm tra lại server!");
        }
    };

    return (
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', maxWidth: '800px', margin: '0 auto' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '2px solid #f0f0f0', paddingBottom: '15px' }}>
                <h2 style={{ color: '#1565c0', margin: 0 }}>📝 Đăng Bài Cẩm Nang Y Tế</h2>
                <button type="button" onClick={() => navigate('/admin/news')} style={{ padding: '8px 15px', backgroundColor: '#f4f6f8', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', color: '#555', fontWeight: 'bold' }}>
                    &larr; Quay lại
                </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    <div style={{ flex: '2', minWidth: '300px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Tiêu đề bài viết (*)</label>
                        <input name="title" value={formData.title} onChange={handleChange} required type="text" placeholder="Ví dụ: Dấu hiệu nhận biết bệnh sốt xuất huyết..." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', backgroundColor: 'white', color: '#333' }} />
                    </div>
                    <div style={{ flex: '1', minWidth: '200px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Người đăng</label>
                        <input name="author" value={formData.author} onChange={handleChange} type="text" readOnly style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', backgroundColor: '#f0f0f0', color: '#666', cursor: 'not-allowed' }} />
                    </div>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Link Ảnh Bìa (Tùy chọn)</label>
                    <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} type="text" placeholder="Nhập đường link ảnh bìa bài viết..." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', backgroundColor: 'white', color: '#333' }} />
                </div>

                {/* ĐÃ THÊM: Ô nhập Tóm tắt bài viết */}
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Đoạn tóm tắt ngắn (*)</label>
                    <textarea name="summary" value={formData.summary} onChange={handleChange} required rows="3" placeholder="Nhập 1-2 câu tóm tắt nội dung để hiển thị ở trang chủ..." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', fontFamily: 'inherit', backgroundColor: 'white', color: '#333' }}></textarea>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Nội dung chi tiết (*)</label>
                    <textarea name="content" value={formData.content} onChange={handleChange} required rows="10" placeholder="Nhập nội dung bài viết vào đây..." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', fontFamily: 'inherit', backgroundColor: 'white', color: '#333' }}></textarea>
                </div>

                <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button type="submit" className="hover-btn" style={{ padding: '12px 30px', backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}>
                        Đăng Bài Viết
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewsForm;