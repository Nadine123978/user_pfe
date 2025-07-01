import React from "react";
import { Box, Typography, List, ListItem, ListItemText, Chip } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import StarIcon from "@mui/icons-material/Star";
import SendIcon from "@mui/icons-material/Send";
import DraftsIcon from "@mui/icons-material/Drafts";
import SpamIcon from "@mui/icons-material/Report";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplyIcon from "@mui/icons-material/Reply";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import BookOnlineIcon from "@mui/icons-material/BookOnline";

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

  const inboxItems = [
    { name: "Starred", count: messageCounts.starred, icon: <StarIcon fontSize="small" />, color: "secondary" },
    { name: "Sent", count: messageCounts.sent, icon: <SendIcon fontSize="small" />, color: "primary" },
    { name: "Drafts", count: messageCounts.drafts, icon: <DraftsIcon fontSize="small" />, color: "secondary" },
    { name: "Spam", count: messageCounts.spam, icon: <SpamIcon fontSize="small" />, color: "error" },
    { name: "Trash", count: messageCounts.trash, icon: <DeleteIcon fontSize="small" />, color: "error" },
  ];

  const statsItems = [
    { name: "Replied Messages", count: messageCounts.replied, icon: <ReplyIcon fontSize="small" />, color: "success" },
    { name: "Unread Messages", count: messageCounts.unread, icon: <MarkEmailUnreadIcon fontSize="small" />, color: "error" },
    { name: "Contact Messages", count: messageCounts.contactMessages, icon: <ContactMailIcon fontSize="small" />, color: "primary" },
    { name: "Bookings", count: messageCounts.bookings, icon: <BookOnlineIcon fontSize="small" />, color: "warning" },
  ];

  return (
    <Box sx={{ height: '100%', overflow: 'auto' }}>
      {/* Inbox Section */}
      <Box sx={{ 
        marginBottom: '24px',
        padding: '20px',
        background: 'rgba(99, 102, 241, 0.1)',
        borderRadius: '16px',
        border: '1px solid rgba(99, 102, 241, 0.2)',
      }}>
        <Typography sx={{
          fontWeight: 700,
          fontSize: '1.3rem',
          background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <InboxIcon />
          📧 Inbox ✨
        </Typography>
        <List sx={{ padding: 0 }}>
          {inboxItems.map(({ name, count, icon, color }) => (
            <ListItem key={name} sx={{
              background: 'rgba(255, 255, 255, 0.03)',
              cursor: 'pointer',
              borderRadius: '12px',
              marginBottom: '8px',
              transition: 'all 0.3s ease',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              '&:hover': {
                transform: 'translateX(8px) scale(1.02)',
                boxShadow: '0 8px 25px rgba(99, 102, 241, 0.2)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)',
              },
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <Box sx={{ marginRight: '12px', color: '#6366f1', display: 'flex', alignItems: 'center' }}>
                  {icon}
                </Box>
                <ListItemText 
                  primary={name}
                  sx={{
                    '& .MuiListItemText-primary': {
                      color: '#ffffff',
                      fontWeight: 500,
                      fontSize: '0.9rem',
                    },
                  }}
                />
              </Box>
              {count > 0 && (
                <Chip
                  label={count}
                  color={color}
                  size="small"
                />
              )}
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Quick Stats Section */}
      <Box sx={{ 
        marginBottom: '24px',
        padding: '20px',
        background: 'rgba(99, 102, 241, 0.1)',
        borderRadius: '16px',
        border: '1px solid rgba(99, 102, 241, 0.2)',
      }}>
        <Typography sx={{
          fontWeight: 700,
          fontSize: '1.3rem',
          background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          📊 Quick Stats
        </Typography>
        <List sx={{ padding: 0 }}>
          {statsItems.map(({ name, count, icon, color }) => (
            <ListItem key={name} sx={{
              background: 'rgba(255, 255, 255, 0.03)',
              cursor: 'pointer',
              borderRadius: '12px',
              marginBottom: '8px',
              transition: 'all 0.3s ease',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              '&:hover': {
                transform: 'translateX(8px) scale(1.02)',
                boxShadow: '0 8px 25px rgba(99, 102, 241, 0.2)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)',
              },
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <Box sx={{ marginRight: '12px', color: '#6366f1', display: 'flex', alignItems: 'center' }}>
                  {icon}
                </Box>
                <ListItemText 
                  primary={name}
                  sx={{
                    '& .MuiListItemText-primary': {
                      color: '#ffffff',
                      fontWeight: 500,
                      fontSize: '0.9rem',
                    },
                  }}
                />
              </Box>
              {count > 0 && (
                <Chip
                  label={count}
                  color={color}
                  size="small"
                />
              )}
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}

