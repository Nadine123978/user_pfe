import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";

const Input = styled("input")({
  display: "none",
});

const EditEvent = () => {
  const { id } = useParams(); // id الحدث من الرابط
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [locationId, setLocationId] = useState("");
  const [file, setFile] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState("");

  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    const fetchData = async () => {
      try {
        // تحميل بيانات الحدث
        const eventRes = await axios.get(`http://localhost:8081/api/events/${id}`, { headers });
        const event = eventRes.data;
        setTitle(event.title);
        setDescription(event.description);
        setStartDate(event.startDate?.slice(0, 16)); // لإظهار التاريخ بصيغة input datetime-local
        setEndDate(event.endDate?.slice(0, 16));
        setCategoryId(event.category?.id || "");
        setLocationId(event.location?.id || "");
        setExistingImageUrl(event.imageUrl || "");

        // تحميل التصنيفات والمواقع
        const [catRes, locRes] = await Promise.all([
          axios.get("http://localhost:8081/api/categories", { headers }),
          axios.get("http://localhost:8081/api/locations", { headers }),
        ]);
        setCategories(catRes.data);
        setLocations(locRes.data);
      } catch (error) {
        console.error("Error loading event or lists:", error);
        alert("Failed to load event data.");
      }
    };

    fetchData();
  }, [id]);

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
    if (file) formData.append("file", file);

    try {
      await axios.put(`http://localhost:8081/api/events/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Event updated successfully!");
      navigate("/admin/events/manage"); // الرجوع لقائمة الأحداث بعد التعديل
    } catch (err) {
      console.error("Error updating event:", err);
      alert("Failed to update event");
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 800, margin: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Edit Event
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              fullWidth
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
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
              <Select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth required>
              <InputLabel>Location</InputLabel>
              <Select
                value={locationId}
                onChange={(e) => setLocationId(e.target.value)}
              >
                {locations.map((loc) => (
                  <MenuItem key={loc.id} value={loc.id}>
                    {loc.venueName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <img
              src={file ? URL.createObjectURL(file) : existingImageUrl || "/placeholder.png"}
              alt="Event"
              style={{ maxWidth: "100%", maxHeight: 250, marginBottom: 10 }}
            />
            <label htmlFor="upload-photo">
              <Input
                accept="image/*"
                id="upload-photo"
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <Button variant="contained" component="span" sx={{ mr: 2 }}>
                Upload New Image
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate(`/admin/seating/${id}`)}
              >
                Manage Seating
              </Button>
            </label>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default EditEvent;
