// ✅ TicketCheckout.jsx (React)

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Stack,
  Button,
  CircularProgress,
  Alert,
  TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const GradientButton = styled(Button)(({ disabled }) => ({
  background: disabled
    ? 'linear-gradient(45deg, #444444, #555555)'
    : 'linear-gradient(45deg, #D81B60, #E91E63)',
  border: 0,
  borderRadius: 30,
  color: disabled ? '#999999' : 'white',
  height: 50,
  padding: '0 30px',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  transition: 'all 0.3s ease',
  boxShadow: disabled ? 'none' : '0 8px 20px rgba(0, 0, 0, 0.5)',
  '&:hover': {
    background: disabled
      ? 'linear-gradient(45deg, #444444, #555555)'
      : 'linear-gradient(45deg, #C2185B, #D81B60)',
    transform: disabled ? 'none' : 'translateY(-3px)',
    boxShadow: disabled ? 'none' : '0 12px 25px rgba(0, 0, 0, 0.6)',
  },
}));

const TicketCheckout = ({ tickets, orderNumber, paymentSuccess, setPaymentSuccess, onPaymentDone }) => {
  const [selectedPayment, setSelectedPayment] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [receiptNumber, setReceiptNumber] = useState('');
  const [receiptImage, setReceiptImage] = useState(null);
  const [isPaying, setIsPaying] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const ticketsList = tickets || [];
  const paymentFee = 14.34;
  const subtotal = ticketsList.reduce((sum, t) => sum + t.price, 0);
  const total = subtotal + paymentFee;

  const paymentOptions = [
    { id: 'MPGS', label: 'MPGS' },
    { id: 'OMT', label: 'OMT' },
    { id: 'MyMonty', label: 'MyMonty' },
    { id: 'Malik', label: "Malik's" },
    { id: 'Whish', label: 'Whish Checkout (Online)' },
    { id: 'Libanpost', label: 'Libanpost' },
    { id: 'CashUnited', label: 'Cash United' },
    { id: 'Tylleum', label: 'Pay with Tylleum' },
  ];

  const isOffline = ['OMT', 'MyMonty', 'Malik', 'Libanpost', 'CashUnited'].includes(selectedPayment);

  const isFormValid = () => {
    if (!selectedPayment) return false;
    if (isOffline) {
      return fullName && phoneNumber && receiptNumber;
    }
    return true;
  };

  const handlePayment = async () => {
    setIsPaying(true);
    setPaymentSuccess(false);
    setErrorMessage('');

    const seatIds = ticketsList.map((t) => t.id);
    const token = localStorage.getItem("token");

    try {
      const confirmResponse = await fetch('http://localhost:8081/api/seats/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(seatIds),
      });

      if (!confirmResponse.ok) {
        const errorMsg = await confirmResponse.text();
        setErrorMessage(errorMsg || 'Error confirming seats.');
        setIsPaying(false);
        return;
      }

    const formData = new FormData();
formData.append('paymentMethod', selectedPayment);
formData.append('orderNumber', orderNumber);
formData.append('amount', total.toString());  // مهم

if (isOffline) {
  formData.append('fullName', fullName);
  formData.append('phoneNumber', phoneNumber);
  formData.append('receiptNumber', receiptNumber);
  if (receiptImage) formData.append('receiptImage', receiptImage);
}

// DEBUG
for (let [key, value] of formData.entries()) {
  console.log(key + ": ", value);
}


      const payResponse = await fetch(`http://localhost:8081/api/payments/pay`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!payResponse.ok) {
        const errorMsg = await payResponse.text();
        setErrorMessage(errorMsg || 'Payment failed.');
        setIsPaying(false);
        return;
      }

      setPaymentSuccess(true);
      if (onPaymentDone) onPaymentDone();
    } catch (error) {
      setErrorMessage('Network or server error.');
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <Box maxWidth={600} mx="auto" p={4} display="flex" flexDirection="column" gap={4} sx={{ backgroundColor: '#200245', borderRadius: '16px', boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.6)', color: 'white' }}>
      <Card sx={{ backgroundColor: '#2C0050', borderRadius: '12px' }}>
        <CardContent>
          <Typography variant="h6">Your Tickets</Typography>
          <Stack spacing={2}>
            {ticketsList.map((ticket, index) => (
              <Box key={index} display="flex" justifyContent="space-between">
                <Box>
                  <Typography>{ticket.section}</Typography>
                  <Typography variant="caption">{ticket.zone}</Typography>
                </Box>
                <Box textAlign="right">
                  <Typography>${ticket.price?.toFixed(2)}</Typography>
                  <Typography variant="caption">$3.46 fees</Typography>
                </Box>
              </Box>
            ))}
            <Box display="flex" justifyContent="flex-end">
              SUBTOTAL: ${subtotal.toFixed(2)}
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Box>
        <Typography variant="h6">Choose a Payment Option</Typography>
        <RadioGroup value={selectedPayment} onChange={(e) => setSelectedPayment(e.target.value)} sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 2 }}>
          {paymentOptions.map((opt) => (
            <FormControlLabel
              key={opt.id}
              value={opt.id}
              control={<Radio sx={{ color: '#B0B0B0', '&.Mui-checked': { color: '#E91E63' } }} />}
              label={<Typography sx={{ color: '#FFFFFF' }}>{opt.label}</Typography>}
              sx={{ border: selectedPayment === opt.id ? '2px solid #E91E63' : '1px solid rgba(255, 255, 255, 0.3)', borderRadius: '10px', padding: 1.5, backgroundColor: selectedPayment === opt.id ? 'rgba(233, 30, 99, 0.1)' : 'rgba(0, 0, 0, 0.2)' }}
            />
          ))}
        </RadioGroup>

        {isOffline && (
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            <TextField label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} fullWidth />
            <TextField label="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} fullWidth />
            <TextField label="Receipt Number" value={receiptNumber} onChange={(e) => setReceiptNumber(e.target.value)} fullWidth />
            <input type="file" accept="image/*" onChange={(e) => setReceiptImage(e.target.files[0])} />
          </Box>
        )}
      </Box>

      <Card sx={{ backgroundColor: '#2C0050', borderRadius: '12px' }}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography>Payment Fee</Typography>
            <Typography variant="h5">TOTAL</Typography>
          </Box>
          <Box textAlign="right">
            <Typography>${paymentFee.toFixed(2)}</Typography>
            <Typography variant="h5" color="#E91E63">${total.toFixed(2)}</Typography>
          </Box>
        </CardContent>
      </Card>

      <Box textAlign="center">
        <GradientButton onClick={handlePayment} disabled={!isFormValid() || isPaying || paymentSuccess}>
          {isPaying ? (
            <>
              <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
              Processing...
            </>
          ) : paymentSuccess ? (
            'Payment Successful'
          ) : (
            'Pay Now'
          )}
        </GradientButton>
      </Box>

      {paymentSuccess && (
        <Alert severity="success" sx={{ mt: 2 }}>Your payment was successful!</Alert>
      )}
      {errorMessage && (
        <Alert severity="error" sx={{ mt: 2 }}>{errorMessage}</Alert>
      )}
    </Box>
  );
};

export default TicketCheckout;