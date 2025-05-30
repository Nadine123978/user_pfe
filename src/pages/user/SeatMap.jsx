import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import OrganizerInfo from './OrganizerInfo';
import VenueInfo from './VenueInfo';
import axios from 'axios';
import {
  Box,
  Typography,
  Chip,
  Button
} from '@mui/material';

const pricesColor = {
  5: '#fdd835',
  25: '#f06292',
  35: '#9575cd',
  45: '#64b5f6',
  55: '#4db6ac',
  65: '#81c784',
  70: '#aed581',
  75: '#ffd54f',
  85: '#ff8a65',
  110: '#f48fb1'
};

const SeatMap = () => {
  const { id } = useParams();
  const [sections, setSections] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8081/api/events/${id}/tickets`)
      .then(res => setSections(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const getColor = (price) => pricesColor[price] || '#e0e0e0';

  const renderRow = (filterText, count = 3) => {
    const items = sections.filter(s => s.sectionName.includes(filterText));
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 1 }}>
        {items.map((section, i) => (
          <Box key={i}
            sx={{
              backgroundColor: getColor(section.price),
              width: 100,
              height: 60,
              borderRadius: 1,
              border: section.soldOut ? '2px dashed red' : '2px solid #222',
              opacity: section.soldOut ? 0.4 : 1,
              textAlign: 'center',
              p: 1
            }}
          >
            <Typography fontWeight="bold">{section.sectionName}</Typography>
            <Typography>${section.price}</Typography>
            {section.soldOut && <Chip label="Sold Out" size="small" color="error" />}
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>Pick a section:</Typography>
      <Typography variant="h6" gutterBottom>STAGE</Typography>

      {/* Rows organized by name keywords */}
      {renderRow('Section A')}
      {renderRow('Section B')}
      {renderRow('Section C')}
      {renderRow('Stadium A')}
      {renderRow('Stadium B')}
      {renderRow('Stadium C')}
      {renderRow('Stadium D')}
      {renderRow('Stadium E')}
      {renderRow('Stadium F')}

      {/* Transportation */}
      {renderRow('Transportation')}

      <Box sx={{ mt: 3 }}>
        <Button variant="contained" color="secondary">Continue</Button>
      </Box>

      {/* Color Legend */}
      <Box sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
        {Object.entries(pricesColor).map(([price, color]) => (
          <Chip
            key={price}
            label={`$${price}`}
            sx={{ backgroundColor: color, color: '#000' }}
          />
        ))}
        <Chip label="Sold Out" color="error" />
        <OrganizerInfo />
<VenueInfo />
      </Box>
    </Box>
    
  );
};

export default SeatMap;
