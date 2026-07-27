import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsList = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/news').then(res => setNews(res.data));
    }, []);

    return (
        <div style={{ padding: '40px', maxWidth: '1000px', margin: 'auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Cẩm Nang Y Tế</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {news.map(item => (
                    <div key={item._id} style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '15px', backgroundColor: 'white' }}>
                        {item.imageUrl && <img src={item.imageUrl} alt="news" style={{ width: '100%', borderRadius: '8px' }} />}
                        <h3>{item.title}</h3>
                        <p style={{ color: '#666' }}>{item.summary}</p>
                        <button style={{ backgroundColor: '#2196F3', color: 'white', border: 'none', padding: '8px', borderRadius: '5px' }}>Đọc thêm</button>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default NewsList;