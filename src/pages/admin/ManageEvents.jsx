import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography, IconButton, Tooltip, Dialog, DialogTitle, DialogContent,
  DialogActions, Button, TextField, MenuItem, FormControlLabel, Switch
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchEvents();
    fetchCategories();
    fetchLocations();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8081/api/events', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(res.data);
    } catch (err) {
      console.error("Failed to fetch events", err);
    }
  };

  const fetchCategories = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:8081/api/categories', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCategories(res.data);
  };

  const fetchLocations = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:8081/api/locations', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setLocations(res.data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8081/api/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEvents();
    } catch (err) {
      alert("Failed to delete event");
    }
  };

  const handleEdit = (event) => {
    setSelectedEvent({
      ...event,
      startDate: event.startDate?.slice(0, 16),
      endDate: event.endDate?.slice(0, 16)
    });
    setOpenEditModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem('token');
      const updatedEvent = {
        title: selectedEvent.title,
        description: selectedEvent.description,
        status: selectedEvent.status,
        startDate: selectedEvent.startDate,
        endDate: selectedEvent.endDate,
        isFeatured: selectedEvent.isFeatured,
        category: { id: selectedEvent.category?.id },
        location: { id: selectedEvent.location?.id }
      };
      await axios.put(`http://localhost:8081/api/events/${selectedEvent.id}`, updatedEvent, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOpenEditModal(false);
      fetchEvents();
    } catch (err) {
      alert("Failed to update event");
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 1100, mx: 'auto', mt: 4 }}>
      <Typography variant="h6" gutterBottom>Manage Events</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Event Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>From - To</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event, index) => (
              <TableRow key={event.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{event.title}</TableCell>
                <TableCell>{event.category?.name || 'N/A'}</TableCell>
                <TableCell>
                  {new Date(event.startDate).toLocaleDateString()} - {event.endDate ? new Date(event.endDate).toLocaleDateString() : 'N/A'}
                </TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton color="primary" onClick={() => handleEdit(event)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => handleDelete(event.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Modal */}
      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)} fullWidth>
        <DialogTitle>Edit Event</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            fullWidth
            value={selectedEvent?.title || ''}
            onChange={(e) => setSelectedEvent({ ...selectedEvent, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={selectedEvent?.description || ''}
            onChange={(e) => setSelectedEvent({ ...selectedEvent, description: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Status"
            fullWidth
            value={selectedEvent?.status || ''}
            onChange={(e) => setSelectedEvent({ ...selectedEvent, status: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Start Date"
            type="datetime-local"
            fullWidth
            value={selectedEvent?.startDate || ''}
            onChange={(e) => setSelectedEvent({ ...selectedEvent, startDate: e.target.value })}
          />
          <TextField
            margin="dense"
            label="End Date"
            type="datetime-local"
            fullWidth
            value={selectedEvent?.endDate || ''}
            onChange={(e) => setSelectedEvent({ ...selectedEvent, endDate: e.target.value })}
          />
          <TextField
            select
            fullWidth
            margin="dense"
            label="Category"
            value={selectedEvent?.category?.id || ''}
            onChange={(e) => {
              const category = categories.find(c => c.id === parseInt(e.target.value));
              setSelectedEvent({ ...selectedEvent, category });
            }}
          >
            {categories.map(cat => (
              <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
            ))}
          </TextField>
          <TextField
            select
            fullWidth
            margin="dense"
            label="Location"
            value={selectedEvent?.location?.id || ''}
            onChange={(e) => {
              const location = locations.find(l => l.id === parseInt(e.target.value));
              setSelectedEvent({ ...selectedEvent, location });
            }}
          >
            {locations.map(loc => (
              <MenuItem key={loc.id} value={loc.id}>{loc.name}</MenuItem>
            ))}
          </TextField>
          <FormControlLabel
            control={
              <Switch
                checked={selectedEvent?.isFeatured || false}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, isFeatured: e.target.checked })}
              />
            }
            label="Featured Event"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ManageEvents;
