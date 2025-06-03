import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import axios from "axios";

const EditSeatsPage = () => {
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [editingSeat, setEditingSeat] = useState(null);

  // Fetch sections with seats
  const fetchSections = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/sections/with-seats");

      if (Array.isArray(response.data)) {
        setSections(response.data);
      } else if (Array.isArray(response.data.sections)) {
        setSections(response.data.sections);
      } else {
        console.error("Unexpected response format", response.data);
        setSections([]);
      }
    } catch (error) {
      console.error("Error fetching sections:", error);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  useEffect(() => {
    if (selectedSection) {
      const updated = sections.find((sec) => sec.id === selectedSection.id);
      if (updated) {
        setSelectedSection(updated);
      }
    }
  }, [sections]);

  const groupSeatsByRow = (seats) => {
    const rows = {};
    seats.forEach((seat) => {
      const rowLetter = seat.code[0];
      if (!rows[rowLetter]) rows[rowLetter] = [];
      rows[rowLetter].push(seat);
    });
    return Object.values(rows);
  };

  const handleSeatClick = (seat) => {
    setEditingSeat(seat);
  };

const handleSaveSeat = async () => {
  try {
    // عدّل بيانات الكرسي
    await axios.put(`http://localhost:8081/api/seats/${editingSeat.id}`, editingSeat);

    // بعد التعديل، جيب البيانات من الـ backend
   const response = await axios.get("http://localhost:8081/api/sections");



    // حدث الحالة بالبيانات المحدثة من السيرفر
    setSections(response.data);

    // حدّد الـ selected section مجددًا (لأنو sections تغيروا)
    const updatedSelectedSection = response.data.find(
      (section) => section.id === selectedSection.id
    );
    setSelectedSection(updatedSelectedSection);

    // خلّص التعديل
    setEditingSeat(null);
  } catch (error) {
    console.error("Error updating seat:", error);
  }
};


  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Edit Event Seats
      </Typography>

      <Grid container spacing={2}>
        {Array.isArray(sections) &&
          sections.map((section) => (
            <Grid item key={section.id}>
              <Button
                variant="contained"
                onClick={() => setSelectedSection(section)}
              >
                {section.name}
              </Button>
            </Grid>
          ))}
      </Grid>

      {selectedSection && Array.isArray(selectedSection.seats) && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Seats in {selectedSection.name}
          </Typography>
          {groupSeatsByRow(selectedSection.seats).map((rowSeats, rowIndex) => (
            <Box key={rowIndex} display="flex" mb={1}>
              {rowSeats.map((seat) => (
                <Box
                  key={seat.id}
                  onClick={() => handleSeatClick(seat)}
                  sx={{
                    width: 30,
                    height: 30,
                    borderRadius: "3px",
                   backgroundColor: seat.color ? seat.color : (selectedSection.color || "#ccc"),
                    color: "white",
                    textAlign: "center",
                    lineHeight: "30px",
                    fontSize: "12px",
                    mx: "2px",
                    cursor: "pointer",
                    border: seat.reserved ? "2px solid red" : "none",
                  }}
                >
                  {seat.code.slice(1)}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      )}

      <Dialog open={Boolean(editingSeat)} onClose={() => setEditingSeat(null)}>
        <DialogTitle>Edit Seat</DialogTitle>
        <DialogContent>
          <TextField
            label="Price"
            type="number"
            fullWidth
            margin="dense"
            value={editingSeat?.price || ""}
            onChange={(e) =>
              setEditingSeat({ ...editingSeat, price: e.target.value })
            }
          />
          <TextField
            label="Color"
            type="color"
            fullWidth
            margin="dense"
            value={editingSeat?.color || "#000000"}
            onChange={(e) =>
              setEditingSeat({ ...editingSeat, color: e.target.value })
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={editingSeat?.reserved || false}
                onChange={(e) =>
                  setEditingSeat({
                    ...editingSeat,
                    reserved: e.target.checked,
                  })
                }
              />
            }
            label="Reserved"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingSeat(null)}>Cancel</Button>
          <Button onClick={handleSaveSeat} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EditSeatsPage;
