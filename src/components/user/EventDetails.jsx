import React from "react";
import { Box, Chip, Typography } from "@mui/material";

const EventDetails = ({ event }) => {
  const { description, tags = [] } = event;

  return (
    <Box sx={{ p: 2 }}>
      {/* عرض التاغات إذا موجودة */}
      {tags.map((tag, index) => (
        <Chip key={index} label={tag} sx={{ mr: 1, mb: 1 }} />
      ))}

      {/* وصف الحدث */}
      <Typography variant="body2" sx={{ mt: 2 }}>
        {description || "No description available."}
      </Typography>
    </Box>
  );
};

export default EventDetails;
