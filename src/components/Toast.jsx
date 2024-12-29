import { useState, useEffect } from 'react';

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer); 
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      className={`fixed bottom-5 right-5 px-4 py-2 rounded-md shadow-lg transition-all duration-300 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      }`}
    >
      <div className="flex items-center text-white">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-3 text-lg font-bold hover:text-gray-300"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Toast;
