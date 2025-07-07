// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import jwtDecode from "jwt-decode";

const isTokenValid = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000; // Convert to seconds
    return decoded.exp && decoded.exp > now;
  } catch (err) {
    return false;
  }
};

const PrivateRoute = ({ children }) => {
  return isTokenValid() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
