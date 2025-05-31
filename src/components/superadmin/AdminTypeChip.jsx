import React from 'react';
import { Chip } from '@mui/material';

const colors = {
  Super: 'primary',
  General: 'info',
  Contributor: 'success',
  Contractor: 'warning',
  Admin: 'secondary',
};

const AdminTypeChip = ({ type }) => {
  return <Chip label={type} color={colors[type] || 'default'} size="small" />;
};

export default AdminTypeChip;