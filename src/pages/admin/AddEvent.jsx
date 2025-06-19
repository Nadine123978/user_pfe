import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import axios from "axios";

const AddEvent = () => {
  const [eventName, setEventName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("draft");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("eventName", eventName);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("image", image);
    formData.append("status", status);

    try {
      await axios.post("http://localhost:8081/api/events", formData);
      alert("Event added successfully!");
    } catch (error) {
      console.error("Error adding event:", error);
      alert("Something went wrong");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Add New Event
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          type="date"
          label="Start Date"
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          type="date"
          label="End Date"
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select value={status} label="Status" onChange={(e) => setStatus(e.target.value)}>
            <MenuItem value="draft">Draft</MenuItem>
            <MenuItem value="upcoming">Upcoming</MenuItem>
            <MenuItem value="active">Active</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" component="label" sx={{ mt: 2 }}>
          Upload Image
          <input
            type="file"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Button>
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default AddEvent;
