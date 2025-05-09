import React from 'react';
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
  return (
    <Box sx={{ mt: 5 }}>
      {/* العنوان */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        La Grande Roue de Montréal: Ferris Wheel Entry Ticket
      </Typography>

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
            Enjoy the Montréal skyline from new heights, and see how far-reaching views at the Grande Roue de Montréal
            stretch across the city. Located in Old Port, it’s the tallest observation wheel in Canada at 60m.
            Take stunning pictures, relax in a temperature-controlled cabin, and enjoy this must-see local attraction!
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* صورة توضيحية */}
      <Box
        component="img"
        src="https://images.unsplash.com/photo-1546039907-7fa05f864c02?auto=format&fit=crop&w=900&q=80"
        alt="experience"
        sx={{ width: '100%', borderRadius: 2, mt: 2 }}
      />

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
