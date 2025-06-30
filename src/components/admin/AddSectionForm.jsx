import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import axios from "axios";

const SeatGrid = ({ section }) => {
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [selectionMode, setSelectionMode] = useState("single"); // single, row, col
  const [selectedRowOrCol, setSelectedRowOrCol] = useState(null); // رقم الصف أو العمود حسب الوضع
  const [tempPrice, setTempPrice] = useState("");
  const [tempVIP, setTempVIP] = useState(false);
  const [tempColor, setTempColor] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (section?.id) {
      axios
        .get(`http://localhost:8081/api/seats/section/${section.id}`)
        .then((res) => {
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
    if (selectionMode === "single" && selectedSeat) {
      setTempPrice(selectedSeat.price.toString());
      setTempVIP(selectedSeat.vip || false);
      setTempColor(selectedSeat.color || section.color || "#6c757d");
      setError("");
      setSelectedRowOrCol(null);
    } else if (selectionMode === "row" && selectedRowOrCol != null) {
      // قيمة الصف المختار - نستخدم أول مقعد في الصف لتعبئة الحقول
      const seatsInRow = seats.filter((s) => s.row === selectedRowOrCol);
      if (seatsInRow.length > 0) {
        setTempPrice(seatsInRow[0].price.toString());
        setTempVIP(seatsInRow[0].vip || false);
        setTempColor(seatsInRow[0].color || section.color || "#6c757d");
        setError("");
      }
      setSelectedSeat(null);
    } else if (selectionMode === "col" && selectedRowOrCol != null) {
      // قيمة العمود المختار - نستخدم أول مقعد في العمود لتعبئة الحقول
      const seatsInCol = seats.filter((s) => s.number === selectedRowOrCol);
      if (seatsInCol.length > 0) {
        setTempPrice(seatsInCol[0].price.toString());
        setTempVIP(seatsInCol[0].vip || false);
        setTempColor(seatsInCol[0].color || section.color || "#6c757d");
        setError("");
      }
      setSelectedSeat(null);
    } else {
      // تنظيف القيم إذا لم يتم اختيار شيء
      setTempPrice("");
      setTempVIP(false);
      setTempColor(section.color || "#6c757d");
      setError("");
      setSelectedSeat(null);
      setSelectedRowOrCol(null);
    }
  }, [selectionMode, selectedSeat, selectedRowOrCol, seats, section.color]);

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

  // اختيار المقعد أو الصف أو العمود بناءً على الوضع الحالي
  const handleSeatClick = (seat) => {
    if (selectionMode === "single") {
      setSelectedSeat(seat);
      setSelectedRowOrCol(null);
    } else if (selectionMode === "row") {
      setSelectedRowOrCol(seat.row);
      setSelectedSeat(null);
    } else if (selectionMode === "col") {
      setSelectedRowOrCol(seat.number);
      setSelectedSeat(null);
    }
  };

  const handleSave = async () => {
    const priceNum = parseFloat(tempPrice);
    if (isNaN(priceNum) || priceNum <= 0) {
      setError("Please enter a valid price");
      return;
    }
    if (priceNum > section.price) {
      setError(`Price cannot exceed section price of $${section.price.toFixed(2)}`);
      return;
    }

    let seatsToUpdate = [];

    if (selectionMode === "single" && selectedSeat) {
      seatsToUpdate = [selectedSeat];
    } else if (selectionMode === "row" && selectedRowOrCol != null) {
      seatsToUpdate = seats.filter((s) => s.row === selectedRowOrCol);
    } else if (selectionMode === "col" && selectedRowOrCol != null) {
      seatsToUpdate = seats.filter((s) => s.number === selectedRowOrCol);
    } else {
      setError("No seat or row/column selected");
      return;
    }

    try {
      // تحديث كل المقاعد في التحديد
      await Promise.all(
        seatsToUpdate.map((seat) =>
          axios.put(`http://localhost:8081/api/seats/${seat.id}`, {
            ...seat,
            price: priceNum,
            vip: tempVIP,
            color: tempColor,
          })
        )
      );

      // تحديث الواجهة محلياً
      setSeats((prev) =>
        prev.map((s) =>
          seatsToUpdate.find((upd) => upd.id === s.id)
            ? { ...s, price: priceNum, vip: tempVIP, color: tempColor }
            : s
        )
      );

      setSelectedSeat(null);
      setSelectedRowOrCol(null);
      setError("");
    } catch (e) {
      console.error(e);
      setError("Failed to update seat(s)");
    }
  };

  const handleClose = () => {
    setSelectedSeat(null);
    setSelectedRowOrCol(null);
    setError("");
  };

  return (
    <>
      {/* اختيارات نوع التحديد */}
      <Box sx={{ mb: 2 }}>
        <ToggleButtonGroup
          value={selectionMode}
          exclusive
          onChange={(e, val) => {
            if (val !== null) {
              setSelectionMode(val);
              setSelectedSeat(null);
              setSelectedRowOrCol(null);
            }
          }}
          aria-label="selection mode"
        >
          <ToggleButton value="single" aria-label="single seat">
            Single Seat
          </ToggleButton>
          <ToggleButton value="row" aria-label="row">
            Whole Row
          </ToggleButton>
          <ToggleButton value="col" aria-label="column">
            Whole Column
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* الشبكة */}
      <div style={{ display: "inline-block", border: "1px solid #ccc", padding: 10 }}>
        {grid.map((rowSeats, rowIndex) => (
          <div key={rowIndex} style={{ display: "flex", gap: 5, marginBottom: 5 }}>
            {rowSeats.map((seat, colIndex) =>
              seat ? (
                <div
                  key={seat.id}
                  onClick={() => handleSeatClick(seat)}
                  style={{
                    width:
                      (selectionMode === "single" && selectedSeat?.id === seat.id) ||
                      (selectionMode === "row" && selectedRowOrCol === seat.row) ||
                      (selectionMode === "col" && selectedRowOrCol === seat.number)
                        ? 50
                        : 40,
                    height:
                      (selectionMode === "single" && selectedSeat?.id === seat.id) ||
                      (selectionMode === "row" && selectedRowOrCol === seat.row) ||
                      (selectionMode === "col" && selectedRowOrCol === seat.number)
                        ? 50
                        : 40,
                    backgroundColor: seat.vip
                      ? "#FFD700"
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
                    border:
                      (selectionMode === "single" && selectedSeat?.id === seat.id) ||
                      (selectionMode === "row" && selectedRowOrCol === seat.row) ||
                      (selectionMode === "col" && selectedRowOrCol === seat.number)
                        ? "2px solid orange"
                        : "none",
                    transition: "all 0.2s ease",
                    fontSize:
                      (selectionMode === "single" && selectedSeat?.id === seat.id) ||
                      (selectionMode === "row" && selectedRowOrCol === seat.row) ||
                      (selectionMode === "col" && selectedRowOrCol === seat.number)
                        ? "1.2em"
                        : "1em",
                  }}
                  title={`Seat ${seat.code} - ${seat.reserved ? "Reserved" : "Available"}${
                    seat.vip ? " (VIP)" : ""
                  }`}
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

      {/* Dialog تعديل مقعد أو صف أو عمود */}
      <Dialog open={selectionMode === "single" ? !!selectedSeat : selectedRowOrCol != null} onClose={handleClose}>
        <DialogTitle>
          {selectionMode === "single"
            ? `Edit Seat ${selectedSeat?.code}`
            : selectionMode === "row"
            ? `Edit Row ${selectedRowOrCol}`
            : `Edit Column ${selectedRowOrCol}`}
        </DialogTitle>
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

    
    </Box>
  );
};

export default AddSectionForm;
