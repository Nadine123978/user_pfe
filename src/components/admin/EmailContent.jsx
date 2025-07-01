import React, { useState } from "react";
import { Box, Typography, Divider, Button, TextField, Alert } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";

export default function EmailContent({ message }) {
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replySent, setReplySent] = useState(false);
  const [sendingError, setSendingError] = useState(null);

  if (!message) {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.6)',
      }}>
        <Typography sx={{ fontSize: '4rem', marginBottom: '20px', opacity: 0.5 }}>
          📧
        </Typography>
        <Typography sx={{
          fontSize: '1.2rem',
          fontWeight: 500,
          color: '#6366f1',
        }}>
          Select a message to view its cosmic details ✨
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
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      overflow: 'auto',
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
      <Box sx={{
        marginBottom: '20px',
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
          marginBottom: '8px',
        }}>
          {message.fullName} ✨
        </Typography>
        <Typography sx={{ color: '#06b6d4', fontSize: '1rem', mb: 1 }}>
          📧 {message.email}
        </Typography>
        <Typography sx={{
          fontSize: '0.9rem',
          color: 'rgba(255, 255, 255, 0.6)',
          fontStyle: 'italic',
        }}>
          🕒 {new Date(message.createdAt).toLocaleString()}
        </Typography>
      </Box>

      <Divider sx={{ 
        backgroundColor: 'rgba(99, 102, 241, 0.3)', 
        margin: '20px 0',
        height: '2px',
        borderRadius: '1px'
      }} />

      <Box sx={{
        padding: '20px',
        background: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        marginBottom: '20px',
        minHeight: '200px',
      }}>
        <Typography sx={{
          color: '#ffffff',
          fontSize: '1rem',
          lineHeight: 1.6,
          whiteSpace: 'pre-wrap',
        }}>
          {message.message}
        </Typography>
      </Box>

      <Button
        variant="contained"
        startIcon={<ReplyIcon />}
        onClick={handleReplyClick}
        sx={{
          background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #5855eb 0%, #0891b2 100%)',
          }
        }}
      >
        🚀 Reply
      </Button>

      {replyOpen && (
        <Box sx={{
          marginTop: '20px',
          padding: '20px',
          background: 'rgba(6, 182, 212, 0.05)',
          borderRadius: '16px',
          border: '1px solid rgba(6, 182, 212, 0.2)',
        }}>
          <Typography sx={{ 
            color: '#06b6d4', 
            fontWeight: 600, 
            mb: 2,
            fontSize: '1.1rem'
          }}>
            💬 Reply to {message.email}
          </Typography>
          <TextField
            multiline
            rows={4}
            fullWidth
            placeholder={`Write your cosmic reply to ${message.fullName}...`}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              startIcon={<SendIcon />}
              onClick={handleSendReply}
              disabled={!replyText.trim()}
              sx={{
                background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #059669 0%, #0891b2 100%)',
                },
                '&:disabled': {
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'rgba(255, 255, 255, 0.3)',
                }
              }}
            >
              Send Reply
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<CancelIcon />}
              onClick={() => setReplyOpen(false)}
              sx={{
                borderColor: 'rgba(239, 68, 68, 0.5)',
                color: '#ef4444',
                '&:hover': {
                  borderColor: '#ef4444',
                  background: 'rgba(239, 68, 68, 0.1)',
                }
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      )}

      {replySent && (
        <Alert severity="success" sx={{ mt: 2 }}>
          ✅ Reply sent successfully to {message.email}! 🚀
        </Alert>
      )}

      {sendingError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          ❌ {sendingError}
        </Alert>
      )}
    </Box>
  );
}

