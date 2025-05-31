import React from 'react';
import { Chip } from '@mui/material';

const StatusBadge = ({ status }) => {
  const color = status === 'Active' ? 'success' : 'error';
  return <Chip label={status} color={color} size="small" />;
};

export default StatusBadge;