import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditNews = () => {
    const { id } = useParams(); // Lấy ID bài viết từ URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '', summary: '', content: '', author: '', imageUrl: ''
    });

    // Tự động kéo dữ liệu cũ điền vào Form
    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`https://mediconnect-backend-api.onrender.com/api/news/${id}`);
                setFormData(response.data);
            } catch (error) {
                console.error("Lỗi lấy dữ liệu:", error);
                alert("Không tìm thấy bài viết!");
            }
        };
        fetchArticle();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://mediconnect-backend-api.onrender.com/api/news/${id}`, formData);
            alert("Cập nhật bài viết thành công!");
            navigate('/admin/news');
        } catch (error) {
            console.error("Lỗi cập nhật:", error);
            alert("Cập nhật thất bại!");
        }
    };

    return (
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '2px solid #f0f0f0', paddingBottom: '15px' }}>
                <h2 style={{ color: '#ff9800', margin: 0 }}>✏️ Chỉnh Sửa Bài Viết</h2>
                <button type="button" onClick={() => navigate('/admin/news')} style={{ padding: '8px 15px', backgroundColor: '#f4f6f8', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}>
                    &larr; Hủy & Quay lại
                </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    <div style={{ flex: '2', minWidth: '300px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Tiêu đề (*)</label>
                        <input name="title" value={formData.title} onChange={handleChange} required type="text" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
                    </div>
                    <div style={{ flex: '1', minWidth: '200px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Người đăng</label>
                        <input name="author" value={formData.author} readOnly type="text" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', backgroundColor: '#eee' }} />
                    </div>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Link Ảnh Bìa</label>
                    <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} type="text" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Tóm tắt (*)</label>
                    <textarea name="summary" value={formData.summary} onChange={handleChange} required rows="3" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}></textarea>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Nội dung (*)</label>
                    <textarea name="content" value={formData.content} onChange={handleChange} required rows="10" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}></textarea>
                </div>

                <div style={{ textAlign: 'right' }}>
                    <button type="submit" style={{ padding: '12px 30px', backgroundColor: '#ff9800', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                        Lưu Thay Đổi
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditNews;