import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, IconButton, Tooltip, MenuItem, Select, FormControl, InputLabel, Box
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8081/api/bookings', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const cleanData = response.data.map(booking => {
          const { event, ...rest } = booking;
          return {
            ...rest,
            event: event ? { ...event, bookings: undefined } : null,
          };
        });

        setBookings(cleanData);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const filteredBookings = filterStatus === 'ALL'
    ? bookings
    : bookings.filter(b => b.status?.toUpperCase() === filterStatus);

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
          max-width: 1400px;
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
        
        .galactic-paper {
          background: rgba(13, 14, 43, 0.8) !important;
          backdrop-filter: blur(20px) !important;
          border: 2px solid rgba(255, 215, 0, 0.3) !important;
          border-radius: 20px !important;
          padding: 30px !important;
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.5),
            0 0 40px rgba(255, 215, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
          position: relative !important;
          overflow: hidden !important;
        }
        
        .galactic-paper::before {
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
        
        .paper-content {
          position: relative;
          z-index: 2;
        }
        
        .filter-container {
          margin-bottom: 30px !important;
        }
        
        .galactic-form-control {
          background: rgba(13, 14, 43, 0.6) !important;
          backdrop-filter: blur(10px) !important;
          border: 1px solid rgba(255, 215, 0, 0.3) !important;
          border-radius: 12px !important;
          overflow: hidden !important;
        }
        
        .galactic-input-label {
          color: #FFD700 !important;
          font-family: 'Orbitron', monospace !important;
          font-weight: 600 !important;
          text-shadow: 0 0 8px rgba(255, 215, 0, 0.5) !important;
        }
        
        .galactic-select {
          color: #F0F0F0 !important;
          font-family: 'Inter', sans-serif !important;
          font-weight: 500 !important;
        }
        
        .galactic-select .MuiOutlinedInput-notchedOutline {
          border: none !important;
        }
        
        .galactic-select:hover .MuiOutlinedInput-notchedOutline {
          border: 1px solid rgba(255, 215, 0, 0.5) !important;
        }
        
        .galactic-select.Mui-focused .MuiOutlinedInput-notchedOutline {
          border: 1px solid #FFD700 !important;
          box-shadow: 0 0 15px rgba(255, 215, 0, 0.3) !important;
        }
        
        .galactic-table-container {
          background: transparent !important;
          border-radius: 15px !important;
          overflow: hidden !important;
        }
        
        .galactic-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
        }
        
        .table-header {
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(138, 43, 226, 0.2) 100%);
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
          transform: translateX(8px) scale(1.01) !important;
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
        
        .booking-id-cell {
          color: #FFD700 !important;
          font-weight: 600 !important;
          text-shadow: 0 0 8px rgba(255, 215, 0, 0.3) !important;
          font-family: 'Orbitron', monospace !important;
        }
        
        .event-cell {
          color: #FFD700 !important;
          font-weight: 600 !important;
          text-shadow: 0 0 8px rgba(255, 215, 0, 0.3) !important;
        }
        
        .user-cell {
          color: #F0F0F0 !important;
          font-weight: 500 !important;
        }
        
        .status-cell {
          font-weight: 600 !important;
          text-transform: uppercase !important;
          letter-spacing: 1px !important;
          position: relative !important;
        }
        
        .status-paid, .status-confirmed {
          color: #00FF00 !important;
          text-shadow: 0 0 8px rgba(0, 255, 0, 0.5) !important;
        }
        
        .status-pending {
          color: #FFA500 !important;
          text-shadow: 0 0 8px rgba(255, 165, 0, 0.5) !important;
        }
        
        .status-cell::before {
          content: '●';
          margin-right: 8px;
          animation: statusPulse 2s ease-in-out infinite;
        }
        
        .status-paid::before, .status-confirmed::before {
          color: #00FF00;
        }
        
        .status-pending::before {
          color: #FFA500;
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
        
        .seats-cell {
          color: rgba(240, 240, 240, 0.9) !important;
          font-weight: 500 !important;
          font-family: 'Orbitron', monospace !important;
          font-size: 0.85rem !important;
        }
        
        .price-cell {
          color: #FFD700 !important;
          font-weight: 600 !important;
          text-shadow: 0 0 8px rgba(255, 215, 0, 0.3) !important;
          font-family: 'Orbitron', monospace !important;
        }
        
        .date-cell {
          color: rgba(240, 240, 240, 0.7) !important;
          font-style: italic !important;
          font-size: 0.85rem !important;
        }
        
        .galactic-icon-button {
          color: #FFD700 !important;
          transition: all 0.3s ease !important;
          border-radius: 50% !important;
          background: rgba(255, 215, 0, 0.1) !important;
        }
        
        .galactic-icon-button:hover {
          color: #FFA500 !important;
          background: rgba(255, 215, 0, 0.2) !important;
          transform: scale(1.1) !important;
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.4) !important;
        }
        
        .no-bookings-message {
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
          
          .galactic-paper {
            padding: 20px !important;
            margin: 0 10px !important;
          }
          
          .header-cell, .table-cell {
            padding: 12px 8px !important;
            font-size: 0.8rem !important;
          }
          
          .galactic-table-container {
            overflow-x: auto;
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
            Galactic Booking Ledger
          </Typography>
          
          <Paper className="galactic-paper">
            <div className="paper-content">
              <Box className="filter-container" sx={{ maxWidth: 250 }}>
                <FormControl fullWidth size="small" className="galactic-form-control">
                  <InputLabel 
                    id="filter-status-label" 
                    className="galactic-input-label"
                  >
                    Filter by Status
                  </InputLabel>
                  <Select
                    labelId="filter-status-label"
                    value={filterStatus}
                    label="Filter by Status"
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="galactic-select"
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          background: 'rgba(13, 14, 43, 0.95)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255, 215, 0, 0.3)',
                          borderRadius: '12px',
                          '& .MuiMenuItem-root': {
                            color: '#F0F0F0',
                            fontFamily: 'Inter, sans-serif',
                            '&:hover': {
                              background: 'rgba(255, 215, 0, 0.1)',
                              color: '#FFD700',
                            },
                            '&.Mui-selected': {
                              background: 'rgba(255, 215, 0, 0.2)',
                              color: '#FFD700',
                              fontWeight: 600,
                            }
                          }
                        }
                      }
                    }}
                  >
                    <MenuItem value="ALL">All</MenuItem>
                    <MenuItem value="PENDING">Pending</MenuItem>
                    <MenuItem value="PAID">Paid</MenuItem>
                    <MenuItem value="CONFIRMED">Confirmed</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <TableContainer className="galactic-table-container">
                <Table className="galactic-table">
                  <TableHead className="table-header">
                    <TableRow>
                      <TableCell className="header-cell">#</TableCell>
                      <TableCell className="header-cell">Booking ID</TableCell>
                      <TableCell className="header-cell">Event</TableCell>
                      <TableCell className="header-cell">User</TableCell>
                      <TableCell className="header-cell">Status</TableCell>
                      <TableCell className="header-cell">Seat Codes</TableCell>
                      <TableCell className="header-cell">Price</TableCell>
                      <TableCell className="header-cell">Created At</TableCell>
                      <TableCell className="header-cell">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredBookings.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={9} className="no-bookings-message">
                          <Typography>No bookings found in the galactic ledger</Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredBookings.map((booking, index) => (
                        <TableRow key={booking.id} className="table-row">
                          <TableCell className="table-cell index-cell">
                            {String(index + 1).padStart(2, '0')}
                          </TableCell>
                          <TableCell className="table-cell booking-id-cell">
                            #{booking.id}
                          </TableCell>
                          <TableCell className="table-cell event-cell">
                            {booking.event?.title || 'No Event'}
                          </TableCell>
                          <TableCell className="table-cell user-cell">
                            {booking.user?.username || 'No User'}
                          </TableCell>
                          <TableCell className={`table-cell status-cell status-${booking.status?.toLowerCase()}`}>
                            {booking.status}
                          </TableCell>
                          <TableCell className="table-cell seats-cell">
                            {booking.seats && booking.seats.length > 0
                              ? booking.seats.map(seat => seat.code).join(', ')
                              : <em>No seats assigned</em>}
                          </TableCell>
                          <TableCell className="table-cell price-cell">
                            {booking.price ? `${booking.price} $` : 'N/A'}
                          </TableCell>
                          <TableCell className="table-cell date-cell">
                            {booking.createdAt
                              ? new Date(booking.createdAt).toLocaleString()
                              : 'N/A'}
                          </TableCell>
                          <TableCell className="table-cell">
                            <Tooltip title="View Details">
                              <IconButton
                                className="galactic-icon-button"
                                onClick={() => navigate(`/admin/bookings/${booking.id}`)}
                              >
                                <VisibilityIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Paper>
        </div>
      </div>
    </>
  );
};

export default AllBookings;

