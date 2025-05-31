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
} from '@mui/material';
import AdminTableRow from './AdminTableRow';
import UserTableHeader from './UserTableHeader';
import EditModal from './EditModal';

const AdminTable = () => {
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);

  const token = localStorage.getItem("token");


  const fetchAdmins = () => {
    if (!token) {
      console.error("No token found in localStorage!");
      return;
    }

    axios.get('http://localhost:8081/secure1234/super-admin/admins', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setAdmins(res.data))
    .catch(err => {
      console.error("Error fetching admins:", err);
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

    axios.put(`http://localhost:8081/secure1234/super-admin/update-admin/${updatedAdmin.id}`, {
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
      setDeleteConfirmOpen(false);
      setAdminToDelete(null);
    });
};

  return (
    <>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="admins table">
          <UserTableHeader />
          <TableBody>
            {admins.map((admin, index) => (
              <AdminTableRow
                key={admin.id || index}
                admin={{
                  ...admin,
                  name: admin.fullName,
                  status: "Active",
                  date: "2024-05-22",
                  ip: "127.0.0.1",
                  img: null
                }}
                onEdit={handleEdit}
                onDelete={confirmDelete}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
  <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
  <Button onClick={handleDeleteConfirmed} color="error">Delete</Button>
</DialogActions>
</Dialog>

    </>
  );
};

export default AdminTable;
