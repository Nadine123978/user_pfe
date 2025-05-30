// OrganizerInfo.jsx
import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const OrganizerInfo = () => (
  <Box sx={{ p: 2 }}>
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6">Wave Production</Typography>
      <Typography variant="body2">
        Wave Production is a dynamic company that operates as both a production house and a marketing agency...
      </Typography>
    </Paper>
  </Box>
);

export default OrganizerInfo;