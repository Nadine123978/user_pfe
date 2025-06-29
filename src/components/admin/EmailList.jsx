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
    <Box width="30%" p={2} borderRight="1px solid #ddd" sx={{ overflowY: "auto", height: "80vh" }}>
      <Box display="flex" alignItems="center" mb={2}>
        <TextField
          fullWidth
          placeholder="Search for messages"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IconButton>
          <AddIcon />
        </IconButton>
      </Box>

      <List>
        {messages.length === 0 && <Typography>Loading messages...</Typography>}

        {filteredMessages.map((msg) => (
          <React.Fragment key={msg.id}>
            <ListItem
              alignItems="flex-start"
              sx={{
                backgroundColor:
                  selectedMessage?.id === msg.id
                    ? "#bbdefb"
                    : msg.isRead
                    ? "inherit"
                    : "#e3f2fd",
                cursor: "pointer",
              }}
              onClick={() => onSelectMessage(msg)}
            >
              <Avatar sx={{ mr: 1 }}>
                {msg.fullName ? msg.fullName[0].toUpperCase() : "?"}
              </Avatar>
              <Box>
                <Typography fontWeight="bold">{msg.fullName}</Typography>
                <Chip label={msg.email} size="small" sx={{ mt: 0.5, mb: 1 }} />
                <Typography fontSize={12} color="gray" noWrap sx={{ maxWidth: 250 }}>
                  {msg.message}
                </Typography>
                <Typography variant="caption" display="block" color="text.secondary">
                  {new Date(msg.createdAt).toLocaleString()}
                </Typography>
              </Box>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}