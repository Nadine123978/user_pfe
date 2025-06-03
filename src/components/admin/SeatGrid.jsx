import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

const SeatGrid = ({ sections }) => {
  if (!sections || !Array.isArray(sections)) {
    return <Typography>Loading sections...</Typography>;
  }

  return (
    <Box>
      {sections.map((section) => (
        <Box key={section.id} sx={{ mb: 4 }}>
          <Typography variant="subtitle1" gutterBottom>
            {section.name} - {section.seats} Seats
          </Typography>
          <Grid container spacing={1}>
            {[...Array(section.seats)].map((_, index) => (
              <Grid item xs={1} key={index}>
                <Paper
                  elevation={2}
                  sx={{
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#e0e0e0',
                  }}
                >
                  {index + 1}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
};
// ✅ تأكد أنك في نهاية الملف SeatGrid.jsx عندك:
export default SeatGrid;
