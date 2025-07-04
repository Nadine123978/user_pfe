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
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

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

const TicketCheckout = ({
  tickets,
  orderNumber,
  bookingId,
  paymentSuccess,
  setPaymentSuccess,
  onPaymentDone,
}) => {
  const [selectedPayment, setSelectedPayment] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [receiptNumber, setReceiptNumber] = useState('');
  const [receiptImage, setReceiptImage] = useState(null);
  const [isPaying, setIsPaying] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const ticketsList = tickets || [];
  const subtotal = ticketsList.reduce((sum, t) => sum + t.price, 0);
  const total = subtotal;

  const paymentOptions = [
    { id: 'MPGS', label: 'MPGS' },
    { id: 'OMT', label: 'OMT' },
    { id: 'MyMonty', label: 'MyMonty' },
    { id: 'Malik', label: "Malik's" },
    { id: 'Whish', label: 'Whish Checkout (Online)' },
    { id: 'Libanpost', label: 'Libanpost' },
    { id: 'CashUnited', label: 'Cash United' },
    { id: 'Tylleum', label: 'Pay with Tylleum' },
    { id: 'PayPal', label: 'PayPal' }, // PayPal added here
  ];

  const isOffline = ['OMT', 'MyMonty', 'Malik', 'Libanpost', 'CashUnited'].includes(selectedPayment);

  const isFormValid = () => {
    if (!selectedPayment) return false;
    if (isOffline) {
      return fullName.trim() && phoneNumber.trim() && receiptNumber.trim();
    }
    return true;
  };
  // *** هنا أضفت استخراج الإيميل من التوكن JWT ***
  const getEmailFromToken = () => {
  const token = localStorage.getItem('token');
  console.log('Token inside getEmailFromToken:', token);
  if (!token) return '';
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    console.log('Decoded JWT payload:', jsonPayload);
    const payload = JSON.parse(jsonPayload);
    console.log('Payload object:', payload);
    return payload.sub || '';
  } catch (e) {
    console.log('Error decoding token:', e);
    return '';
  }
};


  const handlePayment = async () => {
    if (!bookingId) {
      setErrorMessage('Booking ID is missing.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('User not authenticated.');
      return;
    }

    setIsPaying(true);
    setPaymentSuccess(false);
    setErrorMessage('');

    const seatIds = ticketsList.map((t) => t.id);

    try {
      // Confirm seats first
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

      // استخراج الإيميل
      const email = getEmailFromToken();
          console.log('Extracted email (sub):', email);


      // Prepare payment data
      const formData = new FormData();
      formData.append('paymentMethod', selectedPayment);
      formData.append('bookingId', bookingId.toString());
      formData.append('amount', total.toString());
      formData.append('email', email);  // أضفت الإيميل هنا

      if (isOffline) {
        formData.append('fullName', fullName);
        formData.append('phoneNumber', phoneNumber);
        formData.append('receiptNumber', receiptNumber);
        if (receiptImage) formData.append('receiptImage', receiptImage);
      }

      // DEBUG: Log formData content
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: `, value);
      }

      // Send payment request
      const payResponse = await fetch('http://localhost:8081/api/payments/pay', {
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
      console.error('Payment error:', error);
      setErrorMessage('Network or server error.');
    } finally {
      setIsPaying(false);
    }
  };

  
  return (
    <Box
      maxWidth={600}
      mx="auto"
      p={4}
      display="flex"
      flexDirection="column"
      gap={4}
      sx={{
        backgroundColor: '#200245',
        borderRadius: '16px',
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.6)',
        color: 'white',
      }}
    >
     <Card sx={{ backgroundColor: '#2C0050', borderRadius: '12px' }}>
  <CardContent
    sx={{
      color: 'white', // يجعل كل النصوص باللون الأبيض
    }}
  >
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
        <RadioGroup
          value={selectedPayment}
          onChange={(e) => setSelectedPayment(e.target.value)}
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: 2,
          }}
        >
          {paymentOptions.map((opt) => (
            <FormControlLabel
              key={opt.id}
              value={opt.id}
              control={<Radio sx={{ color: '#B0B0B0', '&.Mui-checked': { color: '#E91E63' } }} />}
              label={<Typography sx={{ color: '#FFFFFF' }}>{opt.label}</Typography>}
              sx={{
                border: selectedPayment === opt.id ? '2px solid #E91E63' : '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '10px',
                padding: 1.5,
                backgroundColor: selectedPayment === opt.id ? 'rgba(233, 30, 99, 0.1)' : 'rgba(0, 0, 0, 0.2)',
              }}
            />
          ))}
        </RadioGroup>

        {isOffline && (
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
           <TextField
  label="Full Name"
  value={fullName}
  onChange={(e) => setFullName(e.target.value)}
  fullWidth
  InputProps={{
    sx: { color: 'white' },
  }}
  InputLabelProps={{
    sx: { color: 'white' },
  }}
/>

<TextField
  label="Phone Number"
  value={phoneNumber}
  onChange={(e) => setPhoneNumber(e.target.value)}
  fullWidth
  InputProps={{
    sx: { color: 'white' },
  }}
  InputLabelProps={{
    sx: { color: 'white' },
  }}
/>

<TextField
  label="Receipt Number"
  value={receiptNumber}
  onChange={(e) => setReceiptNumber(e.target.value)}
  fullWidth
  InputProps={{
    sx: { color: 'white' },
  }}
  InputLabelProps={{
    sx: { color: 'white' },
  }}
/>

 {/* حقل رفع الملف */}
    <Button
      variant="outlined"
      component="label"
      sx={{ color: 'white', borderColor: 'white', borderRadius: 2 }}
    >
      Choose Receipt Image
      <input
        type="file"
        hidden
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setReceiptImage(e.target.files[0]);
          }
        }}
      />
    </Button>
    {/* عرض اسم الملف المرفوع */}
    {receiptImage && (
      <Typography variant="caption" sx={{ mt: 1 }}>
        Selected file: {receiptImage.name}
      </Typography>
    )}

          </Box>
        )}
      </Box>

      {selectedPayment === 'PayPal' ? (
        <PayPalScriptProvider options={{ "client-id": "YOUR_CLIENT_ID_HERE" }}>
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  amount: { value: total.toFixed(2) }
                }]
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                console.log('Payment Approved by', details.payer.name.given_name);
                setPaymentSuccess(true);
                if (onPaymentDone) onPaymentDone();
              });
            }}
          />
        </PayPalScriptProvider>
      ) : (
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
      )}

      {paymentSuccess && <Alert severity="success" sx={{ mt: 2 }}>Your payment was successful!</Alert>}
      {errorMessage && <Alert severity="error" sx={{ mt: 2 }}>{errorMessage}</Alert>}
    </Box>
  );
};

export default TicketCheckout;