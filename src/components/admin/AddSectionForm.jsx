import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";

const SeatGrid = ({ section }) => {
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [tempPrice, setTempPrice] = useState("");
  const [tempVIP, setTempVIP] = useState(false);
  const [error, setError] = useState("");
  const [tempColor, setTempColor] = useState("");

  useEffect(() => {
    if (section?.id) {
      axios
        .get(`http://localhost:8081/api/seats/section/${section.id}`)
        .then((res) => {
          // هنا نتأكد من إضافة لون القسم لكل مقعد إذا كان لون المقعد فارغ
          const seatsWithColor = res.data.map((seat) => ({
            ...seat,
            color: seat.color || section.color || "#6c757d",
          }));
          setSeats(seatsWithColor);
        })
        .catch((err) => console.error("Error fetching seats:", err));
    }
  }, [section]);

  useEffect(() => {
    if (selectedSeat) {
      setTempPrice(selectedSeat.price.toString());
      setTempVIP(selectedSeat.vip || false);
      setTempColor(selectedSeat.color || section.color || "#6c757d");
      setError("");
    }
  }, [selectedSeat, section.color]);

  const maxRow = Math.max(...seats.map((s) => s.row), 0);
  const maxCol = Math.max(...seats.map((s) => s.number), 0);
  const grid = [];

  for (let r = 1; r <= maxRow; r++) {
    const rowSeats = [];
    for (let c = 1; c <= maxCol; c++) {
      const seat = seats.find((s) => s.row === r && s.number === c);
      rowSeats.push(seat || null);
    }
    grid.push(rowSeats);
  }

  const handleSeatClick = (seat) => {
    setSelectedSeat(seat);
  };

  const handleSave = () => {
    const priceNum = parseFloat(tempPrice);
    if (isNaN(priceNum) || priceNum <= 0) {
      setError("Please enter a valid price");
      return;
    }
    if (priceNum > section.price) {
      setError(`Price cannot exceed section price of $${section.price.toFixed(2)}`);
      return;
    }

    axios
      .put(`http://localhost:8081/api/seats/${selectedSeat.id}`, {
        ...selectedSeat,
        price: priceNum,
        vip: tempVIP,
        color: tempColor, // نرسل اللون الجديد للباكند
      })
      .then(() => {
        setSeats((prev) =>
          prev.map((s) =>
            s.id === selectedSeat.id ? { ...s, price: priceNum, vip: tempVIP, color: tempColor } : s
          )
        );
        setSelectedSeat(null);
      })
      .catch((e) => {
        console.error(e);
        setError("Failed to update seat");
      });
  };

  const handleClose = () => {
    setSelectedSeat(null);
    setError("");
  };

  return (
    <>
      <div style={{ display: "inline-block", border: "1px solid #ccc", padding: 10 }}>
        {grid.map((rowSeats, rowIndex) => (
          <div key={rowIndex} style={{ display: "flex", gap: 5, marginBottom: 5 }}>
            {rowSeats.map((seat, colIndex) =>
              seat ? (
                <div
                  key={seat.id}
                  onClick={() => handleSeatClick(seat)}
                  style={{
                    width: selectedSeat?.id === seat.id ? 50 : 40,
                    height: selectedSeat?.id === seat.id ? 50 : 40,
                    backgroundColor: seat.vip
                      ? "#FFD700" // لون ذهبي للمقاعد VIP
                      : seat.reserved
                      ? "red"
                      : seat.color || section.color || "#6c757d",
                    color: "#000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 5,
                    cursor: "pointer",
                    userSelect: "none",
                    fontWeight: "bold",
                    border: seat.vip ? "2px solid orange" : "none",
                    transition: "all 0.2s ease",
                    fontSize: selectedSeat?.id === seat.id ? "1.2em" : "1em",
                  }}
                  title={`Seat ${seat.code} - ${seat.reserved ? "Reserved" : "Available"}${seat.vip ? " (VIP)" : ""}`}
                >
                  {seat.code}
                </div>
              ) : (
                <div key={`empty-${colIndex}`} style={{ width: 40, height: 40 }} />
              )
            )}
          </div>
        ))}
      </div>

      {/* Dialog لتعديل سعر ومميزات المقعد */}
      <Dialog open={!!selectedSeat} onClose={handleClose}>
        <DialogTitle>Edit Seat {selectedSeat?.code}</DialogTitle>
        <DialogContent>
          <TextField
            label="Price"
            type="number"
            fullWidth
            value={tempPrice}
            onChange={(e) => setTempPrice(e.target.value)}
            inputProps={{ min: 0, step: 0.01 }}
            sx={{ mt: 1, mb: 2 }}
          />
          <FormControlLabel
            control={<Switch checked={tempVIP} onChange={(e) => setTempVIP(e.target.checked)} />}
            label="VIP Seat"
          />
          {/* input لاختيار اللون */}
          <TextField
            label="Seat Color"
            type="color"
            fullWidth
            value={tempColor}
            onChange={(e) => setTempColor(e.target.value)}
            sx={{ mt: 2, mb: 2 }}
          />
          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
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
            color: sectionColor, // نضيف لون القسم للمقاعد مباشرة
          });
        }
      }

      await axios.post(`http://localhost:8081/api/seats/section/${sectionId}/generate`, seats);

      alert("Section and seats added!");
      resetForm();
      await fetchSections();

      setNewSection({ ...sectionRes.data, rows, cols });
      setSelectedSection({ ...sectionRes.data, rows, cols });
      setSelectedSectionId(sectionId);
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
      if (selectedSectionId === sectionId) {
        setSelectedSection(null);
        setSelectedSectionId(null);
      }
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
          <Button variant="contained" onClick={editingSection ? handleUpdateSection : handleAddSection}>
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
              onClick={() => {
                // حساب الصفوف والأعمدة (لو غير موجودين)
                const cols = sec.cols || 10; // ممكن تعدل الافتراضي حسب API
                const rows = sec.rows || (sec.totalSeats ? Math.ceil(sec.totalSeats / cols) : 10);

                const enrichedSection = {
                  ...sec,
                  rows,
                  cols,
                };

                setSelectedSection(enrichedSection);
                setSelectedSectionId(sec.id);
              }}
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
                border: "1px solid #ccc",
              }}
            ></span>
            - Price: ${sec.price.toFixed(2)}
            <Button size="small" color="error" onClick={() => handleDeleteSection(sec.id)} sx={{ ml: 2 }}>
              Delete
            </Button>
            <Button size="small" onClick={() => handleEditClick(sec)} sx={{ ml: 1 }}>
              Edit
            </Button>

            {/* عرض شبكة المقاعد للقسم المختار */}
            {selectedSectionId === sec.id && selectedSection && (
              <Box sx={{ mt: 2 }}>
                <SeatGrid section={selectedSection} />
              </Box>
            )}
          </li>
        ))}
      </ul>
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


    
    </Box>
  );
};

export default AddSectionForm;
