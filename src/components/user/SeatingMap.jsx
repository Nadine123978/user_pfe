import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Chip,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import OrderTimer from "./OrderTimer";
import PriceLegend from "./PriceLegend";
import TicketCheckout from "./TicketCheckout";
import { styled } from "@mui/material/styles"; // Import styled

// Styled Button for consistency with Header/HeroSection
const GradientButton = styled(Button)(({ theme, disabled }) => ({
  background: disabled
    ? 'linear-gradient(45deg, #444444, #555555)'
    : 'linear-gradient(45deg, #D81B60, #E91E63)',
  border: 0,
  borderRadius: 25,
  color: disabled ? '#999999' : 'white',
  height: 48,
  padding: '0 24px',
  textTransform: 'none',
  fontWeight: 'bold',
  fontSize: '14px',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: disabled
      ? 'linear-gradient(45deg, #444444, #555555)'
      : 'linear-gradient(45deg, #C2185B, #D81B60)',
    transform: disabled ? 'none' : 'translateY(-2px)',
    boxShadow: disabled ? 'none' : '0 8px 25px rgba(233, 30, 99, 0.3)',
  },
}));

const SeatingMap = ({ eventId, requestedSeats = 1 }) => {
  const navigate = useNavigate();
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [confirmed, setConfirmed] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [colorPricePairs, setColorPricePairs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [bookingResponse, setBookingResponse] = React.useState(null);

  useEffect(() => {
    if (!eventId) return;
    axios
      .get(`http://localhost:8081/api/sections/event/${eventId}` )
      .then((res) => setSections(res.data))
      .catch((err) => console.error("Error fetching sections:", err));
  }, [eventId]);

  const handleSectionSelect = (section) => {
    setSelectedSection(section);
    setSelectedSeats([]);
    axios
      .get(`http://localhost:8081/api/seats/section/${section.id}` )
      .then((res) => {
        setSeats(res.data);
        const uniquePairs = Array.from(
          new Set(res.data.map((seat) => `${seat.color}-${seat.price}`))
        ).map((pair) => {
          const [color, price] = pair.split("-");
          return { color, price };
        });
        setColorPricePairs(uniquePairs);
      })
      .catch((err) => console.error("Error fetching seats:", err));
  };

  const toggleSeatSelection = (seat) => {
    if (seat.reserved || seat.locked) return;

    const exists = selectedSeats.find((s) => s.id === seat.id);
    if (!exists && selectedSeats.length >= requestedSeats) {
      alert(`You can only select ${requestedSeats} seat${requestedSeats > 1 ? "s" : ""}.`);
      return;
    }

    const newSelectedSeats = exists
      ? selectedSeats.filter((s) => s.id !== seat.id)
      : [...selectedSeats, seat];

    setSelectedSeats(newSelectedSeats);
  };

  async function createBooking(data, token) {
    return axios.post("http://localhost:8081/api/bookings/create", data, {
      headers: { Authorization: `Bearer ${token}` },
    } );
  }

  const handleConfirmSeats = async () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat");
      return;
    }

    if (selectedSeats.length !== requestedSeats) {
      alert(`Please select exactly ${requestedSeats} seat${requestedSeats > 1 ? "s" : ""}.`);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in.");
      return;
    }

    if (!eventId) {
      alert("Event ID not found.");
      return;
    }

    setLoading(true);

    try {
      const seatIds = selectedSeats.map((seat) => seat.id);

      const bookingResponse = await createBooking({
        eventId,
        seatIds,
        payNow: false,
      }, token);

      setBookingId(bookingResponse.data.bookingId);
      setConfirmed(true);
      setBookingResponse(bookingResponse.data);

      alert("Booking created successfully!");
    } catch (error) {
      console.error("Error during booking creation", error);

      if (
        error.response &&
        error.response.status === 409 &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(`Conflict: ${error.response.data.message}`);
      } else {
        alert("Failed to create booking, please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // دالة إلغاء الحجز وفك قفل المقاعد
  const handleCancelBooking = async () => {
    if (!bookingId) return;

    try {
      setLoading(true);
      const seatIds = selectedSeats.map((seat) => seat.id);
      // استدعاء endpoint لفك قفل المقاعد
      await axios.post("http://localhost:8081/api/seats/unlock", seatIds );
      // إعادة تعيين الحالة
      setBookingId(null);
      setConfirmed(false);
      setSelectedSeats([]);
      setSelectedSection(null);
      setSeats([]);
    } catch (error) {
      console.error("Error cancelling booking", error);
      alert("Failed to cancel booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoToCheckout = async () => {
    const ticketElements = document.querySelectorAll('[data-ticket]');
    const tickets = [];

    ticketElements.forEach((el, index) => {
      const email = el.querySelector(`input[name='email-${index}']`)?.value || "";
      const firstName = el.querySelector(`input[name='firstName-${index}']`)?.value || "";
      const lastName = el.querySelector(`input[name='lastName-${index}']`)?.value || "";

      tickets.push({
        seatId: selectedSeats[index].id,
        email,
        firstName,
        lastName,
      });
    });

    try {
      await axios.post("http://localhost:8081/api/emails/save-emails", {
        bookingId,
        tickets,
      } );

      navigate("/checkout", { state: { bookingId } });
    } catch (err) {
      console.error(err);
      alert("Failed to process emails!");
    }
  };

  const groupSeatsByRow = (seats) => {
    const grouped = {};
    seats.forEach((seat) => {
      if (!seat.code) return;
      const row = seat.code.charAt(0);
      if (!grouped[row]) grouped[row] = [];
      grouped[row].push(seat);
    });
    Object.keys(grouped).forEach((row) => {
      grouped[row].sort(
        (a, b) => parseInt(a.code.slice(1)) - parseInt(b.code.slice(1))
      );
    });
    return grouped;
  };

  if (showCheckout) {
    return (
      <TicketCheckout
        tickets={selectedSeats}
        section={selectedSection}
        onBack={() => setShowCheckout(false)}
      />
    );
  }

  return (
    <Box sx={{ textAlign: "center", p: 2, background: '#200245', color: 'white' }}> {/* Main container background */}
      {!confirmed ? (
        <>
          <Typography variant="h6" sx={{ color: 'white' }}>Pick a section:</Typography>
          <Typography variant="h5" sx={{ my: 2, color: '#E91E63' }}> {/* Accent color for STAGE */}
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
                onClick={() => handleSectionSelect(sec)}
                sx={{
                  width: 100,
                  height: 50,
                  // Background matching Header's menu background
                  background: 'linear-gradient(135deg, #2C3E50 0%, #4A148C 100%)',
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: 2,
                  "&:hover": { 
                    opacity: 0.8,
                    background: 'linear-gradient(135deg, #4A148C 0%, #2C3E50 100%)', // Reverse gradient on hover
                  },
                }}
              >
                {sec.name}
              </Button>
            ))}
          </Box>

          {selectedSection && (
            <>
              <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
                Seats in {selectedSection.name}
              </Typography>

              <Typography sx={{ mt: 1, mb: 2, color: 'rgba(255, 255, 255, 0.8)' }}>
                Selected {selectedSeats.length} of {requestedSeats} seat
                {requestedSeats > 1 ? "s" : ""}
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
                  <Typography variant="body2" sx={{ width: 20, color: 'rgba(255, 255, 255, 0.7)' }}>
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
                            ? "#555" // Darker grey for reserved
                            : seat.locked
                            ? "#777" // Medium grey for locked
                            : isSelected
                            ? "#E91E63" // Vibrant pink for selected
                            : seat.color || selectedSection.color || "#4A148C", // Default to a purple from your theme
                          color: "white",
                          cursor:
                            seat.reserved || seat.locked ? "not-allowed" : "pointer",
                          fontSize: "12px",
                          mx: "2px",
                        }}
                      >
                        {seat.code.slice(1)}
                      </Box>
                    );
                  })}
                  <Typography variant="body2" sx={{ width: 20, ml: 1, color: 'rgba(255, 255, 255, 0.7)' }}>
                    {row}
                  </Typography>
                </Box>
              ))}

              <PriceLegend pairs={colorPricePairs} />

              {selectedSeats.length > 0 && (
                <>
                  <Typography variant="h6" sx={{ mt: 3, color: 'white' }}>
                    Selected Seats
                  </Typography>
                  <Stack spacing={1} alignItems="center" sx={{ mt: 1 }}>
                    {selectedSeats.map((seat) => (
                      <Chip 
                        key={seat.id} 
                        label={seat.code} 
                        sx={{ 
                          background: 'linear-gradient(45deg, #D81B60, #E91E63)', // Vibrant pink gradient
                          color: 'white',
                          fontWeight: 'bold',
                        }} 
                      />
                    ))}
                  </Stack>

                  <GradientButton
                    sx={{ mt: 3 }}
                    onClick={handleConfirmSeats}
                    disabled={loading}
                    type="button"
                  >
                    {loading ? "Processing..." : "Continue"}
                  </GradientButton>
                </>
              )}
            </>
          )}
        </>
      ) : (
        <>
          <OrderTimer
            orderNumber={bookingId}
            onCancel={() => window.location.reload()}
          />

          {selectedSeats.map((seat, index) => (
            <Box
              key={seat.id}
              data-ticket
              sx={{
                background: 'linear-gradient(135deg, #2C3E50 0%, #4A148C 100%)', // Dark blue-grey to purple gradient
                p: 2,
                mb: 2,
                borderRadius: 2,
                textAlign: "left",
                color: 'white', // Text color for this box
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1, color: '#E91E63' }}> {/* Accent color */}
                Ticket #{index + 1}
              </Typography>
              <Typography sx={{ mb: 1 }}>
                Section {selectedSection.name} - {seat.code}
              </Typography>
              <Typography sx={{ mb: 1 }}>${seat.price}</Typography>
              <TextField
                fullWidth
                label="Email"
                defaultValue="example@gmail.com"
                name={`email-${index}`}
                sx={{ mb: 1, 
                  '& .MuiInputBase-input': { color: 'white' }, // Input text color
                  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' }, // Label color
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' }, // Border color
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#E91E63' }, // Hover border color
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#E91E63' }, // Focused border color
                }}
                InputLabelProps={{ shrink: true }} // Keep label visible
              />
              <TextField
                fullWidth
                label="First Name"
                defaultValue="Nadim"
                name={`firstName-${index}`}
                sx={{ mb: 1, 
                  '& .MuiInputBase-input': { color: 'white' },
                  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#E91E63' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#E91E63' },
                }}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label="Last Name"
                defaultValue="Sleiman"
                name={`lastName-${index}`}
                sx={{ 
                  '& .MuiInputBase-input': { color: 'white' },
                  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#E91E63' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#E91E63' },
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          ))}

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <GradientButton
              sx={{ mt: 2 }}
              onClick={handleGoToCheckout}
            >
              Go to Checkout
            </GradientButton>

            <Button
              variant="outlined"
              sx={{ 
                mt: 2, ml: 2, 
                borderColor: 'rgba(255, 255, 255, 0.5)',
                color: 'white',
                borderRadius: 25,
                px: 4,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  borderColor: '#E91E63',
                  backgroundColor: 'rgba(233, 30, 99, 0.1)',
                },
              }}
              onClick={handleCancelBooking}
              disabled={loading}
            >
              Cancel Booking
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default SeatingMap;
