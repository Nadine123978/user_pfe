import React from 'react';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';

const ActionButtons = ({ onEdit, onDelete }) => (
  <>
    <IconButton onClick={onEdit} aria-label="edit">
      <EditIcon />
    </IconButton>

    <IconButton onClick={onDelete} aria-label="delete">
      <DeleteIcon />
    </IconButton>

   
  </>
);

export default ActionButtons;
