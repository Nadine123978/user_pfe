import React from 'react';
import { TableRow, TableCell, Avatar, Box, Typography } from '@mui/material';
import AdminTypeChip from './AdminTypeChip';
import StatusBadge from './StatusBadge';
import ActionButtons from './ActionButtons';

const AdminTableRow = ({ admin, onEdit , onDelete }) => {
  return (
    <TableRow>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar src={admin.img} />
          <Box>
            <Typography fontWeight="bold">{admin.name}</Typography>
            <Typography variant="body2" color="text.secondary">{admin.email}</Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell><StatusBadge status={admin.status} /></TableCell>
      <TableCell>{admin.date}</TableCell>
      <TableCell>{admin.ip}</TableCell>
      <TableCell>  <ActionButtons 
          onEdit={() => onEdit(admin)} 
          onDelete={() => onDelete(admin.id)} 
        /></TableCell>
    </TableRow>
  );
};

export default AdminTableRow;
