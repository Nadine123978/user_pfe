import { Box, Chip, Typography } from "@mui/material";


const EventDetails = ({ event }) => {
  if (!event) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="error">
          Event data is not available.
        </Typography>
      </Box>
    );
  }

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