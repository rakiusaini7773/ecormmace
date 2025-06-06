import React from 'react';

const CustomButton = ({ children, onClick, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-black text-white hover:bg-gray-800"
      style={{
        borderRadius: '5px',
        textAlign: 'center',
        fontSize: '12px',
        fontWeight: 600,
        lineHeight: 'normal',
        padding: '3px 20px',
        height: '33px',
      }}
    >
      {children}
    </button>
  );
};

export default CustomButton;
