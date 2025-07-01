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
import PriceLegend from "./PriceLegend"; // Assuming this component will be styled separately to match
import TicketCheckout from "./TicketCheckout"; // Assuming this component will be styled separately to match
import { styled } from "@mui/material/styles";

// Styled Button for consistency with Header/HeroSection
const GradientButton = styled(Button)(({ theme, disabled }) => ({
  background: disabled
    ? 'linear-gradient(45deg, #444444, #555555)'
    : 'linear-gradient(45deg, #D81B60, #E91E63)', // Vibrant pink gradient
  border: 0,
  borderRadius: 30, // More rounded
  color: disabled ? '#999999' : 'white',
  height: 50, // Slightly taller
  padding: '0 30px', // More padding
  textTransform: 'uppercase', // Uppercase text
  fontWeight: 'bold',
  fontSize: '1rem', // Slightly larger font
  transition: 'all 0.3s ease',
  boxShadow: disabled ? 'none' : '0 8px 20px rgba(0, 0, 0, 0.5)', // Stronger shadow
  '&:hover': {
    background: disabled
      ? 'linear-gradient(45deg, #444444, #555555)'
      : 'linear-gradient(45deg, #C2185B, #D81B60)', // Darker pink on hover
    transform: disabled ? 'none' : 'translateY(-3px)', // More lift on hover
    boxShadow: disabled ? 'none' : '0 12px 25px rgba(0, 0, 0, 0.6)', // More intense shadow on hover
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
    <Box
      sx={{
        textAlign: "center",
        p: { xs: 2, md: 4 }, // Responsive padding
        background: '#200245', // Main container background (dark purple)
        color: 'white',
        borderRadius: '16px', // Rounded corners for the entire map section
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.6)', // Strong shadow
        border: '1px solid rgba(255, 255, 255, 0.1)', // Subtle border
        mt: 4, // Margin top to separate from previous sections
        mb: 4, // Margin bottom
        maxWidth: 1200, // Max width for the map section
        mx: 'auto', // Center the map section
      }}
    >
      {!confirmed ? (
        <>
          <Typography variant="h5" fontWeight="bold" sx={{ color: '#E0E0E0', mb: 2 }}>
            Pick a Section
          </Typography>
          <Typography variant="h4" fontWeight="bold" sx={{ my: 2, color: '#E91E63' }}>
            STAGE
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 2,
              mb: 4, // Increased margin bottom
            }}
          >
            {sections.map((sec) => (
              <Button
                key={sec.id}
                onClick={() => handleSectionSelect(sec)}
                sx={{
                  width: 120, // Wider buttons
                  height: 60, // Taller buttons
                  background: selectedSection?.id === sec.id
                    ? 'linear-gradient(45deg, #E91E63, #D81B60)' // Selected state gradient
                    : 'linear-gradient(135deg, #3A0060 0%, #4A148C 100%)', // Darker purple gradient
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: '12px', // More rounded
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)', // Shadow for buttons
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #4A148C 0%, #3A0060 100%)', // Reverse gradient on hover
                    transform: 'translateY(-2px)', // Lift effect
                    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.5)',
                  },
                }}
              >
                {sec.name}
              </Button>
            ))}
          </Box>

          {selectedSection && (
            <>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, color: '#E0E0E0' }}>
                Seats in {selectedSection.name}
              </Typography>

              <Typography sx={{ mt: 1, mb: 3, color: 'rgba(255, 255, 255, 0.8)' }}>
                Selected {selectedSeats.length} of {requestedSeats} seat
                {requestedSeats > 1 ? "s" : ""}
              </Typography>

              {/* Seat Map Grid */}
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1, // Gap between rows
                p: 2,
                backgroundColor: 'rgba(0, 0, 0, 0.2)', // Subtle background for the seat map area
                borderRadius: '12px',
                boxShadow: 'inset 0px 0px 10px rgba(0, 0, 0, 0.3)', // Inner shadow
              }}>
                {Object.entries(groupSeatsByRow(seats)).map(([row, seatsInRow]) => (
                  <Box
                    key={row}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 0.5, // Smaller margin between rows
                    }}
                  >
                    <Typography variant="body2" sx={{ width: 25, color: 'rgba(255, 255, 255, 0.7)', fontWeight: 'bold' }}>
                      {row}
                    </Typography>
                    {seatsInRow.map((seat) => {
                      const isSelected = selectedSeats.some((s) => s.id === seat.id);
                      return (
                        <Box
                          key={seat.id}
                          onClick={() => toggleSeatSelection(seat)}
                          sx={{
                            width: 35, // Larger seats
                            height: 35, // Larger seats
                            lineHeight: "35px",
                            textAlign: "center",
                            borderRadius: "5px", // Slightly more rounded seats
                            backgroundColor: seat.reserved
                              ? "#444" // Darker grey for reserved
                              : seat.locked
                              ? "#666" // Medium grey for locked
                              : isSelected
                              ? "#E91E63" // Vibrant pink for selected
                              : seat.color || selectedSection.color || "#6A1B9A", // Default to a thematic purple
                            color: "white",
                            cursor:
                              seat.reserved || seat.locked ? "not-allowed" : "pointer",
                            fontSize: "13px", // Slightly larger font for seat numbers
                            fontWeight: 'bold',
                            mx: "3px", // More spacing between seats
                            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)', // Shadow for seats
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                              transform: seat.reserved || seat.locked ? 'none' : 'scale(1.05)', // Slight scale on hover
                              boxShadow: seat.reserved || seat.locked ? 'none' : '0px 4px 8px rgba(0, 0, 0, 0.4)',
                            }
                          }}
                        >
                          {seat.code}

                        </Box>
                      );
                    })}
                    <Typography variant="body2" sx={{ width: 25, ml: 1, color: 'rgba(255, 255, 255, 0.7)', fontWeight: 'bold' }}>
                      {row}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <PriceLegend pairs={colorPricePairs} /> {/* Assuming PriceLegend is styled externally */}

              {selectedSeats.length > 0 && (
                <>
                  <Typography variant="h5" fontWeight="bold" sx={{ mt: 4, color: '#E0E0E0' }}>
                    Selected Seats
                  </Typography>
                  <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" sx={{ mt: 2, mb: 3 }}>
                    {selectedSeats.map((seat) => (
                      <Chip
                        key={seat.id}
                        label={`${seat.code} ($${seat.price})`}
                        sx={{
                          background: 'linear-gradient(45deg, #D81B60, #E91E63)', // Vibrant pink gradient
                          color: 'white',
                          fontWeight: 'bold',
                          borderRadius: '15px', // More rounded chip
                          px: 1.5, // Padding inside chip
                          py: 0.5,
                          boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)',
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
                background: 'linear-gradient(135deg, #2C0050 0%, #4A0070 100%)', // Dark purple gradient for ticket box
                p: 3, // More padding
                mb: 3, // More margin bottom
                borderRadius: '12px', // Rounded corners
                textAlign: "left",
                color: 'white',
                boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.4)', // Shadow for ticket box
              }}
            >
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 1.5, color: '#E91E63' }}>
                Ticket #{index + 1}
              </Typography>
              <Typography variant="body1" sx={{ mb: 0.5, color: '#E0E0E0' }}>
                Section {selectedSection.name} - Seat {seat.code}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, color: '#B0B0B0' }}>Price: ${seat.price}</Typography>
              <TextField
                fullWidth
                label="Email"
                defaultValue="example@gmail.com"
                name={`email-${index}`}
                variant="outlined" // Ensure outlined variant for consistent styling
                sx={{ mb: 2,
                  '& .MuiInputBase-input': { color: 'white' },
                  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#E91E63' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#E91E63' },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px', // Rounded input fields
                    backgroundColor: 'rgba(0,0,0,0.1)', // Subtle background for input
                  }
                }}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label="First Name"
                defaultValue="Nadim"
                name={`firstName-${index}`}
                variant="outlined"
                sx={{ mb: 2,
                  '& .MuiInputBase-input': { color: 'white' },
                  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#E91E63' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#E91E63' },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: 'rgba(0,0,0,0.1)',
                  }
                }}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label="Last Name"
                defaultValue="Sleiman"
                name={`lastName-${index}`}
                variant="outlined"
                sx={{
                  '& .MuiInputBase-input': { color: 'white' },
                  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#E91E63' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#E91E63' },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: 'rgba(0,0,0,0.1)',
                  }
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          ))}

          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <GradientButton
              sx={{ mr: 2 }} // Margin right for spacing
              onClick={handleGoToCheckout}
            >
              Go to Checkout
            </GradientButton>

          </Box>
        </>
      )}
    </Box>
  );
};

export default SeatingMap;
