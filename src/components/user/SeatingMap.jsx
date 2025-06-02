import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Chip, Stack, TextField } from "@mui/material";
import axios from "axios";
import OrderTimer from "./OrderTimer";
import PriceLegend from "./PriceLegend";

const SeatingMap = ({ eventId }) => {
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [confirmed, setConfirmed] = useState(false);
  const [confirmedSeats, setConfirmedSeats] = useState([]);
  const [paymentStarted, setPaymentStarted] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/sections/event/${eventId}`)
      .then((res) => setSections(res.data))
      .catch((err) => console.error("Error fetching sections:", err));
  }, [eventId]);

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
      const seatIds = selectedSeats.map((seat) => seat.id);
      await axios.post("http://localhost:8081/api/seats/confirm", seatIds);
      setConfirmedSeats(selectedSeats);
      setConfirmed(true);
    } catch (error) {
      console.error("Error confirming seats", error);
      alert("Something went wrong.");
    }
  };

  const groupSeatsByRow = (seats) => {
    const grouped = {};
    seats.forEach((seat) => {
      if (!seat.code || typeof seat.code !== "string") return;
      const row = seat.code.charAt(0);
      if (!grouped[row]) grouped[row] = [];
      grouped[row].push(seat);
    });
    Object.keys(grouped).forEach((row) => {
      grouped[row].sort((a, b) => parseInt(a.code.slice(1)) - parseInt(b.code.slice(1)));
    });
    return grouped;
  };

  const toggleSeatSelection = (seat) => {
    if (seat.reserved) return;
    const isAlreadySelected = selectedSeats.some((s) => s.id === seat.id);
    setSelectedSeats((prev) =>
      isAlreadySelected ? prev.filter((s) => s.id !== seat.id) : [...prev, seat]
    );
  };

    return (
    <Box sx={{ textAlign: "center", p: 2 }}>
      {!confirmed ? (
        <>
          <Typography variant="h6">Pick a section:</Typography>
          <Typography variant="h5" sx={{ my: 2 }}>
            STAGE
          </Typography>

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
                type="button"
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

          {/* هنا نضيف PriceLegend */}
          <PriceLegend />

          {selectedSection && (
            <>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Seats in {selectedSection.name}
              </Typography>

              {/* هنا بقية الكود يعرض المقاعد */}
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

              {/* بقية كود اختيار المقاعد وتأكيدها */}
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
        </>
      ) : (
        // الجزء بعد التأكيد
        <>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Order #25000855988
          </Typography>
          <OrderTimer orderNumber="25000855988" onCancel={() => window.location.reload()} />

          {selectedSeats.map((seat, index) => (
            <Box
              key={seat.id}
              sx={{
                background: "#f5f5f5",
                p: 2,
                mb: 2,
                borderRadius: 2,
                textAlign: "left",
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                Ticket #{index + 1}
              </Typography>
              <Typography sx={{ mb: 1 }}>
                Section {selectedSection.name} - {seat.code}
              </Typography>
              <Typography sx={{ mb: 1 }}>$ {selectedSection.price}</Typography>
              <TextField fullWidth label="Email" defaultValue="example@gmail.com" sx={{ mb: 1 }} />
              <TextField fullWidth label="First Name" defaultValue="Nadim" sx={{ mb: 1 }} />
              <TextField fullWidth label="Last Name" defaultValue="Sleiman" />
            </Box>
          ))}

          <Button
            variant="contained"
            color="error"
            sx={{ mt: 2 }}
            onClick={() => setPaymentStarted(true)}
          >
            Continue to Payment
          </Button>
        </>
      )}
    </Box>
  );
};

export default SeatingMap;