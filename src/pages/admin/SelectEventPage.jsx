// src/pages/admin/seating/SelectEventPage.jsx
import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SelectEventPage = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8081/api/events")

      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSelect = (eventId) => {
    navigate(`/admin/seating/${eventId}`);
  };

  return (
    <Container>
      <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>Select Event to Manage Seating</Typography>
<List>
  {events.map(event => (
    <ListItem
      key={event.id}
      secondaryAction={
        <Button variant="outlined" onClick={() => handleSelect(event.id)}>
          Manage Seating
        </Button>
      }
    >
      <img 
        src={event.imageUrl} 
        alt={event.title} 
        style={{ width: 80, height: 80, objectFit: 'cover', marginRight: 16, borderRadius: 8 }}
      />
      <ListItemText primary={event.title} />
    </ListItem>
  ))}
</List>

    </Container>
  );
};

export default SelectEventPage;
