import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://mediconnect-backend-api.onrender.com/api/auth/login', formData);
            
            // LƯU TOKEN VÀO LOCALSTORAGE
            localStorage.setItem('token', response.data.token);
            alert('Đăng nhập thành công!');

            // Phân quyền điều hướng
            if (response.data.user.role === 'Admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/');
            }
        } catch (error) {
            alert(error.response?.data?.message || 'Lỗi đăng nhập!');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '10px' }}>
            <h2 style={{ textAlign: 'center', color: '#1565c0' }}>Đăng Nhập</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input required type="email" placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} style={{ padding: '10px' }} />
                <input required type="password" placeholder="Mật khẩu" onChange={e => setFormData({...formData, password: e.target.value})} style={{ padding: '10px' }} />
                <button type="submit" style={{ padding: '10px', backgroundColor: '#1565c0', color: 'white', border: 'none', cursor: 'pointer' }}>Đăng Nhập</button>
            </form>
        </div>
    );
};
export default LoginForm;