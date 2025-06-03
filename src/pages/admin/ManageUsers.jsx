import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // ✅ هذا هو المطلوب

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8081/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>#</TableCell>
          <TableCell>FullName</TableCell>
          <TableCell>Username</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Reg. Date</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user, index) => (
          <TableRow key={user.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{user.fullName || "-"}</TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>-</TableCell>
            <TableCell>
              <Button onClick={() => navigate(`/admin/users/${user.id}/bookings`)} variant="contained">
                BOOKINGS
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ManageUsers;
