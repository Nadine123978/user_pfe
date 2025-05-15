import { Box, Typography, Button, Card, CardContent } from '@mui/material';

const VenueInfo = () => {
  return (
    <Card sx={{ mt: 4, p: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight="bold">Venue</Typography>
          <Button variant="contained" size="small">Directions</Button>
        </Box>

        <Box sx={{ mt: 2 }}>
          <iframe
            title="venue"
            width="100%"
            height="250"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src="https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=Park+Joseph+Tohme+Skaff,Zahle+Lebanon"
          />
        </Box>

        <Typography variant="body2" color="text.secondary" mt={2}>
          Park Joseph Tohme Skaff<br />
          Zahle, Lebanon
        </Typography>
      </CardContent>
    </Card>
  );
};

export default VenueInfo;
