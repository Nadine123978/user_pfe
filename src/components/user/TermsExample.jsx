import React, { useState } from 'react';
import { Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

export default function TermsExample() {
  const [openTerms, setOpenTerms] = useState(false);
  const [openPrivacy, setOpenPrivacy] = useState(false);

  return (
    <>
      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
        I agree to the{' '}
        <Typography 
          component="span" 
          sx={{ color: '#E91E63', textDecoration: 'underline', cursor: 'pointer' }} 
          onClick={() => setOpenTerms(true)}
        >
          Terms
        </Typography>{' '}
        and{' '}
        <Typography 
          component="span" 
          sx={{ color: '#E91E63', textDecoration: 'underline', cursor: 'pointer' }} 
          onClick={() => setOpenPrivacy(true)}
        >
          Conditions of Privacy
        </Typography>
      </Typography>

      {/* Terms Dialog */}
      <Dialog open={openTerms} onClose={() => setOpenTerms(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Terms and Conditions</DialogTitle>
        <DialogContent dividers>
          <Typography>
            {/* ضع نص الشروط هنا */}
            Here are the terms and conditions...
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTerms(false)} color="primary">Close</Button>
        </DialogActions>
      </Dialog>

      {/* Privacy Dialog */}
      <Dialog open={openPrivacy} onClose={() => setOpenPrivacy(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Privacy Policy</DialogTitle>
        <DialogContent dividers>
          <Typography>
            {/* ضع نص سياسة الخصوصية هنا */}
            Here is the privacy policy...
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPrivacy(false)} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
