import React from 'react';
import { Box, Typography } from '@mui/material';
import { wrap } from 'framer-motion';

const steps = [
  {
    id: '01',
    title: 'Go Event Page',
    description:
      'It is a long established fact that a reader content of a page when Ipsum is that it has a more–or– this is simple less normal.',
    image: '/images/step1.png',
    bgColor: '#fcecd3',
    rotate: '-3deg',
  },
  {
    id: '02',
    title: 'Choose Your Event',
    description:
      'It is a long established fact that a reader content of a page when Ipsum is that it has a more–or– this is simple less normal.',
    image: '/images/step2.png',
    bgColor: '#e3e4fd',
    rotate: '0deg',
  },
  {
    id: '03',
    title: 'Complete Payment',
    description:
      'It is a long established fact that a reader content of a page when Ipsum is that it has a more–or– this is simple less normal.',
    image: '/images/step3.png',
    bgColor: '#dbf7df',
    rotate: '3deg',
  },
];

const HowItWorks = () => {
  return (
    <Box sx={{ px: 4, py: 10, textAlign: 'center', maxWidth: '1300px', mx: 'auto' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
        How it Works
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: 700, mx: 'auto', color: '#555', mb: 8 }}>
        It is a long established fact that a reader content of a page when Ipsum is that it has a more–or– this is simple less normal.
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          gap: 4,
          flexWrap: 'wrap',
          pb: 2,
        }}
      >
        {steps.map((step) => (
          <Box
            key={step.id}
            sx={{
              backgroundColor: step.bgColor,
              borderRadius: '20px',
              transform: `rotate(${step.rotate})`,
              padding: 4,
              width: 360,
              flexShrink: 0,
              display: 'flex',
              flexwrap : 'wrap',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease',
              alignitems: 'center',
              justifycontent: 'center',
              height: 'auto',
              '&:hover': {
                transform: `scale(1.03) rotate(${step.rotate})`,
              },
            }}
          >
            <Box sx={{ position: 'relative', width: '100%' }}>
              <Typography
                sx={{
                  fontSize: '4.5rem',
                  fontWeight: 'bold',
                  color: '#c6c6c6',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: 'auto' ,
                  justifyContent:'center',
                }}
              >
                {step.id}
              </Typography>
              <Box sx={{ pt: 6 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  {step.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#444', lineHeight: 1.7 }}>
                  {step.description}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mt: 3, width: '100%', textAlign: 'center' }}>
              <img
                src={step.image}
                alt={step.title}
                style={{
                  width: '100%',
                  height: '180px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default HowItWorks;
