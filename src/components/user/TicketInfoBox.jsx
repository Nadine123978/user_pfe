import React, { useEffect, useState } from 'react';
  import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EventIcon from '@mui/icons-material/Event';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

const TicketInfoBox = () => {
    const { id } = useParams(); // ⬅️ من URL
    const [event, setEvent] = useState(null);
      const navigate = useNavigate();
        const handleCheckAvailability = () => {
    navigate(`/event/${event?.id}/tickets`);
  };
  
    useEffect(() => {
      axios.get(`http://localhost:8081/api/events/${id}`)
        .then(response => setEvent(response.data))
        .catch(error => console.error("❌ Error fetching event:", error));
    }, [id]);

return (
    <Card sx={{ maxWidth: 300, p: 2, borderRadius: 3, boxShadow: 3 }}>
      <CardContent>

        <Typography variant="subtitle2" color="text.secondary" fontWeight={500}>
          From
        </Typography>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          {event?.price}$
        </Typography>

        {/* Select Date */}
        <FormControl fullWidth margin="dense">
          <InputLabel>
            <EventIcon fontSize="small" sx={{ mr: 1 }} />
        select date
          </InputLabel>
          <Select defaultValue="" displayEmpty>
            <MenuItem value="">Select a date</MenuItem>
          </Select>
        </FormControl>

        {/* Select Ticket */}
        <FormControl fullWidth margin="dense" disabled>
          <InputLabel>
            <ConfirmationNumberIcon fontSize="small" sx={{ mr: 1 }} />
            Select your tickets
          </InputLabel>
          <Select defaultValue="">
            <MenuItem value="">Select your tickets</MenuItem>
          </Select>
        </FormControl>

        {/* Check Availability */}
        <Button
          fullWidth
          variant="contained"
                onClick={handleCheckAvailability}
          sx={{
            mt: 2,
            backgroundColor: '#a53894',
            '&:hover': { backgroundColor: '#922a83' },
            borderRadius: 1
          }}
        >
          Check availability
        </Button>

        {/* Cancellation Policy */}
        <Box
          sx={{
            mt: 2,
            p: 1,
            bgcolor: '#f2f7f7',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 1
          }}
        >
          <InfoOutlinedIcon sx={{ mt: 0.5, color: '#006666' }} />
          <Box>
            <Typography variant="subtitle2" fontWeight="bold">
              Cancellation policy
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Cancel for free until 24 hours before you visit and get a full refund
            </Typography>
          </Box>
        </Box>

        {/* Important info */}
        <Box mt={2}>
          <Typography variant="subtitle2" fontWeight="bold">
            Important information
          </Typography>
          <Typography variant="body2" color="text.secondary">
            The enclosed cabins allow the wheel to operate all year round, rain or shine.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TicketInfoBox;
