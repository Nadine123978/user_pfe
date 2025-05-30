import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // ✅ لإعادة التوجيه

  const tokenUrl = searchParams.get('token');
  const backendToken = new URL(tokenUrl).searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8081/auth/reset-password', {
        token: backendToken,
        newPassword: password
      });

      setMessage("Password reset successfully!");

      // ✅ توجيه المستخدم إلى الصفحة الرئيسية بعد 2 ثانية مثلاً
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (error) {
      console.error(error);
      setMessage("Error resetting password.");
    }
  };

  return (
    <div className="container" style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Reset Your Password</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleReset}>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button type="submit" style={{ marginTop: "20px", padding: "10px", width: "100%" }}>
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassPage;
