import React from "react";
import { Box, Typography, Stack, Tooltip } from "@mui/material";

const PriceLegend = ({ pairs = [] }) => {
  if (pairs.length === 0) return null;

  return (
    <Stack
      direction="row"
      spacing={4} // Increased spacing between legend items
      sx={{
        mt: 4, // Margin top to separate from seat map
        mb: 3, // Margin bottom
        justifyContent: "center",
        flexWrap: "wrap",
        p: 2, // Padding inside the legend box
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Subtle dark background
        borderRadius: '12px', // Rounded corners
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)', // Subtle shadow
        border: '1px solid rgba(255, 255, 255, 0.1)', // Subtle border
      }}
    >
      {pairs.map((pair, idx) => (
        <Box key={idx} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}> {/* Increased gap */}
          <Tooltip title={`Color represents $${pair.price}`} arrow> {/* Added arrow to tooltip */}
            <Box
              sx={{
                width: 24, // Slightly larger color box
                height: 24, // Slightly larger color box
                borderRadius: "6px", // More rounded corners
                backgroundColor: pair.color,
                border: "1px solid rgba(255, 255, 255, 0.3)", // Subtle white border
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)', // Subtle shadow for the color box
              }}
            />
          </Tooltip>
          <Typography variant="body1" fontWeight="bold" sx={{ color: '#FFFFFF' }}> {/* White and bold text */}
            ${pair.price}
          </Typography>
        </Box>
      ))}
    </Stack>
  );
};

export default PriceLegend;
