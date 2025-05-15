import { Box, Typography, Button, Avatar, Card, CardContent } from '@mui/material';

const OrganizerInfo = () => {
  return (
    <Card sx={{ mt: 5, p: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight="bold">Organizer</Typography>
          <Button variant="outlined" size="small">Contact</Button>
        </Box>

        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar src="https://upload.wikimedia.org/wikipedia/commons/5/55/Logo_Wave.svg" alt="Organizer" sx={{ width: 60, height: 60 }} />
          <Typography variant="subtitle1" fontWeight="bold">Wave Production</Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" mt={2}>
          Wave Production is a dynamic company that operates as both a production house and a marketing agency.
          Specializing in the creation of high-quality audiovisual content, Wave Production excels in developing engaging video
          and multimedia projects for a diverse range of clients...
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Button variant="contained" size="small" color="inherit">Organizer Profile</Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default OrganizerInfo;
