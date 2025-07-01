import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Table, TableHead, TableRow, TableCell, TableBody, Box, Typography, CircularProgress } from "@mui/material";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8081/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;500;600;700&display=swap');
        
        .galactic-container {
          background: linear-gradient(135deg, #0D0E2B 0%, #1A1B3A 50%, #2D1B69 100%);
          min-height: 100vh;
          padding: 40px 20px;
          position: relative;
          overflow: hidden;
        }
        
        .galactic-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 20%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(138, 43, 226, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(255, 0, 255, 0.05) 0%, transparent 50%);
          animation: containerNebula 25s ease-in-out infinite alternate;
          z-index: 1;
        }
        
        @keyframes containerNebula {
          0% { 
            transform: scale(1) rotate(0deg);
            opacity: 0.6;
          }
          100% { 
            transform: scale(1.05) rotate(1deg);
            opacity: 0.9;
          }
        }
        
        .floating-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 2;
        }
        
        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: #FFD700;
          border-radius: 50%;
          animation: floatUp 15s infinite linear;
          box-shadow: 0 0 6px #FFD700;
        }
        
        .particle:nth-child(1) { left: 10%; animation-delay: 0s; }
        .particle:nth-child(2) { left: 20%; animation-delay: 2s; }
        .particle:nth-child(3) { left: 30%; animation-delay: 4s; }
        .particle:nth-child(4) { left: 40%; animation-delay: 6s; }
        .particle:nth-child(5) { left: 50%; animation-delay: 8s; }
        .particle:nth-child(6) { left: 60%; animation-delay: 10s; }
        .particle:nth-child(7) { left: 70%; animation-delay: 12s; }
        .particle:nth-child(8) { left: 80%; animation-delay: 14s; }
        .particle:nth-child(9) { left: 90%; animation-delay: 1s; }
        .particle:nth-child(10) { left: 15%; animation-delay: 3s; }
        
        @keyframes floatUp {
          0% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
            transform: scale(1);
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) scale(0);
            opacity: 0;
          }
        }
        
        .main-content {
          position: relative;
          z-index: 10;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .galactic-title {
          font-family: 'Orbitron', monospace;
          font-weight: 900;
          font-size: 2.5rem;
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-align: center;
          margin-bottom: 40px;
          text-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
          position: relative;
          letter-spacing: 2px;
        }
        
        .galactic-title::after {
          content: '✨';
          position: absolute;
          right: -40px;
          top: 50%;
          transform: translateY(-50%);
          animation: sparkle 2s ease-in-out infinite;
        }
        
        .galactic-title::before {
          content: '✨';
          position: absolute;
          left: -40px;
          top: 50%;
          transform: translateY(-50%);
          animation: sparkle 2s ease-in-out infinite reverse;
        }
        
        @keyframes sparkle {
          0%, 100% { 
            opacity: 0.5;
            transform: translateY(-50%) scale(1);
          }
          50% { 
            opacity: 1;
            transform: translateY(-50%) scale(1.2);
          }
        }
        
        .galactic-table-container {
          background: rgba(13, 14, 43, 0.8);
          backdrop-filter: blur(20px);
          border: 2px solid rgba(255, 215, 0, 0.3);
          border-radius: 20px;
          padding: 30px;
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.5),
            0 0 40px rgba(255, 215, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }
        
        .galactic-table-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 30% 30%, rgba(255, 215, 0, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(138, 43, 226, 0.05) 0%, transparent 50%);
          pointer-events: none;
          z-index: 1;
        }
        
        .table-content {
          position: relative;
          z-index: 2;
        }
        
        .galactic-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
        }
        
        .table-header {
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(138, 43, 226, 0.2) 100%);
          border-radius: 12px 12px 0 0;
        }
        
        .header-cell {
          font-family: 'Orbitron', monospace !important;
          font-weight: 700 !important;
          font-size: 0.9rem !important;
          color: #FFD700 !important;
          text-transform: uppercase !important;
          letter-spacing: 1px !important;
          padding: 20px 16px !important;
          border-bottom: 2px solid rgba(255, 215, 0, 0.5) !important;
          text-shadow: 0 0 10px rgba(255, 215, 0, 0.5) !important;
          position: relative !important;
        }
        
        .header-cell::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #FFD700, transparent);
          animation: headerShimmer 3s ease-in-out infinite;
        }
        
        @keyframes headerShimmer {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        
        .table-row {
          transition: all 0.3s ease !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
        }
        
        .table-row:hover {
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(138, 43, 226, 0.1) 100%) !important;
          transform: translateX(8px) scale(1.02) !important;
          box-shadow: 0 8px 25px rgba(255, 215, 0, 0.2) !important;
          border-radius: 8px !important;
        }
        
        .table-cell {
          color: #F0F0F0 !important;
          font-family: 'Inter', sans-serif !important;
          font-weight: 500 !important;
          padding: 16px !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
          transition: all 0.3s ease !important;
        }
        
        .index-cell {
          color: rgba(255, 215, 0, 0.8) !important;
          font-weight: 600 !important;
          text-align: center !important;
        }
        
        .name-cell {
          color: #FFD700 !important;
          font-weight: 600 !important;
          text-shadow: 0 0 8px rgba(255, 215, 0, 0.3) !important;
        }
        
        .username-cell {
          color: #F0F0F0 !important;
          font-weight: 500 !important;
        }
        
        .status-cell {
          color: #00FF00 !important;
          font-weight: 600 !important;
          text-shadow: 0 0 8px rgba(0, 255, 0, 0.5) !important;
          text-transform: uppercase !important;
          letter-spacing: 1px !important;
        }
        
        .status-cell::before {
          content: '●';
          margin-right: 8px;
          animation: statusPulse 2s ease-in-out infinite;
        }
        
        @keyframes statusPulse {
          0%, 100% { 
            opacity: 0.6;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.2);
          }
        }
        
        .date-cell {
          color: rgba(240, 240, 240, 0.7) !important;
          font-style: italic !important;
        }
        
        .galactic-button {
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%) !important;
          color: #000 !important;
          font-family: 'Orbitron', monospace !important;
          font-weight: 700 !important;
          font-size: 0.8rem !important;
          letter-spacing: 1px !important;
          padding: 10px 20px !important;
          border-radius: 25px !important;
          border: none !important;
          box-shadow: 
            0 4px 15px rgba(255, 215, 0, 0.4),
            0 0 20px rgba(255, 215, 0, 0.2) !important;
          transition: all 0.3s ease !important;
          text-transform: uppercase !important;
          position: relative !important;
          overflow: hidden !important;
        }
        
        .galactic-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transition: left 0.5s ease;
        }
        
        .galactic-button:hover {
          transform: scale(1.05) !important;
          box-shadow: 
            0 6px 25px rgba(255, 215, 0, 0.6),
            0 0 30px rgba(255, 215, 0, 0.4) !important;
          background: linear-gradient(135deg, #FFA500 0%, #FFD700 50%, #FFA500 100%) !important;
        }
        
        .galactic-button:hover::before {
          left: 100%;
        }
        
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px;
          color: #FFD700;
        }
        
        .loading-spinner {
          color: #FFD700 !important;
          margin-bottom: 20px !important;
        }
        
        .loading-text {
          font-family: 'Orbitron', monospace !important;
          font-weight: 600 !important;
          color: #FFD700 !important;
          text-shadow: 0 0 10px rgba(255, 215, 0, 0.5) !important;
          letter-spacing: 1px !important;
        }
        
        .no-users-message {
          text-align: center;
          padding: 60px;
          color: rgba(240, 240, 240, 0.7);
          font-family: 'Inter', sans-serif;
          font-size: 1.1rem;
        }
        
        @media (max-width: 768px) {
          .galactic-title {
            font-size: 2rem;
          }
          
          .galactic-table-container {
            padding: 20px;
            margin: 0 10px;
          }
          
          .header-cell, .table-cell {
            padding: 12px 8px !important;
            font-size: 0.8rem !important;
          }
          
          .galactic-button {
            padding: 8px 16px !important;
            font-size: 0.7rem !important;
          }
        }
      `}</style>
      
      <div className="galactic-container">
        <div className="floating-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
        
        <div className="main-content">
          <Typography className="galactic-title">
            Galactic User Registry
          </Typography>
          
          <div className="galactic-table-container">
            <div className="table-content">
              {loading ? (
                <div className="loading-container">
                  <CircularProgress size={60} className="loading-spinner" />
                  <Typography className="loading-text">
                    Scanning Galactic Database...
                  </Typography>
                </div>
              ) : users.length === 0 ? (
                <div className="no-users-message">
                  <Typography>No users found in the galactic registry</Typography>
                </div>
              ) : (
                <Table className="galactic-table">
                  <TableHead className="table-header">
                    <TableRow>
                      <TableCell className="header-cell">#</TableCell>
                      <TableCell className="header-cell">Full Name</TableCell>
                      <TableCell className="header-cell">Username</TableCell>
                      <TableCell className="header-cell">Status</TableCell>
                      <TableCell className="header-cell">Reg. Date</TableCell>
                      <TableCell className="header-cell">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user, index) => (
                      <TableRow key={user.id} className="table-row">
                        <TableCell className="table-cell index-cell">
                          {String(index + 1).padStart(2, '0')}
                        </TableCell>
                        <TableCell className="table-cell name-cell">
                          {user.fullName || "Unknown Entity"}
                        </TableCell>
                        <TableCell className="table-cell username-cell">
                          {user.username}
                        </TableCell>
                        <TableCell className="table-cell status-cell">
                          Active
                        </TableCell>
                        <TableCell className="table-cell date-cell">
                          Classified
                        </TableCell>
                        <TableCell className="table-cell">
                          <Button 
                            onClick={() => navigate(`/admin/users/${user.id}/bookings`)} 
                            className="galactic-button"
                            variant="contained"
                          >
                            View Bookings
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageUsers;

