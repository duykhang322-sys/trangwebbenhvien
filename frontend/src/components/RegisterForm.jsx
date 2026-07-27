import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', formData);
            alert('Đăng ký thành công! Đăng nhập ngay nhé.');
            navigate('/login');
        } catch (error) {
            alert(error.response?.data?.message || 'Lỗi đăng ký!');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '10px' }}>
            <h2 style={{ textAlign: 'center', color: '#1565c0' }}>Đăng Ký Tài Khoản</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input required placeholder="Họ và Tên" onChange={e => setFormData({...formData, name: e.target.value})} style={{ padding: '10px' }} />
                <input required type="email" placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} style={{ padding: '10px' }} />
                <input required type="password" placeholder="Mật khẩu" onChange={e => setFormData({...formData, password: e.target.value})} style={{ padding: '10px' }} />
                <button type="submit" style={{ padding: '10px', backgroundColor: '#4caf50', color: 'white', border: 'none', cursor: 'pointer' }}>Đăng Ký</button>
            </form>
        </div>
    );
};
export default RegisterForm;