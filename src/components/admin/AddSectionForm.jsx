import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Grid } from "@mui/material";
import axios from "axios";

const AddSectionForm = ({ eventId }) => {
  const [sectionName, setSectionName] = useState("");
  const [sectionColor, setSectionColor] = useState("");
  const [sectionPrice, setSectionPrice] = useState("");
  const [numberOfSeats, setNumberOfSeats] = useState("");
  const [sections, setSections] = useState([]);

  // جلب الأقسام الخاصة بالحدث eventId
  useEffect(() => {
    if (!eventId) return;

    axios
      .get(`http://localhost:8081/api/sections/event/${eventId}`)
      .then((res) => setSections(res.data))
      .catch((err) => console.error("Failed to fetch sections", err));
  }, [eventId]);

  const handleAddSection = async () => {
    try {
      if (!sectionName.trim()) {
        alert("Please enter a section name");
        return;
      }
      if (!sectionColor) {
        alert("Please choose a color");
        return;
      }
      const seatsCount = parseInt(numberOfSeats, 10);
      if (isNaN(seatsCount) || seatsCount <= 0) {
        alert("Please enter a valid number of seats");
        return;
      }
      if (!sectionPrice || Number(sectionPrice) <= 0) {
        alert("Please enter a valid price");
        return;
      }

      // إنشاء القسم مع eventId
      const sectionRes = await axios.post(
        `http://localhost:8081/api/sections/create?eventId=${eventId}`,
        {
          name: sectionName,
          color: sectionColor,
          totalSeats: seatsCount,
          price: Number(sectionPrice),
        }
      );

      const sectionId = sectionRes.data.id;

      // إنشاء الكراسي للقسم الجديد
      const seats = [];
      for (let i = 1; i <= seatsCount; i++) {
        seats.push({
          code: `${sectionName}${i}`,
          reserved: false,
          available: true,
          price: Number(sectionPrice),
          row: 1,
          number: i,
        });
      }

      await axios.post(`http://localhost:8081/api/seats/section/${sectionId}`, seats);

      alert("Section and seats added!");

      // تنظيف الحقول
      setSectionName("");
      setSectionColor("");
      setSectionPrice("");
      setNumberOfSeats("");

      // تحديث الأقسام بعد الإضافة
      const updatedSections = await axios.get(`http://localhost:8081/api/sections/event/${eventId}`);
      setSections(updatedSections.data);
    } catch (error) {
      console.error("Error adding section/seats:", error);
      alert("Error adding data");
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        Add New Section
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Section Name"
            fullWidth
            value={sectionName}
            onChange={(e) => setSectionName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <label htmlFor="section-color">Color</label>
          <input
            id="section-color"
            type="color"
            value={sectionColor}
            onChange={(e) => setSectionColor(e.target.value)}
            style={{ width: "100%", height: "40px", border: "none", cursor: "pointer" }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Price"
            type="number"
            fullWidth
            value={sectionPrice}
            onChange={(e) => setSectionPrice(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Number of Seats"
            type="number"
            fullWidth
            value={numberOfSeats}
            onChange={(e) => setNumberOfSeats(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleAddSection}>
            Add Section + Seats
          </Button>
        </Grid>
      </Grid>

      <Typography variant="h6" sx={{ mt: 4 }}>
        Existing Sections
      </Typography>
      <ul>
        {sections.map((sec) => (
          <li key={sec.id}>
            {sec.name} - Color: {sec.color} - Price: ${sec.price}
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default AddSectionForm;
