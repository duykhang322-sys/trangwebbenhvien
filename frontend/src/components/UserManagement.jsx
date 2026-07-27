import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Lỗi lấy danh sách tài khoản:', error);
        }
    };

    useEffect(() => {
    const fetchUsers = async () => {
        try {
            // 1. Lấy thẻ Token từ trong kho lưu trữ của trình duyệt ra
            const token = localStorage.getItem('token'); 
            
            // 2. Kẹp thẻ Token đó vào Header gửi đi
            const response = await axios.get('http://localhost:5000/api/users', {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
            
            setUsers(response.data);
        } catch (error) {
            console.error("Lỗi lấy danh sách tài khoản:", error);
            if (error.response && error.response.status === 401) {
                alert("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");
            }
        }
    };
    fetchUsers();
}, []);
    const handleRoleChange = async (id, newRole) => {
        try {
            await axios.put(`http://localhost:5000/api/users/role/${id}`, { role: newRole });
            alert('Cập nhật quyền thành công!');
            fetchUsers();
        } catch (error) {
            alert('Lỗi khi cập nhật quyền.');
        }
    };

    return (
        <div>
            <h2>Quản lý Tài khoản (Dành cho Admin)</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={{ border: '1px solid #ddd', padding: '10px' }}>Tên đăng nhập</th>
                        <th style={{ border: '1px solid #ddd', padding: '10px' }}>Ngày tạo</th>
                        <th style={{ border: '1px solid #ddd', padding: '10px' }}>Phân quyền</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td style={{ border: '1px solid #ddd', padding: '10px', fontWeight: 'bold' }}>{user.email}</td>
                            <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                                {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                            </td>
                            <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>
                                <select 
                                    value={user.role} 
                                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                    style={{ padding: '8px', borderRadius: '4px' }}
                                >
                                    <option value="Patient">Bệnh nhân</option>
                                    <option value="Doctor">Bác sĩ</option>
                                    <option value="Receptionist">Lễ tân</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;