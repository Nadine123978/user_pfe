import React, { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  Typography,
  Avatar,
  Chip,
  Divider,
  TextField,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

export default function EmailList({ onSelectMessage, selectedMessage }) {
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("http://localhost:8081/api/contact/all");
        setMessages(res.data);
      } catch (error) {
        console.error("Error fetching contact messages", error);
      }
    };

    fetchMessages();
  }, []);

  // فلترة الرسائل بناءً على البحث
  const filteredMessages = messages.filter((msg) =>
    msg.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography sx={{
        fontWeight: 700,
        fontSize: '1.5rem',
        background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: '20px',
        textAlign: 'center',
      }}>
         Messages 
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <TextField
          fullWidth
          placeholder="Search messages..."
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.5)', mr: 1 }} />,
          }}
        />
        <IconButton>
          <AddIcon />
        </IconButton>
      </Box>

      <Box sx={{ 
        flex: 1, 
        overflowY: 'auto',
        paddingRight: '8px',
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '3px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
          borderRadius: '3px',
          '&:hover': {
            background: 'linear-gradient(135deg, #5855eb 0%, #0891b2 100%)',
          },
        },
      }}>
        {messages.length === 0 ? (
          <Typography sx={{
            textAlign: 'center',
            color: '#6366f1',
            fontWeight: 600,
            padding: '40px',
            background: 'rgba(99, 102, 241, 0.1)',
            borderRadius: '12px',
            border: '1px solid rgba(99, 102, 241, 0.3)',
          }}>
             Scanning cosmic messages...
          </Typography>
        ) : (
          <List sx={{ padding: 0 }}>
            {filteredMessages.map((msg) => (
              <React.Fragment key={msg.id}>
                <ListItem
                  alignItems="flex-start"
                  sx={{
                    background: selectedMessage?.id === msg.id 
                      ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)'
                      : !msg.isRead
                      ? 'rgba(99, 102, 241, 0.1)'
                      : 'rgba(255, 255, 255, 0.03)',
                    cursor: 'pointer',
                    borderRadius: '12px',
                    marginBottom: '8px',
                    transition: 'all 0.3s ease',
                    border: selectedMessage?.id === msg.id 
                      ? '1px solid rgba(99, 102, 241, 0.5)'
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                      transform: 'translateX(8px) scale(1.02)',
                      boxShadow: '0 8px 25px rgba(99, 102, 241, 0.2)',
                      border: '1px solid rgba(99, 102, 241, 0.3)',
                      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)',
                    },
                  }}
                  onClick={() => onSelectMessage(msg)}
                >
                  <Avatar sx={{ mr: 2, mt: 0.5 }}>
                    {msg.fullName ? msg.fullName[0].toUpperCase() : "?"}
                  </Avatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{
                      fontWeight: 600,
                      color: '#ffffff',
                      fontSize: '0.95rem',
                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                    }}>
                      {msg.fullName}
                    </Typography>
                    <Chip 
                      label={msg.email} 
                      size="small" 
                      sx={{ 
                        mt: 0.5, 
                        mb: 1, 
                        fontSize: '0.7rem',
                        background: 'rgba(6, 182, 212, 0.2)',
                        color: '#06b6d4',
                        border: '1px solid rgba(6, 182, 212, 0.3)',
                        fontWeight: 500,
                      }} 
                    />
                    <Typography sx={{
                      fontSize: '0.8rem',
                      color: 'rgba(255, 255, 255, 0.7)',
                      maxWidth: '250px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {msg.message}
                    </Typography>
                    <Typography sx={{
                      fontSize: '0.75rem',
                      color: 'rgba(255, 255, 255, 0.5)',
                      fontStyle: 'italic',
                    }}>
                      {new Date(msg.createdAt).toLocaleString()}
                    </Typography>
                  </Box>
                </ListItem>
                <Divider sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                  margin: '4px 0' 
                }} />
              </React.Fragment>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
}

