import React from 'react';
import {
  Box,
  Typography,
  InputBase,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const TicketHeader = ({ event }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: { xs: 2, md: 5 },
        py: 2,
        borderBottom: '1px solid #eee',
        backgroundColor: '#fff',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}
    >
      {/* Left: Logo + Search */}
      <Box display="flex" alignItems="center" gap={2}>
        <Typography variant="h5" fontWeight="bold" sx={{ color: '#00c1c1' }}>
          {event?.title || 'Tiqets'}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#f4f4f4',
            px: 2,
            borderRadius: '20px',
            width: { xs: '200px', sm: '300px', md: '400px' }
          }}
        >
          <SearchIcon color="action" />
          <InputBase
            placeholder="Search destinations & experiences"
            fullWidth
            sx={{ ml: 1 }}
          />
        </Box>
      </Box>

      {/* Right: Language + Help + Sign In */}
      <Box display="flex" alignItems="center" gap={2}>
        <Box display="flex" alignItems="center" gap={0.5} sx={{ cursor: 'pointer' }}>
          <LanguageIcon fontSize="small" />
          <Typography variant="body2">EN / EUR</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={0.5} sx={{ cursor: 'pointer' }}>
          <HelpOutlineIcon fontSize="small" />
          <Typography variant="body2">Help</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={0.5} sx={{ cursor: 'pointer' }}>
          <PersonOutlineIcon fontSize="small" />
          <Typography variant="body2">Sign in</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TicketHeader;
