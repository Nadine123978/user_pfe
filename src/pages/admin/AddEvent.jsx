import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button, TextField, Typography, Grid, Paper, InputLabel,
  MenuItem, FormControl, Select
} from '@mui/material';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
  display: 'none',
});

const AddEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [locationId, setLocationId] = useState('');
  const [file, setFile] = useState(null);

  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      try {
        const [catRes, locRes] = await Promise.all([
          axios.get("http://localhost:8081/api/categories", { headers }),
          axios.get("http://localhost:8081/api/locations", { headers }),
        ]);
        setCategories(catRes.data);
        setLocations(locRes.data);
      } catch (error) {
        console.error("Error fetching categories or locations:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(startDate) >= new Date(endDate)) {
      alert("Start date must be before end date.");
      return;
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("categoryId", categoryId);
    formData.append("locationId", locationId);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("file", file);
    formData.append("status", "draft");  // مهم: نحدد الحالة draft

    try {
      await axios.post('http://localhost:8081/api/events/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Event added successfully as a draft. You can publish it later.");

      setTitle('');
      setDescription('');
      setStartDate('');
      setEndDate('');
      setCategoryId('');
      setLocationId('');
      setFile(null);
    } catch (err) {
      console.error("Error uploading event:", err);
      alert("Failed to add event");
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 800, margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>Add Event</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>

          <Grid item xs={12}>
            <TextField label="Title" fullWidth required value={title} onChange={(e) => setTitle(e.target.value)} />
          </Grid>

          <Grid item xs={12}>
            <TextField label="Description" fullWidth multiline rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Start Date"
              type="datetime-local"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="End Date"
              type="datetime-local"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth required>
              <InputLabel>Location</InputLabel>
              <Select value={locationId} onChange={(e) => setLocationId(e.target.value)}>
                {locations.map((loc) => (
                  <MenuItem key={loc.id} value={loc.id}>{loc.venueName}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <label htmlFor="upload-photo">
              <Input accept="image/*" id="upload-photo" type="file" onChange={(e) => setFile(e.target.files[0])} />
              <Button variant="contained" component="span">Upload Image</Button>
            </label>
            {file && <Typography variant="caption">{file.name}</Typography>}
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create Event (Save as Draft)
            </Button>
          </Grid>

        </Grid>
      </form>
    </Paper>
  );
};

export default AddEvent;
