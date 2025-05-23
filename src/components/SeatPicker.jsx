import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Button, Chip, Divider } from '@mui/material';

export default function SeatPicker({ sectionId, userId }) {
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);

  useEffect(() => {
    if (!sectionId) return;

    axios.get(`http://localhost:8081/api/seats/section/${sectionId}`)
      .then(res => setSeats(res.data))
      .catch(err => console.error('Error loading seats:', err));
  }, [sectionId]);

  const handleSeatClick = (seat) => {
    if (seat.reserved) return;

    setSelectedSeat(seat);

    // احجزه مؤقتًا (Hold)
    axios.post('http://localhost:8081/api/seats/hold', null, {
      params: {
        seatId: seat.id,
        userId: userId,
        price: seat.section.price
      }
    })
      .then(res => console.log('Seat held:', res.data))
      .catch(err => console.error('Error holding seat:', err));
  };

  return (
    <Box textAlign="center" mt={4}>
      <Typography variant="h6">Pick your seat:</Typography>

      <Box mt={3} display="flex" flexDirection="column" alignItems="center" gap={1}>
        {[...'ABCDE'].map(row => (
          <Box key={row} display="flex" justifyContent="center" gap={0.5}>
            {seats.filter(seat => seat.code.startsWith(row)).map(seat => {
              const status = seat.reserved ? 'reserved' : 'available';
              const bgColor = selectedSeat?.id === seat.id ? 'green' : (status === 'reserved' ? '#999' : '#FFA500');

              return (
                <Box
                  key={seat.id}
                  width={30}
                  height={30}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bgcolor={bgColor}
                  color="#fff"
                  fontSize={12}
                  borderRadius={1}
                  sx={{ cursor: status === 'available' ? 'pointer' : 'not-allowed' }}
                  onClick={() => handleSeatClick(seat)}
                >
                  {seat.code}
                </Box>
              );
            })}
          </Box>
        ))}
      </Box>

      <Box mt={4} display="flex" justifyContent="center" gap={2}>
        <Chip label="Available" style={{ backgroundColor: '#FFA500', color: '#fff' }} />
        <Chip label="Reserved" style={{ backgroundColor: '#999', color: '#fff' }} />
        <Chip label="Selected" style={{ backgroundColor: 'green', color: '#fff' }} />
      </Box>

      {selectedSeat && (
        <Box mt={3} border="1px solid #ccc" borderRadius={2} p={2}>
          <Typography variant="subtitle1">{selectedSeat.code}</Typography>
          <Typography color="text.secondary">{selectedSeat.section.name}</Typography>
          <Typography fontWeight="bold">${selectedSeat.section.price}</Typography>
        </Box>
      )}

      <Button
        variant="contained"
        color="error"
        sx={{ mt: 3 }}
        disabled={!selectedSeat}
      >
        Continue
      </Button>

      <Divider sx={{ my: 4 }} />
    </Box>
  );
}
