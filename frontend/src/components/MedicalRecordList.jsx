import React from 'react';
import { Link } from 'react-router-dom';

const MedicalRecordList = () => {
    const records = [
        { id: "BA-1001", patient: "Lê Văn B", doctor: "BS. CKII Nguyễn Văn A", diagnosis: "Rối loạn nhịp tim", date: "25/07/2026" },
        { id: "BA-1002", patient: "Trần Thị C", doctor: "BS. Phạm Thị D", diagnosis: "Viêm họng hạt cấp tính", date: "22/07/2026" },
        { id: "BA-1003", patient: "Phạm Hoàng D", doctor: "BS. CKI Lê Hoàng C", diagnosis: "Thoái hóa đốt sống cổ", date: "20/07/2026" },
    ];

    return (
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <div>
                    <h2 style={{ color: '#1565c0', margin: 0 }}>📋 Hồ sơ Bệnh án</h2>
                    <p style={{ color: '#666', marginTop: '5px' }}>Quản lý lịch sử khám bệnh và chẩn đoán lâm sàng.</p>
                </div>
                <Link to="/admin/add-record" className="hover-btn" style={{ padding: '10px 20px', backgroundColor: '#4caf50', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold' }}>
                    + Thêm Bệnh Án
                </Link>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f4f6f8', borderBottom: '2px solid #e0e0e0' }}>
                            <th style={{ padding: '15px', color: '#333' }}>Mã BA</th>
                            <th style={{ padding: '15px', color: '#333' }}>Tên Bệnh nhân</th>
                            <th style={{ padding: '15px', color: '#333' }}>Bác sĩ chẩn đoán</th>
                            <th style={{ padding: '15px', color: '#333' }}>Chẩn đoán bệnh</th>
                            <th style={{ padding: '15px', color: '#333' }}>Ngày khám</th>
                            <th style={{ padding: '15px', color: '#333', textAlign: 'center' }}>Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((rec) => (
                            <tr key={rec.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '15px', color: '#1565c0', fontWeight: 'bold' }}>{rec.id}</td>
                                <td style={{ padding: '15px', color: '#333', fontWeight: 'bold' }}>{rec.patient}</td>
                                <td style={{ padding: '15px', color: '#555' }}>{rec.doctor}</td>
                                <td style={{ padding: '15px', color: '#d32f2f', fontWeight: '500' }}>{rec.diagnosis}</td>
                                <td style={{ padding: '15px', color: '#555' }}>{rec.date}</td>
                                <td style={{ padding: '15px', textAlign: 'center' }}>
                                    <button style={{ padding: '6px 12px', backgroundColor: '#e3f2fd', border: 'none', color: '#1565c0', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Xem</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        </div>
    );
};

export default MedicalRecordList;