import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProtectedPage() {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(null); // null = جاري التحقق

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true });
    } else {
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
