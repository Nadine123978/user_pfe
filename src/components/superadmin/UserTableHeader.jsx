import React from 'react';
import { TableHead, TableRow, TableCell } from '@mui/material';
import { styled, createTheme, ThemeProvider, keyframes } from '@mui/material/styles';

// Cosmic theme (copied from AddEvent/EditEvent)
const cosmicTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6366f1',  // بنفسجي أزرق
    },
    secondary: {
      main: '#06b6d4',
    },
    background: {
      default: '#0a0e27',
      paper: 'rgba(255, 255, 255, 0.05)',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.8)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

// Keyframe animations (copied from AddEvent/EditEvent)
const shimmerAnimation = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
  '& .MuiTableCell-root': {
    color: theme.palette.text.primary,
    fontWeight: 700,
    fontSize: '1rem',
    textTransform: 'uppercase',
    borderBottom: 'none',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
      transition: 'left 0.5s',
    },
    '&:hover::before': {
      left: '100%',
    },
  },
}));

const StyledTableRow = styled(TableRow)({
  // No specific styles needed for TableRow itself, as TableCell handles most of it
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  background: 'transparent',
  color: theme.palette.text.primary,
  fontWeight: 700,
  fontSize: '1rem',
  textTransform: 'uppercase',
  borderBottom: 'none',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
    transition: 'left 0.5s',
  },
  '&:hover::before': {
    left: '100%',
  },
}));

const UserTableHeader = () => (
  <ThemeProvider theme={cosmicTheme}>
    <StyledTableHead>
      <StyledTableRow>
        <StyledTableCell>Name</StyledTableCell>
        <StyledTableCell>Status</StyledTableCell>
        <StyledTableCell>Last Login Date</StyledTableCell>
        <StyledTableCell>Login IP</StyledTableCell>
        <StyledTableCell>Action</StyledTableCell>
      </StyledTableRow>
    </StyledTableHead>
  </ThemeProvider>
);

export default UserTableHeader;


