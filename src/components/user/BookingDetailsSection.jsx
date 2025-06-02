import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const BookingDetailsSection = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

 useEffect(() => {
  axios.get(`http://localhost:8081/api/events/${id}`)
    .then(response => {
      console.log("🎯 Event from backend:", response.data);
      setEvent(response.data);
    })
    .catch(error => console.error("❌ Error fetching event:", error));
}, [id]);

  return (
    <Box
      sx={{
        mt: 5,
        width: '100%',
        maxWidth: '100vw',
        px: 2,
        boxSizing: 'border-box',
        backgroundColor: '#f0f0f0',
      }}
    >
      {/* العنوان */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {event?.title}
      </Typography>

      {/* التاريخ */}
      {event?.startDate && (
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {new Date(event.startDate).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </Typography>
      )}

      {/* What's included */}
      {event?.included?.length > 0 && (
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight="bold">What's included</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {event.included.map((item, idx) => (
                <ListItem key={idx}>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      )}

      {/* Description */}
      {event?.description && (
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight="bold">Description</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              {event.description}
            </Typography>
          </AccordionDetails>
        </Accordion>
      )}

      {/* Instructions */}
      {event?.instructions && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight="bold">Instructions</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              {event.instructions}
            </Typography>
          </AccordionDetails>
        </Accordion>
      )}

      {/* How to get there */}
      {event?.location && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight="bold">How to get there</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              {event.location.address}, {event.location.city}, {event.location.country}
            </Typography>
          </AccordionDetails>
        </Accordion>
      )}

      {/* Additional Info */}
      {event?.additionalInfo && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight="bold">Additional Info</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              {event.additionalInfo}
            </Typography>
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  );
};

export default BookingDetailsSection;
