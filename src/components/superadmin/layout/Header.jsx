import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import AddAdminModal from '../AddAdminModal';


const Header = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
      <Typography variant="h6">Admin</Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField size="small" placeholder="Search" />
        <Button variant="contained" onClick={() => setOpen(true)}>
          + Add New Admin
        </Button>
        <AddAdminModal open={open} onClose={() => setOpen(false)} ></AddAdminModal>
      </Box>
    </Box>
  );
};

export default Header;