import { Box, Typography } from "@mui/material";

const ContactHeader = () => ( 
<Box textAlign="center" py={8} bgcolor="#f8f8f4"> 
    <Typography variant="subtitle1" color="textSecondary">
CONTACT US
 </Typography>
 <Typography variant="h4" fontWeight="bold" mt={1} mb={2} color="textSecondary">
Reach Out for <br /> Additional Information 
</Typography> 
<Typography variant="body2" color="textSecondary" >
Questions or feedback? We’re here to help with anything you need—just reach out! </Typography> </Box>
);

export default ContactHeader; 
