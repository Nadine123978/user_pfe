import { Box, Chip, Typography } from "@mui/material";


const EventDetails = ({ event }) => {
  if (!event) {
    return (
      <Box sx={{ p: 3, backgroundColor: '#2C0050', borderRadius: '16px', boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.5)', color: '#FFCC80' }}>
        <Typography variant="body2" color="inherit">
          Event data is not available.
        </Typography>
      </Box>
    );
  }

  const { description, tags = [] } = event;

  return (
    <Box
      sx={{
        p: 3, // Increased padding
        mt: 3, // Margin top to separate from previous sections
        backgroundColor: '#2C0050', // Dark purple background for this section
        borderRadius: '16px', // Rounded corners
        boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.5)', // Stronger shadow for depth
        color: '#E0E0E0', // Default text color for this box
        border: '1px solid rgba(255, 255, 255, 0.1)', // Subtle light border
      }}
    >
      {/* Display tags if available */}
      {tags.length > 0 && (
        <Box sx={{ mb: 2 }}> {/* Margin bottom for spacing between tags and description */}
          {tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              sx={{
                mr: 1,
                mb: 1,
                backgroundColor: 'rgba(233, 30, 99, 0.2)', // Semi-transparent vibrant pink
                color: '#FFFFFF', // White text for tags
                fontWeight: 'bold',
                borderRadius: '8px', // Slightly rounded chip corners
                border: '1px solid rgba(233, 30, 99, 0.5)', // Subtle border
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)', // Subtle shadow for chips
              }}
            />
          ))}
        </Box>
      )}


      {/* Event description */}
      <Typography variant="body1" sx={{ mt: tags.length > 0 ? 0 : 2, color: '#E0E0E0', lineHeight: 1.6 }}>
        {description || "No description available."}
      </Typography>
    </Box>
  );
};

export default EventDetails;
