import React from 'react';

const InvoiceList = () => {
    const invoices = [
        { id: "HD-2026-001", patient: "Lê Văn B", service: "Khám chuyên khoa Tim mạch + Siêu âm", amount: "1,500,000 VNĐ", date: "25/07/2026", status: "Đã thanh toán" },
        { id: "HD-2026-002", patient: "Trần Thị C", service: "Khám Tổng quát", amount: "450,000 VNĐ", date: "22/07/2026", status: "Chưa thanh toán" },
        { id: "HD-2026-003", patient: "Phạm Hoàng D", service: "Chụp X-Quang + Thuốc", amount: "2,100,000 VNĐ", date: "20/07/2026", status: "Đã thanh toán" },
    ];

    return (
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            
            <div style={{ marginBottom: '25px' }}>
                <h2 style={{ color: '#1565c0', margin: 0 }}>💰 Quản lý Viện phí</h2>
                <p style={{ color: '#666', marginTop: '5px' }}>Theo dõi hóa đơn dịch vụ và tình trạng thanh toán.</p>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f4f6f8', borderBottom: '2px solid #e0e0e0' }}>
                            <th style={{ padding: '15px', color: '#333' }}>Mã HĐ</th>
                            <th style={{ padding: '15px', color: '#333' }}>Bệnh nhân</th>
                            <th style={{ padding: '15px', color: '#333' }}>Dịch vụ y tế</th>
                            <th style={{ padding: '15px', color: '#333' }}>Tổng tiền</th>
                            <th style={{ padding: '15px', color: '#333' }}>Ngày xuất</th>
                            <th style={{ padding: '15px', color: '#333' }}>Trạng thái</th>
                            <th style={{ padding: '15px', color: '#333', textAlign: 'center' }}>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((inv) => (
                            <tr key={inv.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '15px', color: '#1565c0', fontWeight: 'bold' }}>{inv.id}</td>
                                <td style={{ padding: '15px', color: '#333', fontWeight: 'bold' }}>{inv.patient}</td>
                                <td style={{ padding: '15px', color: '#555' }}>{inv.service}</td>
                                <td style={{ padding: '15px', color: '#d32f2f', fontWeight: 'bold' }}>{inv.amount}</td>
                                <td style={{ padding: '15px', color: '#555' }}>{inv.date}</td>
                                <td style={{ padding: '15px' }}>
                                    <span style={{ 
                                        padding: '5px 10px', 
                                        borderRadius: '20px', 
                                        fontSize: '0.85rem', 
                                        fontWeight: 'bold',
                                        backgroundColor: inv.status === 'Đã thanh toán' ? '#e8f5e9' : '#ffebee',
                                        color: inv.status === 'Đã thanh toán' ? '#2e7d32' : '#c62828'
                                    }}>
                                        {inv.status}
                                    </span>
                                </td>
                                <td style={{ padding: '15px', textAlign: 'center' }}>
                                    <button style={{ padding: '6px 12px', backgroundColor: '#fff', border: '1px solid #2196F3', color: '#2196F3', borderRadius: '5px', cursor: 'pointer' }}>In Hóa Đơn</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        </div>
    );
};

export default InvoiceList;