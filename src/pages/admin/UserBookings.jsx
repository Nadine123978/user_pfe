import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Alert, CircularProgress, Table, TableRow, TableHead, TableBody, TableCell } from "@mui/material";

const UserBookings = () => {
  const { userId } = useParams();
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8081/api/bookings/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(response.data);
      } catch (err) {
        setError("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId]);

  if (loading) return <CircularProgress sx={{ m: 4 }} />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>#</TableCell>
          <TableCell>Booking ID</TableCell>
          <TableCell>Event Name</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Booking Date</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {bookings.map((b, i) => (
          <TableRow key={b.id}>
            <TableCell>{i + 1}</TableCell>
            <TableCell>{b.id}</TableCell>
            <TableCell>{b.event?.title}</TableCell>
            <TableCell>{b.status}</TableCell>
            <TableCell>{new Date(b.createdAt).toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserBookings;
