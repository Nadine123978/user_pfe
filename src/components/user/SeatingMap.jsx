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
      .get(`http://localhost:8081/api/sections/event/${eventId}`)
      .then((res) => setSections(res.data))
      .catch((err) => console.error("Error fetching sections:", err));
  }, [eventId]);

  const handleSectionSelect = (section) => {
    setSelectedSection(section);
    setSelectedSeats([]);
    axios
      .get(`http://localhost:8081/api/seats/section/${section.id}`)
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
  });
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

    // فقط إنشاء الحجز المؤقت
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
      await axios.post("http://localhost:8081/api/seats/unlock", seatIds);
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
    });

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

          {selectedSection && (
            <>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Seats in {selectedSection.name}
              </Typography>

              <Typography sx={{ mt: 1, mb: 2 }}>
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
                            : seat.locked
                            ? "#B0BEC5"
                            : isSelected
                            ? "#4caf50"
                            : seat.color || selectedSection.color || "#FFA500",
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
                  <Typography variant="body2" sx={{ width: 20, ml: 1 }}>
                    {row}
                  </Typography>
                </Box>
              ))}

              <PriceLegend pairs={colorPricePairs} />

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
                    disabled={loading}
                    type="button"
                  >
                    {loading ? "Processing..." : "Continue"}
                  </Button>
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
    <Typography sx={{ mb: 1 }}>${seat.price}</Typography>
    <TextField
      fullWidth
      label="Email"
      defaultValue="example@gmail.com"
      name={`email-${index}`}    // مهم تحط الاسم الفريد
      sx={{ mb: 1 }}
    />
    <TextField
      fullWidth
      label="First Name"
      defaultValue="Nadim"
      name={`firstName-${index}`}  // مهم تحط الاسم الفريد
      sx={{ mb: 1 }}
    />
    <TextField
      fullWidth
      label="Last Name"
      defaultValue="Sleiman"
      name={`lastName-${index}`}   // مهم تحط الاسم الفريد
    />
  </Box>
))}

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="error"
              sx={{ mt: 2 }}
              onClick={handleGoToCheckout}

            >
              Go to Checkout
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              sx={{ mt: 2, ml: 2 }}
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
