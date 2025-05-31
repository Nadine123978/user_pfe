import React from 'react';
import { TableHead, TableRow, TableCell } from '@mui/material';

const UserTableHeader = () => (
  <TableHead>
    <TableRow>
      <TableCell>Name</TableCell>
      <TableCell>Admin Type</TableCell>
      <TableCell>Status</TableCell>
      <TableCell>Last Login Date</TableCell>
      <TableCell>Login IP</TableCell>
      <TableCell>Action</TableCell>
    </TableRow>
  </TableHead>
);

export default UserTableHeader;