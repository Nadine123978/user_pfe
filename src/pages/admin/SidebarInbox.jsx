import React from "react";
import { Box, Typography, List, ListItem, ListItemText, Chip } from "@mui/material";

export default function Sidebar() {
  // بيانات وهمية للعرض فقط (بدك تجيبهم من API أو state)
  const messageCounts = {
    inbox: 10,
    starred: 3,
    sent: 5,
    drafts: 0,
    spam: 2,
    trash: 0,
    replied: 4,
    unread: 6,
    contactMessages: 7,
    bookings: 3,
  };

  return (
    <Box
      width="15%"
      bgcolor="#f9f9f9"
      
      borderRight="1px solid #ddd"
      sx={{ overflowY: "auto" }}
    >
      {/* Inbox Section */}
      <Box mb={3} p={2} bgcolor="#fff" borderRadius={2} boxShadow={1}>
        <Typography variant="h6" fontWeight="bold" mb={2} color="#C400FF">
          Inbox
        </Typography>
        <List>
          {[
            { name: "Starred", count: messageCounts.starred },
            { name: "Sent", count: messageCounts.sent },
            { name: "Drafts", count: messageCounts.drafts },
            { name: "Spam", count: messageCounts.spam },
            { name: "Trash", count: messageCounts.trash },
          ].map(({ name, count }) => (
            <ListItem button key={name} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <ListItemText primary={name} />
              {count > 0 && (
                <Chip
                  label={count}
                  color="secondary"
                  size="small"
                  sx={{ ml: 1 }}
                />
              )}
            </ListItem>
          ))}
        </List>

        {/* Extra info */}
        <Box mt={3}>
          <Typography variant="subtitle2" fontWeight="bold" mb={1}>
            Quick Stats
          </Typography>
          <List>
            <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <ListItemText primary="Replied Messages" />
              {messageCounts.replied > 0 && (
                <Chip label={messageCounts.replied} color="success" size="small" />
              )}
            </ListItem>
            <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <ListItemText primary="Unread Messages" />
              {messageCounts.unread > 0 && (
                <Chip label={messageCounts.unread} color="error" size="small" />
              )}
            </ListItem>
            <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <ListItemText primary="Contact Messages" />
              {messageCounts.contactMessages > 0 && (
                <Chip label={messageCounts.contactMessages} color="primary" size="small" />
              )}
            </ListItem>
            <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <ListItemText primary="Bookings" />
              {messageCounts.bookings > 0 && (
                <Chip label={messageCounts.bookings} color="warning" size="small" />
              )}
            </ListItem>
          </List>
        </Box>
      </Box>

    
    </Box>
  );
}
