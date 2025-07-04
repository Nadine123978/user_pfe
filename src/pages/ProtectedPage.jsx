import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProtectedPage() {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(null); // null = جاري التحقق

  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp;
      const now = Math.floor(Date.now() / 1000);
      console.log("exp:", payload.exp);
console.log("now:", Math.floor(Date.now() / 1000));
console.log("expired?", payload.exp < Math.floor(Date.now() / 1000));
      return exp < now;
    } catch (error) {
      return true;
    }
  };

 useEffect(() => {
  console.log("useEffect triggered");
  const token = localStorage.getItem('token');
  console.log("Token from localStorage:", token);

  if (!token || isTokenExpired(token)) {
    console.log("Token expired or missing, redirecting...");
    navigate('/login', { replace: true });
  } else {
    console.log("Token valid");
    setIsAuthorized(true);
  }
}, [navigate]);


  if (isAuthorized === null) {
    return <div>Checking authorization...</div>; // أو يمكنك استخدام spinner
  }

  return (
    <div>
      <h1>Protected Content</h1>
    </div>
  );
}

export default ProtectedPage;
