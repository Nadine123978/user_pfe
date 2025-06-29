import React, { useState } from "react";
import { Box, Typography, Divider, Button, TextField, Alert } from "@mui/material";
import axios from "axios";

export default function EmailContent({ message }) {
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replySent, setReplySent] = useState(false);
  const [sendingError, setSendingError] = useState(null);

  if (!message) {
    return (
      <Box width="55%" p={3} sx={{ overflowY: "auto" }}>
        <Typography variant="h6" color="text.secondary">
          Please select a message to view its details.
        </Typography>
      </Box>
    );
  }

  const handleReplyClick = () => {
    setReplyOpen(true);
    setReplySent(false);
    setReplyText("");
    setSendingError(null);
  };

  const handleSendReply = async () => {
    setSendingError(null);
    try {
      await axios.post("http://localhost:8081/api/emails/send-reply", {
        toEmail: message.email,
        subject: `Reply to your message`,
        message: replyText,
      });
      setReplySent(true);
      setReplyOpen(false);
      setReplyText("");
    } catch (error) {
      console.error("Error sending reply:", error);
      setSendingError("Failed to send reply. Please try again.");
    }
  };

  return (
    <Box width="55%" p={3} sx={{ overflowY: "auto" }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        {message.fullName} &lt;{message.email}&gt;
      </Typography>
      <Typography variant="caption" display="block" gutterBottom color="text.secondary">
        {new Date(message.createdAt).toLocaleString()}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="body2" paragraph>
        {message.message}
      </Typography>

      <Button
        variant="contained"
        color="error"
        onClick={handleReplyClick}
        sx={{ mt: 2 }}
      >
        Reply
      </Button>

      {replyOpen && (
        <Box mt={2}>
          <TextField
            multiline
            rows={4}
            fullWidth
            placeholder={`Reply to ${message.email}`}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <Box mt={1} display="flex" gap={2}>
            <Button
              variant="contained"
              color="error"
              onClick={handleSendReply}
              disabled={!replyText.trim()}
            >
              Send Reply
            </Button>
            <Button variant="outlined" onClick={() => setReplyOpen(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      )}

      {replySent && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Reply sent successfully to {message.email}.
        </Alert>
      )}

      {sendingError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {sendingError}
        </Alert>
      )}
    </Box>
  );
}
