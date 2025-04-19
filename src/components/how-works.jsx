import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

const steps = [
  {
    number: '01',
    title: 'Go Event Page',
    description: 'It is a long established fact that a reader content of a page when Ipsum is that it has a more-or- this is simple less normal.',
    image: '/images/event-step1.png',
    backgroundColor: '#fde6c3',
  },
  {
    number: '02',
    title: 'Choose Your Event',
    description: 'It is a long established fact that a reader content of a page when Ipsum is that it has a more-or- this is simple less normal.',
    image: '/images/event-step2.png',
    backgroundColor: '#dcdcff',
  },
  {
    number: '03',
    title: 'Complete Payment',
    description: 'It is a long established fact that a reader content of a page when Ipsum is that it has a more-or- this is simple less normal.',
    image: '/images/event-step3.png',
    backgroundColor: '#d9f8d6',
  },
];

function HowItWorks() {
  return (
    <Box sx={{ textAlign: 'center', py: 8, px: 2 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        How it Works
      </Typography>
      <Typography color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto', mb: 6 }}>
        It is a long established fact that a reader content of a page when Ipsum is that it has a more-or- this is simple less normal.
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {steps.map((step, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 5,
                backgroundColor: step.backgroundColor,
                transform: 'rotate(-2deg)',
                minHeight: '400px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                <Typography variant="h2" sx={{ opacity: 0.1, fontWeight: 'bold' }}>
                  {step.number}
                </Typography>
                <Typography variant="h6" fontWeight="bold" mb={1}>
                  {step.title}
                </Typography>
                <Typography color="text.secondary">{step.description}</Typography>
              </Box>
              <Box
                component="img"
                src={step.image}
                alt={step.title}
                sx={{ width: '100%', height: 'auto', borderRadius: 2, mt: 2 }}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default HowItWorks;
