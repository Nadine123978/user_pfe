// EventDetails.jsx
import React from "react";
import { Box, Chip, Typography } from "@mui/material";

const tags = ["Festival", "Summer", "Zahle", "Waveproduction"];

const EventDetails = () => (
  <Box sx={{ p: 2 }}>
    {tags.map(tag => <Chip key={tag} label={tag} sx={{ mr: 1 }} />)}
    <Typography variant="body2" sx={{ mt: 2 }}>
      ZAHLE UPSIDE DOWN INTERNATIONAL FESTIVAL proudly presents MARWAN KHOURY - Live in Concert
    </Typography>
  </Box>
);

export default EventDetails;
