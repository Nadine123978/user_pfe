// src/pages/admin/seating/ManageSeatingPage.jsx
import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import AddSectionForm from '../../components/admin/AddSectionForm';
import SeatGrid from '../../components/admin/SeatGrid';

const ManageSeatingPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // جيب معلومات الحدث حسب الـ ID
    fetch(`http://localhost:8081/api/events/${eventId}`)
      .then(res => res.json())
      .then(data => setEvent(data))
      .catch(console.error);
  }, [eventId]);

  return (
    <Container>
      <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
        Manage Seating for Event: {event?.name || "Loading..."}
      </Typography>

     <AddSectionForm eventId={eventId} />

      <SeatGrid eventId={eventId} />
    </Container>
  );
};

export default ManageSeatingPage;
