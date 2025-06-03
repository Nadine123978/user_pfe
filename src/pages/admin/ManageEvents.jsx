import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography, IconButton, Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
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

  return (
    <Paper sx={{ p: 3, maxWidth: 1100, mx: 'auto', mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Manage Events
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Event Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Event From - To</TableCell>
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
                    <IconButton color="primary">
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
    </Paper>
  );
};

export default ManageEvents;
