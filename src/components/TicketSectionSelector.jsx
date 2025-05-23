// TicketSectionSelector.jsx
import React from "react";
import { Tabs, Tab, Box } from "@mui/material";

const TicketSectionSelector = () => (
  <Box sx={{ p: 2 }}>
    <Tabs value={0} aria-label="ticket section tabs">
      <Tab label="Tickets" />
      <Tab label="Registration" />
      <Tab label="Payment" />
    </Tabs>
  </Box>
);

export default TicketSectionSelector;