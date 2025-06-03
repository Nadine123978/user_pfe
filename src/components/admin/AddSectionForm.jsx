import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Grid } from "@mui/material";
import axios from "axios";

const AddSectionForm = ({ eventId }) => {
  const [sectionName, setSectionName] = useState("");
  const [sectionColor, setSectionColor] = useState("");
  const [sectionPrice, setSectionPrice] = useState("");
  const [numberOfSeats, setNumberOfSeats] = useState("");
  const [sections, setSections] = useState([]);
  const [editingSection, setEditingSection] = useState(null);

  // جلب الأقسام الخاصة بالحدث eventId
  useEffect(() => {
    if (!eventId) return;
    fetchSections();
  }, [eventId]);

  const fetchSections = async () => {
    try {
      const res = await axios.get(`http://localhost:8081/api/sections/event/${eventId}`);
      setSections(res.data);
    } catch (error) {
      console.error("Failed to fetch sections", error);
    }
  };

  const resetForm = () => {
    setSectionName("");
    setSectionColor("");
    setSectionPrice("");
    setNumberOfSeats("");
    setEditingSection(null);
  };

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

      resetForm();

      await fetchSections();
    } catch (error) {
      console.error("Error adding section/seats:", error);
      alert("Error adding data");
    }
  };

  const handleDeleteSection = async (sectionId) => {
    if (!window.confirm("Are you sure you want to delete this section?")) return;

    try {
      await axios.delete(`http://localhost:8081/api/sections/${sectionId}`);
      alert("Section deleted successfully");
      await fetchSections();
    } catch (error) {
      console.error("Failed to delete section:", error);
      alert("Error deleting section");
    }
  };

  const handleEditClick = (section) => {
    setEditingSection(section);
    setSectionName(section.name);
    setSectionColor(section.color);
    setSectionPrice(section.price.toString());
    setNumberOfSeats(section.totalSeats.toString());
  };
const handleUpdateSection = async () => {
  try {
    if (!editingSection) return;

    if (!sectionName.trim()) {
      alert("Please enter a section name");
      return;
    }
    if (!sectionColor) {
      alert("Please choose a color");
      return;
    }
    // حذف التحقق من عدد الكراسي:
    // const seatsCount = parseInt(numberOfSeats, 10);
    // if (isNaN(seatsCount) || seatsCount <= 0) {
    //   alert("Please enter a valid number of seats");
    //   return;
    // }
    if (!sectionPrice || Number(sectionPrice) <= 0) {
      alert("Please enter a valid price");
      return;
    }

    // تحديث القسم مع استخدام القيمة الحالية بدون التحقق من عدد الكراسي
    await axios.put(`http://localhost:8081/api/sections/${editingSection.id}`, {
      name: sectionName,
      color: sectionColor,
     totalSeats: editingSection.totalSeats,
      price: Number(sectionPrice),
      eventId: eventId,
    });

    alert("Section updated!");

    resetForm();

    await fetchSections();
  } catch (error) {
    console.error("Error updating section:", error);
    alert("Error updating data");
  }
};

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        {editingSection ? "Edit Section" : "Add New Section"}
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
            disabled={!!editingSection} // تعطيل تعديل عدد الكراسي أثناء التعديل
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={editingSection ? handleUpdateSection : handleAddSection}
          >
            {editingSection ? "Update Section" : "Add Section + Seats"}
          </Button>
          {editingSection && (
            <Button variant="outlined" onClick={resetForm} sx={{ ml: 2 }}>
              Cancel
            </Button>
          )}
        </Grid>
      </Grid>

      <Typography variant="h6" sx={{ mt: 4 }}>
        Existing Sections
      </Typography>
      <ul>
        {sections.map((sec) => (
          <li key={sec.id} style={{ marginBottom: "8px" }}>
            {sec.name} - Color:{" "}
            <span
              style={{
                display: "inline-block",
                width: "20px",
                height: "20px",
                backgroundColor: sec.color,
                marginRight: "8px",
                verticalAlign: "middle",
              }}
            ></span>{" "}
            - Price: ${sec.price.toFixed(2)}
            <Button
              size="small"
              color="error"
              onClick={() => handleDeleteSection(sec.id)}
              sx={{ ml: 2 }}
            >
              Delete
            </Button>
            <Button size="small" onClick={() => handleEditClick(sec)} sx={{ ml: 1 }}>
              Edit
            </Button>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default AddSectionForm;
