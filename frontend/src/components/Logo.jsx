import React from 'react';

const Logo = ({ width = 180, height = 40, darkTheme = false }) => {
    // Nếu darkTheme = true (nền tối), icon màu trắng, chữ màu trắng
    // Nếu darkTheme = false (nền sáng), icon màu xanh, chữ màu xanh
    const iconBg = darkTheme ? "#ffffff" : "#1565c0";
    const pulseLine = darkTheme ? "#1565c0" : "#ffffff";
    const textFill = darkTheme ? "#ffffff" : "#1565c0";

    return (
        <svg width={width} height={height} viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="5" width="30" height="30" rx="8" fill={iconBg} />
            <path d="M6 20 H11 L14 12 L19 28 L23 20 H26" stroke={pulseLine} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            
            <text x="40" y="27" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="bold" fill={textFill}>
                Medi<tspan fill="#4caf50">Connect</tspan>
            </text>
        </svg>
    );
};

export default Logo;