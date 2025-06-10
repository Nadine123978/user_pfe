import React, { useState, useEffect } from "react";
import axios from "axios";

const SeatGrid = ({ section }) => {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    if (section?.id) {
      axios.get(`http://localhost:8081/api/seats/section/${section.id}`)
        .then(res => setSeats(res.data))
        .catch(err => console.error(err));
    }
  }, [section]);

  // حساب أكبر رقم "number" ليحدد عدد الأعمدة
  const maxColumns = seats.length > 0 ? Math.max(...seats.map(seat => seat.number)) : 1;

  const toggleReserved = async (seatId, currentReserved) => {
    try {
      await axios.put(`http://localhost:8081/api/seats/${seatId}`, { reserved: !currentReserved });
      setSeats(seats.map(s => s.id === seatId ? {...s, reserved: !currentReserved} : s));
    } catch(e) {
      console.error(e);
    }
  };

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${maxColumns}, 40px)`,
      gap: "5px"
    }}>
      {seats.map(seat => (
        <div
          key={seat.id}
          onClick={() => toggleReserved(seat.id, seat.reserved)}
          style={{
            width: 40,
            height: 40,
            backgroundColor: seat.reserved ? "red" : seat.color || section.color,
            cursor: "pointer",
            borderRadius: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: "bold",
            userSelect: "none"
          }}
          title={`Seat ${seat.code} - ${seat.reserved ? "Reserved" : "Available"}`}
        >
          {seat.code}
        </div>
      ))}
    </div>
  );
};

export default SeatGrid;
