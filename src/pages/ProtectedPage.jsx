import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProtectedPage() {
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  return (
    <div>
      <h1>Protected Content</h1>
    </div>
  );
}
