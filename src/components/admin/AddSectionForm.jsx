import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Grid } from "@mui/material";
import axios from "axios";

// مثال بسيط لمكون SeatGrid لعرض شبكة المقاعد
const SeatGrid = ({ section }) => {
  const { rows, cols, name, color, price } = section;

  const seats = [];
  for (let row = 1; row <= rows; row++) {
    const rowSeats = [];
    for (let col = 1; col <= cols; col++) {
      rowSeats.push(
        <Box
          key={`${row}-${col}`}
          sx={{
            width: 30,
            height: 30,
            backgroundColor: color,
            margin: 0.5,
            borderRadius: "4px",
            display: "inline-block",
            lineHeight: "30px",
            textAlign: "center",
            color: "white",
            fontWeight: "bold",
            userSelect: "none",
          }}
          title={`Seat ${name}${row}-${col} - $${price.toFixed(2)}`}
        >
          {col}
        </Box>
      );
    }
    seats.push(
      <Box key={row} sx={{ mb: 1 }}>
        <Typography variant="body2" component="span" sx={{ mr: 1 }}>
          Row {row}:
        </Typography>
        {rowSeats}
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2, p: 2, border: "1px solid #ccc", borderRadius: "8px" }}>
      <Typography variant="subtitle1" gutterBottom>
        Seats layout for section: {name}
      </Typography>
      {seats}
    </Box>
  );
};

const AddSectionForm = ({ eventId }) => {
  const [sectionName, setSectionName] = useState("");
  const [sectionColor, setSectionColor] = useState("#000000");
  const [sectionPrice, setSectionPrice] = useState("");
  const [numberOfRows, setNumberOfRows] = useState("");
  const [numberOfColumns, setNumberOfColumns] = useState("");
  const [sections, setSections] = useState([]);
  const [editingSection, setEditingSection] = useState(null);
  const [newSection, setNewSection] = useState(null);
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);



  useEffect(() => {
    if (eventId) {
      fetchSections();
    }
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
    setSectionColor("#000000");
    setSectionPrice("");
    setNumberOfRows("");
    setNumberOfColumns("");
    setEditingSection(null);
  };

  const handleAddSection = async () => {
    try {
      if (!sectionName.trim() || !sectionColor || !sectionPrice || !numberOfRows || !numberOfColumns) {
        alert("Please fill all required fields");
        return;
      }

      const isDuplicate = sections.some(
        (sec) => sec.name.toLowerCase() === sectionName.trim().toLowerCase()
      );
      if (isDuplicate) {
        alert("A section with this name already exists.");
        return;
      }

      const rows = parseInt(numberOfRows, 10);
      const cols = parseInt(numberOfColumns, 10);
      const price = parseFloat(sectionPrice);

      if (isNaN(rows) || isNaN(cols) || rows <= 0 || cols <= 0) {
        alert("Please enter valid rows and columns");
        return;
      }
      if (isNaN(price) || price <= 0) {
        alert("Please enter a valid price");
        return;
      }

      const totalSeats = rows * cols;
      const sectionRes = await axios.post(
        `http://localhost:8081/api/sections/create?eventId=${eventId}`,
        { name: sectionName, color: sectionColor, totalSeats, price }
      );

      const sectionId = sectionRes.data.id;

      const seats = [];
      for (let row = 1; row <= rows; row++) {
        for (let col = 1; col <= cols; col++) {
          seats.push({
            code: `${sectionName}${row}-${col}`,
            reserved: false,
            available: true,
            price,
            row,
            number: col,
          });
        }
      }

      await axios.post(`http://localhost:8081/api/seats/section/${sectionId}/generate`, seats);

      alert("Section and seats added!");
      resetForm();
      await fetchSections();

      // عرض القسم الجديد مع عدد الصفوف والأعمدة
      setNewSection({ ...sectionRes.data, rows, cols });
setSelectedSection({ ...sectionRes.data, rows, cols }); // ✅ خليه يبين دغري

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
  };

  const handleUpdateSection = async () => {
    try {
      if (!editingSection) return;

      if (!sectionName.trim() || !sectionColor || !sectionPrice) {
        alert("Please fill all required fields");
        return;
      }

      const price = parseFloat(sectionPrice);
      if (isNaN(price) || price <= 0) {
        alert("Please enter a valid price");
        return;
      }

      await axios.put(`http://localhost:8081/api/sections/${editingSection.id}`, {
        name: sectionName,
        color: sectionColor,
        totalSeats: editingSection.totalSeats,
        price,
        eventId,
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
        {!editingSection && (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Number of Rows"
                type="number"
                fullWidth
                value={numberOfRows}
                onChange={(e) => setNumberOfRows(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Number of Columns"
                type="number"
                fullWidth
                value={numberOfColumns}
                onChange={(e) => setNumberOfColumns(e.target.value)}
              />
            </Grid>
          </>
        )}
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
    <Button
      variant="text"
      onClick={() => setSelectedSectionId(sec.id)}
      sx={{ textTransform: "none", fontWeight: "bold" }}
    >
      {sec.name}
    </Button>
    <span
      style={{
        display: "inline-block",
        width: "20px",
        height: "20px",
        backgroundColor: sec.color,
        margin: "0 8px",
        verticalAlign: "middle",
        border: "1px solid #ccc"
      }}
    ></span>
    - Price: ${sec.price.toFixed(2)}
    <Button
      size="small"
      color="error"
      onClick={() => handleDeleteSection(sec.id)}
      sx={{ ml: 2 }}
    >
      Delete
    </Button>
    <Button
      size="small"
      onClick={() => handleEditClick(sec)}
      sx={{ ml: 1 }}
    >
      Edit
    </Button>

    {/* هنا استبدل الـ SeatGrid القديم */}
    {selectedSectionId === sec.id && (
      <SeatGrid section={sec} /> 
    )}
  </li>
))}

</ul>


      {/* عرض شبكة المقاعد للقسم الجديد */}
      {newSection && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Seats for {newSection.name}</Typography>
          <SeatGrid section={newSection} />
        </Box>
      )}
    </Box>
  );
};

export default AddSectionForm;
