import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

// Import Layouts
import PublicLayout from './components/PublicLayout';
import AdminLayout from './components/AdminLayout';

// Import Pages
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';
import DoctorList from './components/DoctorList';
import DoctorForm from './components/DoctorForm';
import AppointmentForm from './components/AppointmentForm';
import AppointmentList from './components/AppointmentList';
import MedicalRecordForm from './components/MedicalRecordForm';
import MedicalRecordList from './components/MedicalRecordList';
import InvoiceList from './components/InvoiceList';
import PublicDoctorList from './components/PublicDoctorList';
import PublicBookingForm from './components/PublicBookingForm';
import NewsList from './components/NewsList';
import EditDoctor from './components/EditDoctor';
import NewsForm from './components/NewsForm';
import EditNews from './components/EditNews';
import AdminNewsList from './components/AdminNewsList';
// Cấu hình Axios
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

function App() {
  return (
    <BrowserRouter>
      {/* 
        Giữ lại toàn bộ code ép full màn hình và hiệu ứng Hover.
        Tạm thời tháo Toastify ra để cứu trang web lên trước! 
      */}
      <style>{`
        html, body, #root {
          width: 100vw !important;
          max-width: 100vw !important;
          margin: 0 !important;
          padding: 0 !important;
          overflow-x: hidden !important;
          display: block !important;
          background-color: #ffffff !important;
        }
        
        /* Hiệu ứng cho nút bấm */
        .hover-btn { transition: all 0.3s ease; }
        .hover-btn:hover { transform: translateY(-3px); box-shadow: 0 8px 15px rgba(33, 150, 243, 0.3) !important; }
        
        /* Hiệu ứng cho các khối chuyên khoa */
        .hover-card { transition: all 0.3s ease; cursor: pointer; }
        .hover-card:hover { transform: translateY(-10px); box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important; }
      `}</style>

      <Routes>
          {/* TRANG PUBLIC */}
          <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/doctors" element={<PublicDoctorList />} />
              <Route path="/book" element={<PublicBookingForm />} />
              <Route path="/news" element={<NewsList />} />
          </Route>

          {/* TRANG ADMIN */}
          <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="doctors" element={<DoctorList />} />
              <Route path="add-doctor" element={<DoctorForm />} />
              <Route path="book" element={<AppointmentForm />} />
              <Route path="appointments" element={<AppointmentList />} />
              <Route path="add-record" element={<MedicalRecordForm />} />
              <Route path="records" element={<MedicalRecordList />} />
              <Route path="invoices" element={<InvoiceList />} />
              <Route path="edit-doctor/:id" element={<EditDoctor />} />
              <Route element={<NewsForm />} path="news/add" />
              <Route path="news/edit/:id" element={<EditNews />} />
              <Route path="news" element={<AdminNewsList />} />
              
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;