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
  if (!section) return <Typography color="error">Section not loaded</Typography>;

  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [selectionMode, setSelectionMode] = useState("single");
  const [selectedRowOrCol, setSelectedRowOrCol] = useState(null);
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
      const seatsInRow = seats.filter((s) => s.row === selectedRowOrCol);
      if (seatsInRow.length > 0) {
        setTempPrice(seatsInRow[0].price.toString());
        setTempVIP(seatsInRow[0].vip || false);
        setTempColor(seatsInRow[0].color || section.color || "#6c757d");
        setError("");
      }
      setSelectedSeat(null);
    } else if (selectionMode === "col" && selectedRowOrCol != null) {
      const seatsInCol = seats.filter((s) => s.number === selectedRowOrCol);
      if (seatsInCol.length > 0) {
        setTempPrice(seatsInCol[0].price.toString());
        setTempVIP(seatsInCol[0].vip || false);
        setTempColor(seatsInCol[0].color || section.color || "#6c757d");
        setError("");
      }
      setSelectedSeat(null);
    } else {
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
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        .professional-container {
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
          padding: 20px;
        }
        
        .main-card {
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 
            0 4px 20px rgba(0, 0, 0, 0.08),
            0 1px 3px rgba(0, 0, 0, 0.05);
          padding: 32px;
          margin: 0 auto;
          max-width: 1200px;
          border: 1px solid rgba(0, 123, 255, 0.1);
          transition: all 0.3s ease;
        }
        
        .main-card:hover {
          box-shadow: 
            0 8px 30px rgba(0, 0, 0, 0.12),
            0 2px 6px rgba(0, 0, 0, 0.08);
          transform: translateY(-2px);
        }
        
        .professional-title {
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: 2.25rem;
          color: #1a202c;
          text-align: center;
          margin-bottom: 32px;
          position: relative;
        }
        
        .professional-title::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 4px;
          background: linear-gradient(90deg, #007bff, #00c8c8);
          border-radius: 2px;
        }
        
        .selection-mode-container {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 32px;
          border: 1px solid #e9ecef;
        }
        
        .mode-label {
          font-weight: 600;
          color: #495057;
          margin-bottom: 16px;
          font-size: 1.1rem;
        }
        
        .professional-toggle-group {
          display: flex;
          gap: 8px;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .professional-toggle-button {
          background: #ffffff !important;
          border: 2px solid #e9ecef !important;
          color: #495057 !important;
          font-family: 'Inter', sans-serif !important;
          font-weight: 500 !important;
          border-radius: 8px !important;
          padding: 12px 24px !important;
          transition: all 0.2s ease !important;
          font-size: 0.95rem !important;
          min-width: 140px !important;
        }
        
        .professional-toggle-button:hover {
          background: #f8f9fa !important;
          border-color: #007bff !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 4px 12px rgba(0, 123, 255, 0.15) !important;
        }
        
        .professional-toggle-button.Mui-selected {
          background: #007bff !important;
          border-color: #007bff !important;
          color: #ffffff !important;
          box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3) !important;
        }
        
        .seat-grid-container {
          background: #ffffff;
          border-radius: 12px;
          padding: 32px;
          border: 1px solid #e9ecef;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          display: inline-block;
          margin: 0 auto;
        }
        
        .seat-grid {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        
        .seat-row {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        
        .row-label {
          color: #6c757d;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          width: 32px;
          text-align: center;
          font-size: 1rem;
        }
        
        .professional-seat {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          cursor: pointer;
          user-select: none;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          transition: all 0.2s ease;
          position: relative;
          border: 2px solid transparent;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .professional-seat:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
        }
        
        .professional-seat.available {
          background: #e9ecef;
          color: #495057;
        }
        
        .professional-seat.available:hover {
          background: #dee2e6;
          border-color: #007bff;
        }
        
        .professional-seat.vip {
          background: linear-gradient(135deg, #ffd700, #ffed4e);
          color: #1a202c;
          box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
        }
        
        .professional-seat.vip:hover {
          box-shadow: 0 6px 20px rgba(255, 215, 0, 0.4);
        }
        
        .professional-seat.reserved {
          background: linear-gradient(135deg, #dc3545, #e74c3c);
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
        }
        
        .professional-seat.reserved:hover {
          box-shadow: 0 6px 20px rgba(220, 53, 69, 0.4);
        }
        
        .professional-seat.selected {
          border-color: #007bff !important;
          box-shadow: 
            0 0 0 3px rgba(0, 123, 255, 0.2),
            0 6px 16px rgba(0, 123, 255, 0.3) !important;
          animation: selectedPulse 2s ease-in-out infinite;
        }
        
        @keyframes selectedPulse {
          0%, 100% { 
            box-shadow: 
              0 0 0 3px rgba(0, 123, 255, 0.2),
              0 6px 16px rgba(0, 123, 255, 0.3);
          }
          50% { 
            box-shadow: 
              0 0 0 6px rgba(0, 123, 255, 0.3),
              0 8px 20px rgba(0, 123, 255, 0.4);
          }
        }
        
        .legend-container {
          display: flex;
          justify-content: center;
          gap: 32px;
          margin-top: 24px;
          flex-wrap: wrap;
        }
        
        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #495057;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 0.9rem;
        }
        
        .legend-seat {
          width: 20px;
          height: 20px;
          border-radius: 4px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .professional-modal {
          background: #ffffff !important;
          border-radius: 16px !important;
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.15),
            0 8px 20px rgba(0, 0, 0, 0.1) !important;
          border: 1px solid rgba(0, 123, 255, 0.1) !important;
        }
        
        .professional-modal-title {
          font-family: 'Inter', sans-serif !important;
          font-weight: 600 !important;
          color: #1a202c !important;
          text-align: center !important;
          font-size: 1.5rem !important;
          padding: 24px 24px 16px 24px !important;
          border-bottom: 1px solid #e9ecef !important;
        }
        
        .professional-modal-content {
          padding: 24px !important;
        }
        
        .professional-textfield {
          margin-bottom: 20px !important;
        }
        
        .professional-textfield .MuiOutlinedInput-root {
          border-radius: 8px !important;
          font-family: 'Inter', sans-serif !important;
          background: #f8f9fa !important;
        }
        
        .professional-textfield .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
          border-color: #e9ecef !important;
          border-width: 2px !important;
        }
        
        .professional-textfield .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
          border-color: #007bff !important;
        }
        
        .professional-textfield .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
          border-color: #007bff !important;
          box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1) !important;
        }
        
        .professional-textfield .MuiInputLabel-root {
          font-family: 'Inter', sans-serif !important;
          font-weight: 500 !important;
          color: #495057 !important;
        }
        
        .professional-textfield .MuiInputLabel-root.Mui-focused {
          color: #007bff !important;
        }
        
        .professional-button {
          font-family: 'Inter', sans-serif !important;
          font-weight: 600 !important;
          border-radius: 8px !important;
          padding: 12px 24px !important;
          transition: all 0.2s ease !important;
          text-transform: none !important;
          font-size: 0.95rem !important;
        }
        
        .professional-button-secondary {
          background: #f8f9fa !important;
          border: 2px solid #e9ecef !important;
          color: #495057 !important;
        }
        
        .professional-button-secondary:hover {
          background: #e9ecef !important;
          border-color: #dee2e6 !important;
          transform: translateY(-1px) !important;
        }
        
        .professional-button-primary {
          background: linear-gradient(135deg, #007bff, #0056b3) !important;
          border: none !important;
          color: #ffffff !important;
          box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3) !important;
        }
        
        .professional-button-primary:hover {
          background: linear-gradient(135deg, #0056b3, #004085) !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 6px 16px rgba(0, 123, 255, 0.4) !important;
        }
        
        .professional-switch .MuiSwitch-switchBase.Mui-checked {
          color: #007bff !important;
        }
        
        .professional-switch .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track {
          background-color: rgba(0, 123, 255, 0.5) !important;
        }
        
        .error-text {
          color: #dc3545 !important;
          font-family: 'Inter', sans-serif !important;
          font-weight: 500 !important;
          margin-top: 8px !important;
        }
        
        .form-control-label {
          font-family: 'Inter', sans-serif !important;
          font-weight: 500 !important;
          color: #495057 !important;
        }
        
        @media (max-width: 768px) {
          .professional-title {
            font-size: 1.8rem;
          }
          
          .main-card {
            padding: 20px;
            margin: 10px;
          }
          
          .professional-toggle-group {
            flex-direction: column;
            align-items: center;
          }
          
          .professional-toggle-button {
            min-width: 200px !important;
          }
          
          .legend-container {
            flex-direction: column;
            align-items: center;
            gap: 16px;
          }
        }
      `}</style>

      <div className="professional-container">
        <div className="main-card">
          <Typography className="professional-title">
            Seating Management System
          </Typography>

          <div className="selection-mode-container">
            <Typography className="mode-label">Selection Mode</Typography>
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
              className="professional-toggle-group"
            >
              <ToggleButton value="single" className="professional-toggle-button">
                Single Seat
              </ToggleButton>
              <ToggleButton value="row" className="professional-toggle-button">
                Whole Row
              </ToggleButton>
              <ToggleButton value="col" className="professional-toggle-button">
                Whole Column
              </ToggleButton>
            </ToggleButtonGroup>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div className="seat-grid-container">
              <div className="seat-grid">
                {grid.map((rowSeats, rowIndex) => (
                  <div key={rowIndex} className="seat-row">
                    <div className="row-label">
                      {String.fromCharCode(65 + rowIndex)}
                    </div>
                    {rowSeats.map((seat, colIndex) =>
                      seat ? (
                        <div
                          key={seat.id}
                          onClick={() => handleSeatClick(seat)}
                          className={`professional-seat ${
                            seat.vip ? 'vip' : seat.reserved ? 'reserved' : 'available'
                          } ${
                            (selectionMode === "single" && selectedSeat?.id === seat.id) ||
                            (selectionMode === "row" && selectedRowOrCol === seat.row) ||
                            (selectionMode === "col" && selectedRowOrCol === seat.number)
                              ? 'selected' : ''
                          }`}
                          style={{
                            backgroundColor: seat.vip || seat.reserved ? undefined : seat.color || section.color || "#e9ecef",
                          }}
                          title={`Seat ${seat.code} - ${seat.reserved ? "Reserved" : "Available"}${
                            seat.vip ? " (VIP)" : ""
                          } - $${seat.price}`}
                        >
                          {seat.code}
                        </div>
                      ) : (
                        <div key={`empty-${colIndex}`} style={{ width: 48, height: 48 }} />
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="legend-container">
            <div className="legend-item">
              <div className="legend-seat" style={{ background: '#e9ecef' }}></div>
              <span>Available</span>
            </div>
            <div className="legend-item">
              <div className="legend-seat" style={{ background: 'linear-gradient(135deg, #ffd700, #ffed4e)' }}></div>
              <span>VIP</span>
            </div>
            <div className="legend-item">
              <div className="legend-seat" style={{ background: 'linear-gradient(135deg, #dc3545, #e74c3c)' }}></div>
              <span>Reserved</span>
            </div>
            <div className="legend-item">
              <div className="legend-seat" style={{ background: '#e9ecef', border: '2px solid #007bff' }}></div>
              <span>Selected</span>
            </div>
          </div>
        </div>
      </div>

      <Dialog 
        open={selectionMode === "single" ? !!selectedSeat : selectedRowOrCol != null} 
        onClose={handleClose}
        PaperProps={{
          className: "professional-modal"
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle className="professional-modal-title">
          {selectionMode === "single"
            ? `Edit Seat ${selectedSeat?.code}`
            : selectionMode === "row"
            ? `Edit Row ${String.fromCharCode(64 + selectedRowOrCol)}`
            : `Edit Column ${selectedRowOrCol}`}
        </DialogTitle>
        <DialogContent className="professional-modal-content">
          <TextField
            label="Price ($)"
            type="number"
            fullWidth
            value={tempPrice}
            onChange={(e) => setTempPrice(e.target.value)}
            className="professional-textfield"
            variant="outlined"
          />
          <FormControlLabel
            control={
              <Switch 
                checked={tempVIP} 
                onChange={(e) => setTempVIP(e.target.checked)}
                className="professional-switch"
              />
            }
            label="VIP Seat"
            className="form-control-label"
          />
          <TextField
            label="Seat Color"
            type="color"
            fullWidth
            value={tempColor}
            onChange={(e) => setTempColor(e.target.value)}
            className="professional-textfield"
            variant="outlined"
            sx={{ mt: 2 }}
          />
          {error && <Typography className="error-text">{error}</Typography>}
        </DialogContent>
        <DialogActions sx={{ padding: '16px 24px 24px 24px', gap: '12px' }}>
          <Button 
            onClick={handleClose} 
            className="professional-button professional-button-secondary"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            className="professional-button professional-button-primary"
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const AddSectionForm = ({ eventId }) => {
  const [sectionName, setSectionName] = useState("");
  const [sectionColor, setSectionColor] = useState("#e9ecef");
  const [sectionPrice, setSectionPrice] = useState("");
  const [numberOfRows, setNumberOfRows] = useState("");
  const [numberOfColumns, setNumberOfColumns] = useState("");
  const [sections, setSections] = useState([]);
  const [editingSection, setEditingSection] = useState(null);
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
    setSectionColor("#e9ecef");
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
            color: sectionColor,
          });
        }
      }

      await axios.post(`http://localhost:8081/api/seats/section/${sectionId}/generate`, seats);

      alert("Section and seats added successfully!");
      resetForm();
      await fetchSections();

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

      alert("Section updated successfully!");
      resetForm();
      await fetchSections();
    } catch (error) {
      console.error("Error updating section:", error);
      alert("Error updating data");
    }
  };

  return (
    <>
      <style jsx>{`
        .section-form-container {
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 
            0 4px 20px rgba(0, 0, 0, 0.08),
            0 1px 3px rgba(0, 0, 0, 0.05);
          padding: 32px;
          margin: 24px auto;
          max-width: 1200px;
          border: 1px solid rgba(0, 123, 255, 0.1);
        }
        
        .section-form-title {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 1.75rem;
          color: #1a202c;
          margin-bottom: 24px;
          position: relative;
        }
        
        .section-form-title::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 0;
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #007bff, #00c8c8);
          border-radius: 2px;
        }
        
        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }
        
        .color-input-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .color-input-label {
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          color: #495057;
          font-size: 0.95rem;
        }
        
        .professional-color-input {
          width: 100%;
          height: 56px;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          background: #f8f9fa;
        }
        
        .professional-color-input:hover {
          border-color: #007bff;
          box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
        }
        
        .section-list-container {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 24px;
          margin-top: 32px;
          border: 1px solid #e9ecef;
        }
        
        .section-list-title {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 1.5rem;
          color: #1a202c;
          margin-bottom: 20px;
        }
        
        .section-item {
          background: #ffffff;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 1px solid #e9ecef;
          transition: all 0.2s ease;
        }
        
        .section-item:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border-color: #007bff;
        }
        
        .section-info {
          flex: 1;
        }
        
        .section-name {
          font-weight: 600;
          font-size: 1.1rem;
          color: #1a202c;
          margin-bottom: 4px;
        }
        
        .section-details {
          font-size: 0.9rem;
          color: #6c757d;
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        
        .section-actions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        
        .action-button {
          font-family: 'Inter', sans-serif !important;
          font-weight: 500 !important;
          font-size: 0.85rem !important;
          padding: 8px 16px !important;
          border-radius: 6px !important;
          transition: all 0.2s ease !important;
          text-transform: none !important;
          min-width: auto !important;
        }
        
        .action-button-view {
          background: #e3f2fd !important;
          color: #1976d2 !important;
          border: 1px solid #bbdefb !important;
        }
        
        .action-button-view:hover {
          background: #bbdefb !important;
          transform: translateY(-1px) !important;
        }
        
        .action-button-edit {
          background: #fff3e0 !important;
          color: #f57c00 !important;
          border: 1px solid #ffcc02 !important;
        }
        
        .action-button-edit:hover {
          background: #ffcc02 !important;
          transform: translateY(-1px) !important;
        }
        
        .action-button-delete {
          background: #ffebee !important;
          color: #d32f2f !important;
          border: 1px solid #ffcdd2 !important;
        }
        
        .action-button-delete:hover {
          background: #ffcdd2 !important;
          transform: translateY(-1px) !important;
        }
        
        @media (max-width: 768px) {
          .section-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
          
          .section-actions {
            width: 100%;
            justify-content: flex-end;
          }
          
          .form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="section-form-container">
        <Typography className="section-form-title">
          {editingSection ? "Edit Section" : "Add New Section"}
        </Typography>
        
        <div className="form-grid">
          <TextField
            label="Section Name"
            fullWidth
            value={sectionName}
            onChange={(e) => setSectionName(e.target.value)}
            className="professional-textfield"
            variant="outlined"
          />
          
          <div className="color-input-container">
            <label className="color-input-label">Section Color</label>
            <input
              type="color"
              value={sectionColor}
              onChange={(e) => setSectionColor(e.target.value)}
              className="professional-color-input"
            />
          </div>
          
          <TextField
            label="Price ($)"
            type="number"
            fullWidth
            value={sectionPrice}
            onChange={(e) => setSectionPrice(e.target.value)}
            className="professional-textfield"
            variant="outlined"
          />
          
          {!editingSection && (
            <>
              <TextField
                label="Number of Rows"
                type="number"
                fullWidth
                value={numberOfRows}
                onChange={(e) => setNumberOfRows(e.target.value)}
                className="professional-textfield"
                variant="outlined"
              />
              <TextField
                label="Number of Columns"
                type="number"
                fullWidth
                value={numberOfColumns}
                onChange={(e) => setNumberOfColumns(e.target.value)}
                className="professional-textfield"
                variant="outlined"
              />
            </>
          )}
        </div>
        
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Button 
            onClick={editingSection ? handleUpdateSection : handleAddSection}
            className="professional-button professional-button-primary"
          >
            {editingSection ? "Update Section" : "Add Section + Seats"}
          </Button>
          {editingSection && (
            <Button 
              onClick={resetForm} 
              className="professional-button professional-button-secondary"
            >
              Cancel
            </Button>
          )}
        </div>

        <div className="section-list-container">
          <Typography className="section-list-title">
            Existing Sections
          </Typography>
          
          {sections.map((sec) => (
            <div key={sec.id} className="section-item">
              <div className="section-info">
                <div className="section-name">{sec.name}</div>
                <div className="section-details">
                  <span>{sec.totalSeats} seats</span>
                  <span>${sec.price}</span>
                  <span style={{ 
                    display: 'inline-block', 
                    width: '16px', 
                    height: '16px', 
                    backgroundColor: sec.color, 
                    borderRadius: '3px',
                    border: '1px solid #dee2e6'
                  }}></span>
                </div>
              </div>
              <div className="section-actions">
                <Button
                  onClick={() => {
                    setSelectedSection(sec);
                    setSelectedSectionId(sec.id);
                  }}
                  className="action-button action-button-view"
                >
                  View
                </Button>
                <Button
                  onClick={() => handleEditClick(sec)}
                  className="action-button action-button-edit"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteSection(sec.id)}
                  className="action-button action-button-delete"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedSection && (
        <div style={{ marginTop: '24px' }}>
          <SeatGrid section={selectedSection} />
        </div>
      )}
    </>
  );
};

export default AddSectionForm;

