// SeatingMap.jsx
import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Chip, Stack } from "@mui/material";
import axios from "axios";

const SeatingMap = ({ eventId }) => {
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  // جلب الأقسام حسب الفعالية
  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/sections/event/${eventId}`)
      .then((res) => setSections(res.data))
      .catch((err) => console.error("Error fetching sections:", err));
  }, [eventId]);

  // ✅ تصحيح التعريف
  const handleSectionSelect = (section) => {
    setSelectedSection(section);
    setSelectedSeats([]);
    axios
      .get(`http://localhost:8081/api/seats/section/${section.id}`)
      .then((res) => setSeats(res.data))
      .catch((err) => console.error("Error fetching seats:", err));
  };

  const handleConfirmSeats = async () => {
  try {
    const seatIds = selectedSeats.map(seat => seat.id);
    await axios.post('http://localhost:8081/api/seats/confirm', seatIds);
    alert("Booking confirmed!");
    // يمكنك تحديث الحالة أو إعادة تحميل المقاعد من الـ backend
    handleSectionSelect(selectedSection); // لإعادة تحميل المقاعد
  } catch (error) {
    console.error("Error confirming seats", error);
    alert("Something went wrong.");
  }
};


  // ✅ ترتيب المقاعد حسب الصف
  const groupSeatsByRow = (seats) => {
    const grouped = {};
    seats.forEach((seat) => {
      if (!seat.code || typeof seat.code !== "string") return; // 🔒 حماية

      const row = seat.code.charAt(0);
      if (!grouped[row]) {
        grouped[row] = [];
      }
      grouped[row].push(seat);
    });

    Object.keys(grouped).forEach((row) => {
      grouped[row].sort((a, b) => {
        const numA = parseInt(a.code.slice(1));
        const numB = parseInt(b.code.slice(1));
        return numA - numB;
      });
    });

    return grouped;
  };

  const toggleSeatSelection = (seat) => {
    if (seat.reserved) return;

    const isAlreadySelected = selectedSeats.some((s) => s.id === seat.id);
    if (isAlreadySelected) {
      setSelectedSeats((prev) => prev.filter((s) => s.id !== seat.id));
    } else {
      setSelectedSeats((prev) => [...prev, seat]);
    }
  };

  return (
    <Box sx={{ textAlign: "center", p: 2 }}>
      <Typography variant="h6">Pick a section:</Typography>
      <Typography variant="h5" sx={{ my: 2 }}>
        STAGE
      </Typography>

      {/* الأقسام */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
          mb: 3,
        }}
      >
        {sections.map((sec) => (
          <Button
            key={sec.id}
            type="button" // 👈 هذا هو المهم
            onClick={() => handleSectionSelect(sec)}
            sx={{
              width: 100,
              height: 50,
              backgroundColor: sec.color || "#90CAF9",
              color: "white",
              fontWeight: "bold",
              borderRadius: 2,
              "&:hover": { opacity: 0.8 },
            }}
          >
            {sec.name}
          </Button>
        ))}
      </Box>

      {/* المقاعد */}
      {selectedSection && (
        <>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Seats in {selectedSection.name}
          </Typography>

          {Object.entries(groupSeatsByRow(seats)).map(([row, seatsInRow]) => (
            <Box
              key={row}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
              }}
            >
              <Typography variant="body2" sx={{ width: 20 }}>
                {row}
              </Typography>
              {seatsInRow.map((seat) => {
                const isSelected = selectedSeats.some((s) => s.id === seat.id);
                return (
                  <Box
                    key={seat.id}
                    onClick={() => toggleSeatSelection(seat)}
                    sx={{
                      width: 30,
                      height: 30,
                      lineHeight: "30px",
                      textAlign: "center",
                      borderRadius: "3px",
                      backgroundColor: seat.reserved
                        ? "#999"
                        : isSelected
                        ? "#4caf50"
                        : selectedSection.color || "#FFA500",
                      color: "white",
                      cursor: seat.reserved ? "not-allowed" : "pointer",
                      fontSize: "12px",
                      mx: "2px",
                    }}
                  >
                    {seat.code.slice(1)}
                  </Box>
                );
              })}
              <Typography variant="body2" sx={{ width: 20, ml: 1 }}>
                {row}
              </Typography>
            </Box>
          ))}

          {/* المقاعد المختارة */}
          {selectedSeats.length > 0 && (
            <>
              <Typography variant="h6" sx={{ mt: 3 }}>
                Selected Seats
              </Typography>
              <Stack spacing={1} alignItems="center" sx={{ mt: 1 }}>
                {selectedSeats.map((seat) => (
                  <Chip key={seat.id} label={seat.code} color="success" />
                ))}
              </Stack>
              <Button
  variant="contained"
  color="primary"
  sx={{ mt: 3 }}
  onClick={handleConfirmSeats}
>
  Continue
</Button>

            </>
          )}
        </>
      )}
    </Box>
  );
};

export default SeatingMap;
