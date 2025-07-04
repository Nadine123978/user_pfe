import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Typography,
  CircularProgress
} from '@mui/material';
import AdminTableRow from './AdminTableRow';
import UserTableHeader from './UserTableHeader';
import EditModal from './EditModal';
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
    h4: {
      fontWeight: 700,
      background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          color: '#6366f1',
          fontWeight: 700,
          textAlign: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '14px',
          padding: '12px 24px',
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
          '&.MuiButton-outlined': {
            border: '1px solid rgba(99, 102, 241, 0.5)',
            color: '#6366f1',
            '&:hover': {
              border: '1px solid #6366f1',
              background: 'rgba(99, 102, 241, 0.1)',
              transform: 'translateY(-2px)',
            },
          },
        },
      },
    },
  },
});

// Keyframes for animations (copied from AddEvent/EditEvent)
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-10px) rotate(1deg); }
  66% { transform: translateY(5px) rotate(-1deg); }
`;

const sparkleAnimation = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
`;

const shimmerAnimation = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// Styled components (copied from AddEvent/EditEvent)
const CosmicContainer = styled(Box)(({ theme }) => ({
  minHeight: '100%',
  background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #2d1b69 100%)',
  position: 'relative',
  overflow: 'hidden',
  padding: theme.spacing(4),
}));

const FloatingParticles = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: `
    radial-gradient(2px 2px at 20px 30px, #ffffff, transparent),
    radial-gradient(2px 2px at 40px 70px, rgba(139, 92, 246, 0.8), transparent),
    radial-gradient(1px 1px at 90px 40px, rgba(6, 182, 212, 0.8), transparent),
    radial-gradient(1px 1px at 130px 80px, #ffffff, transparent),
    radial-gradient(2px 2px at 160px 30px, rgba(16, 185, 129, 0.8), transparent)
  `,
  backgroundRepeat: 'repeat',
  backgroundSize: '300px 300px',
  animation: `${sparkleAnimation} 3s linear infinite`,
  pointerEvents: 'none',
});

const GlassmorphismPaper = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(20px)',
  borderRadius: '24px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
  padding: theme.spacing(5),
  position: 'relative',
  zIndex: 10,
  maxWidth: '1300px',
  margin: '0 auto',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '24px',
    background: `linear-gradient(135deg, 
      rgba(139, 92, 246, 0.1) 0%, 
      rgba(6, 182, 212, 0.1) 50%, 
      rgba(16, 185, 129, 0.1) 100%)`,
    backgroundSize: '200% 200%',
    animation: `${shimmerAnimation} 3s ease-in-out infinite`,
    zIndex: -1,
  },
}));

const CosmicTitle = styled(Typography)(({ theme }) => ({
  fontSize: '3.5rem', // ⬅ أكبر حجم ممكن بشكل متوازن
  fontWeight: '900',  // ⬅ أثقل وزن للخط
  background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textAlign: 'center',
  marginBottom: theme.spacing(2),
  textShadow: `
    0 0 20px rgba(139, 92, 246, 0.5),
    0 0 40px rgba(99, 102, 241, 0.4)
  `,
}));
const CosmicSubtitle = styled(Typography)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.8)',
  textAlign: 'center',
  marginBottom: theme.spacing(4),
  fontSize: '1.1rem',
  fontWeight: '300',
}));

const AdminTable = () => {
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  const fetchAdmins = () => {
    if (!token) {
      console.error("No token found in localStorage!");
      setError("Authentication token not found. Please log in.");
      setLoading(false);
      return;
    }

    axios.get('http://localhost:8081/secure1234/super-admin/admins', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setAdmins(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.error("Error fetching admins:", err);
      setError("Failed to load admin data. Please try again later.");
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleEdit = (admin) => {
    setSelectedAdmin({
      ...admin,
      name: admin.fullName
    });
    setOpenModal(true);
  };

  const handleSave = (updatedAdmin) => {
    if (!updatedAdmin.id) {
      console.error("No admin id provided!");
      return;
    }

    axios.put(`http://localhost:8081/secure1234/super-admin/update-user/${updatedAdmin.id}`, {
      fullName: updatedAdmin.fullName,
      email: updatedAdmin.email,
      role: updatedAdmin.role,
      password: updatedAdmin.password
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      fetchAdmins();
      setOpenModal(false);
    })
    .catch(err => {
      console.error("Failed to update admin:", err);
      setError("Failed to update admin. Please try again.");
    });
  };

  const confirmDelete = (adminId) => {
    setAdminToDelete(adminId);
    setDeleteConfirmOpen(true);
  };

 const handleDeleteConfirmed = () => {
  if (!adminToDelete) return;

  const token = localStorage.getItem('token')?.replace(/^"(.*)"$/, '$1');
  console.log("Deleting admin with ID:", adminToDelete);
  console.log("Token:", token);

  axios.delete(`http://localhost:8081/secure1234/super-admin/delete-admin/${adminToDelete}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(() => {
      fetchAdmins(); // لتحديث القائمة
      setDeleteConfirmOpen(false);
      setAdminToDelete(null);
    })
    .catch(err => {
      console.error("Failed to delete admin:", err.response?.data || err.message);
      setError("Failed to delete admin. " + (err.response?.data?.message || err.message));
      setDeleteConfirmOpen(false);
      setAdminToDelete(null);
    });
};

  return (
    <ThemeProvider theme={cosmicTheme}>
      <CosmicContainer>
        <FloatingParticles />
        <GlassmorphismPaper>
          <CosmicTitle> Admin Management</CosmicTitle>
          <CosmicSubtitle>
            Manage your cosmic administrators with precision.
          </CosmicSubtitle>

          {loading && (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
              <CircularProgress size={60} sx={{ color: '#6366f1', mb: 2 }} />
              <Typography variant="h6" color="white" ml={2}>
                Loading admins...
              </Typography>
            </Box>
          )}

          {error && (
            <Typography color="error" textAlign="center" variant="h6" sx={{ my: 4 }}>
              Error: {error}
            </Typography>
          )}

          {!loading && !error && (
            <TableContainer component={GlassmorphismPaper} sx={{ maxHeight: 440, overflow: 'auto', p: 0 }}>
              <Table stickyHeader aria-label="admins table">
                <UserTableHeader />
                <TableBody>
                  {admins.map((admin, index) => (
                    <AdminTableRow
                      key={admin.id || index}
                      admin={{
                        ...admin,
                        name: admin.fullName,
                        status: "Active", // Assuming a default status for display
                        date: "2024-05-22", // Assuming a default date for display
                        ip: "127.0.0.1", // Assuming a default IP for display
                        img: null // Assuming no image for now
                      }}
                      onEdit={handleEdit}
                      onDelete={confirmDelete}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <EditModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            adminData={selectedAdmin}
            onSave={handleSave}
          />

          <Dialog
            open={deleteConfirmOpen}
            onClose={() => setDeleteConfirmOpen(false)}
          >
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this admin? This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteConfirmOpen(false)} variant="outlined">
                Cancel
              </Button>
              <Button onClick={handleDeleteConfirmed} color="error" variant="contained">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </GlassmorphismPaper>
      </CosmicContainer>
    </ThemeProvider>
  );
};

export default AdminTable;


