import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AlertProps {
  type: 'success' | 'error';
  message: string;
}

const Alert = ({ type, message }: AlertProps) => {
  const notify = () => {
    toast(message, {
      position: 'bottom-left',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      type: type === 'success' ? 'success' : 'error',
    });
  };

  notify();

  return null;
};

export default Alert;
