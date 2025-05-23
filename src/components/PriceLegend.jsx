// PriceLegend.jsx
import React from "react";
import { Box, Typography } from "@mui/material";

const prices = [
  { color: 'yellow', price: '$5' },
  { color: 'purple', price: '$35' },
  { color: 'blue', price: '$45' },
  { color: 'lightblue', price: '$55' },
  { color: 'green', price: '$65' },
  { color: 'teal', price: '$70' },
  { color: 'skyblue', price: '$75' },
  { color: 'orange', price: '$85' },
  { color: 'red', price: '$110' },
];

const PriceLegend = () => (
  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, p: 2, justifyContent: 'center' }}>
    {prices.map(({ color, price }) => (
      <Box key={price} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box sx={{ width: 20, height: 20, bgcolor: color, borderRadius: '4px' }}></Box>
        <Typography variant="body2">{price}</Typography>
      </Box>
    ))}
  </Box>
);

export default PriceLegend;