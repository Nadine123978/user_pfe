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
  const { id } = useParams(); // ⬅️ من URL
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8081/api/events/${id}`)
      .then(response => setEvent(response.data))
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
    backgroundColor: '#f0f0f0', // عشان تشوف الصندوق واضح
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

      {/* What’s included */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">What's included</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List dense>
            <ListItem>
              <ListItemIcon>
                <CheckCircleOutlineIcon color="success" />
              </ListItemIcon>
              <ListItemText primary="Admission to the Grande Roue de Montréal" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleOutlineIcon color="success" />
              </ListItemIcon>
              <ListItemText primary="Taxes and fees" />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Description */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">Description</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="text.secondary">
            {event?.description}
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Instructions */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">Instructions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="text.secondary">
            Show your ticket at the entrance.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* How to get there */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">How to get there</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="text.secondary">
            La Grande Roue de Montréal<br />
            Old Port of Montréal, QC H2Y 0B4, Montréal, Canada
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Additional info */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">Additional Info</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="text.secondary">
            Duration: 20 minutes. Pets not allowed. Wheelchair accessible.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default BookingDetailsSection;
