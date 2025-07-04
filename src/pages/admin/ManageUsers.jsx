import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  Button, 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody, 
  Box, 
  Typography, 
  CircularProgress 
} from "@mui/material";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

// ثيم بنفسجي-أزرق مخصص (cosmic design)
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
      default: '#0f172a',
      paper: 'rgba(255, 255, 255, 0.05)',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.8)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '14px',
          padding: '10px 20px',
          transition: 'all 0.3s ease',
          '&.MuiButton-contained': {
            background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
            boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5855eb 0%, #0891b2 100%)',
              boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4)',
              transform: 'translateY(-2px)',
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#ffffff',
        },
        head: {
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)',
          color: '#6366f1',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          fontSize: '0.9rem',
          textShadow: '0 0 10px rgba(99, 102, 241, 0.5)',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease',
          '&:hover': {
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)',
            transform: 'translateX(8px) scale(1.02)',
            boxShadow: '0 8px 25px rgba(99, 102, 241, 0.2)',
            borderRadius: '8px',
          },
        },
      },
    },
  },
});

// Styled components للستايل الجميل
const CosmicContainer = styled(Box)({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #2d1b69 100%)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)
    `,
    animation: 'float 6s ease-in-out infinite',
  },
  '@keyframes float': {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-10px)' },
  },
});

const FloatingParticles = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none',
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    width: '4px',
    height: '4px',
    background: '#6366f1',
    borderRadius: '50%',
    animation: 'sparkle 3s linear infinite',
  },
  '&::before': {
    top: '20%',
    left: '10%',
    animationDelay: '0s',
  },
  '&::after': {
    top: '60%',
    right: '15%',
    animationDelay: '1.5s',
    background: '#06b6d4',
  },
  '@keyframes sparkle': {
    '0%, 100%': { opacity: 0, transform: 'scale(0)' },
    '50%': { opacity: 1, transform: 'scale(1)' },
  },
});

const GlassmorphismPaper = styled(Box)({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '24px',
  padding: '40px',
  maxWidth: '1200px',
  margin: 'auto',
  position: 'relative',
  boxShadow: `
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1)
  `,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: `
      0 16px 64px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(255, 255, 255, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.2)
    `,
  },
});

const StyledTable = styled(Table)({
  '& .MuiTableHead-root': {
    borderRadius: '12px 12px 0 0',
  },
});

const IndexCell = styled(TableCell)({
  color: 'rgba(99, 102, 241, 0.8) !important',
  fontWeight: '600 !important',
  textAlign: 'center !important',
});

const NameCell = styled(TableCell)({
  color: '#6366f1 !important',
  fontWeight: '600 !important',
  textShadow: '0 0 8px rgba(99, 102, 241, 0.3) !important',
});

const UsernameCell = styled(TableCell)({
  color: '#F0F0F0 !important',
  fontWeight: '500 !important',
});

const StatusCell = styled(TableCell)({
  color: '#10b981 !important',
  fontWeight: '600 !important',
  textShadow: '0 0 8px rgba(16, 185, 129, 0.5) !important',
  textTransform: 'uppercase !important',
  letterSpacing: '1px !important',
  '&::before': {
    content: '"●"',
    marginRight: '8px',
    animation: 'statusPulse 2s ease-in-out infinite',
  },
  '@keyframes statusPulse': {
    '0%, 100%': { 
      opacity: 0.6,
      transform: 'scale(1)',
    },
    '50%': { 
      opacity: 1,
      transform: 'scale(1.2)',
    },
  },
});

const DateCell = styled(TableCell)({
  color: 'rgba(240, 240, 240, 0.7) !important',
  fontStyle: 'italic !important',
});

const LoadingContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '60px',
  color: '#6366f1',
});

const LoadingText = styled(Typography)({
  fontWeight: '600 !important',
  color: '#6366f1 !important',
  textShadow: '0 0 10px rgba(99, 102, 241, 0.5) !important',
  letterSpacing: '1px !important',
  marginTop: '20px !important',
});

const NoUsersMessage = styled(Box)({
  textAlign: 'center',
  padding: '60px',
  color: 'rgba(240, 240, 240, 0.7)',
  fontSize: '1.1rem',
});

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

useEffect(() => {
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token used for request:", token);

    const response = await axios.get(`http://localhost:8081/api/users/group/3`, {
  headers: { Authorization: `Bearer ${token}` },
});


      console.log("Raw response data:", response.data);

      const filteredUsers = response.data.filter(
        user => user.group && user.group.id === 3
      );

      console.log("Filtered users (group id === 3):", filteredUsers);

      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
      console.log("Loading state set to false");
    }
  };

  fetchUsers();
}, []);


  return (
    <ThemeProvider theme={cosmicTheme}>
      <CosmicContainer>
        <FloatingParticles />
        <Box sx={{ padding: '40px 20px', position: 'relative', zIndex: 1 }}>
          <GlassmorphismPaper>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h4" gutterBottom sx={{ fontSize: '3rem', mb: 2 }}>
                Manage Users 
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.1rem' }}>
                Cosmic user management dashboard for your galactic community
              </Typography>
            </Box>
            
            {loading ? (
              <LoadingContainer>
                <CircularProgress size={60} sx={{ color: '#6366f1' }} />
                <LoadingText>
                  Scanning Cosmic Database...
                </LoadingText>
              </LoadingContainer>
            ) : users.length === 0 ? (
              <NoUsersMessage>
                <Typography>No users found in the cosmic registry</Typography>
              </NoUsersMessage>
            ) : (
              <StyledTable>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Status</TableCell>
<TableCell>Email</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user, index) => (
                    <TableRow key={user.id}>
                      <IndexCell>
                        {String(index + 1).padStart(2, '0')}
                      </IndexCell>
                    
                      <UsernameCell>
                        {user.username}
                      </UsernameCell>
                      <StatusCell>
                        Active
                      </StatusCell>
                     <DateCell>
  {user.email}
</DateCell>

                      <TableCell>
                        <Button 
                          onClick={() => navigate(`/admin/users/${user.id}/bookings`)} 
                          variant="contained"
                          sx={{
                            background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #5855eb 0%, #0891b2 100%)',
                              transform: 'scale(1.05)',
                            }
                          }}
                        >
                           View Bookings
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </StyledTable>
            )}
          </GlassmorphismPaper>
        </Box>
      </CosmicContainer>
    </ThemeProvider>
  );
};

export default ManageUsers;
