// PriceLegend.jsx
import React from "react";
import { Box, Typography, Stack, Tooltip } from "@mui/material";

const PriceLegend = ({ pairs = [] }) => {
  if (pairs.length === 0) return null;

  return (
    <Stack direction="row" spacing={3} sx={{ mb: 3, justifyContent: "center", flexWrap: "wrap" }}>
      {pairs.map((pair, idx) => (
        <Box key={idx} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Tooltip title={`Color represents $${pair.price}`}>
            <Box
              sx={{
                width: 20,
                height: 20,
                borderRadius: "4px",
                backgroundColor: pair.color,
                border: "1px solid #ccc",
              }}
            />
          </Tooltip>
          <Typography variant="body2">${pair.price}</Typography>
        </Box>
      ))}
    </Stack>
  );
};

export default PriceLegend;
