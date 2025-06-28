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
} from '@mui/material';
import { styled } from '@mui/material/styles'; // Import styled for custom button

// Custom styled button for consistency
const GradientButton = styled(Button)(({ theme, disabled }) => ({
  background: disabled
    ? 'linear-gradient(45deg, #444444, #555555)'
    : 'linear-gradient(45deg, #D81B60, #E91E63)', // Vibrant pink gradient
  border: 0,
  borderRadius: 30, // Very rounded button
  color: disabled ? '#999999' : 'white',
  height: 50, // Taller button
  padding: '0 30px', // More padding
  textTransform: 'uppercase', // Uppercase text
  fontWeight: 'bold',
  fontSize: '1.1rem', // Larger font size
  transition: 'all 0.3s ease',
  boxShadow: disabled ? 'none' : '0 8px 20px rgba(0, 0, 0, 0.5)', // Stronger shadow
  '&:hover': {
    background: disabled
      ? 'linear-gradient(45deg, #444444, #555555)'
      : 'linear-gradient(45deg, #C2185B, #D81B60)', // Darker pink on hover
    transform: disabled ? 'none' : 'translateY(-3px)', // Lift effect on hover
    boxShadow: disabled ? 'none' : '0 12px 25px rgba(0, 0, 0, 0.6)', // More intense shadow on hover
  },
}));


const TicketCheckout = ({ tickets, orderNumber, paymentSuccess, setPaymentSuccess, onPaymentDone }) => { // Added onPaymentDone to props
  const [selectedPayment, setSelectedPayment] = useState('MPGS');
  const [isPaying, setIsPaying] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const ticketsList = tickets || [];
  const paymentFee = 14.34;
  const subtotal = ticketsList.reduce((sum, t) => sum + t.price, 0);
  const total = subtotal + paymentFee;

  const paymentOptions = [
    { id: 'MPGS', label: 'MPGS', icons: ['VISA', 'MasterCard', 'AMEX'] },
    { id: 'OMT', label: 'OMT' },
    { id: 'MyMonty', label: 'MyMonty' },
    { id: 'Malik', label: "Malik's" },
    { id: 'Whish', label: 'Whish Checkout (Online)' },
    { id: 'Libanpost', label: 'Libanpost' },
    { id: 'CashUnited', label: 'Cash United' },
    { id: 'Tylleum', label: 'Pay with Tylleum' },
  ];

  const handlePayment = async () => {
    setIsPaying(true);
    setPaymentSuccess(false);
    setErrorMessage('');

    const seatIds = ticketsList.map((t) => t.id);
    const token = localStorage.getItem("token");

    try {
      // أولاً: تأكيد الحجز
      const confirmResponse = await fetch('http://localhost:8081/api/seats/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(seatIds ),
      });

      if (!confirmResponse.ok) {
        const errorMsg = await confirmResponse.text();
        setErrorMessage(errorMsg || 'Error confirming seats.');
        setIsPaying(false);
        return;
      }

      // ثانياً: إرسال طلب الدفع
      const payResponse = await fetch(`http://localhost:8081/api/bookings/pay/${orderNumber}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      } );

      if (!payResponse.ok) {
        const errorMsg = await payResponse.text();
        setErrorMessage(errorMsg || 'Payment failed.');
        setIsPaying(false);
        return;
      }

      // الدفع ناجح
      setPaymentSuccess(true);
      if (onPaymentDone) onPaymentDone();

    } catch (error) {
      setErrorMessage('Network or server error.');
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <Box maxWidth={600} mx="auto" p={4} display="flex" flexDirection="column" gap={4}
      sx={{
        backgroundColor: '#200245', // Overall background for the checkout section
        borderRadius: '16px',
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.6)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        color: 'white', // Default text color
      }}
    >
      {/* Tickets List */}
      <Card
        sx={{
          backgroundColor: '#2C0050', // Dark purple background for card
          borderRadius: '12px',
          boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        <CardContent>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: '#E0E0E0' }}>
            Your Tickets
          </Typography>
          <Stack spacing={2}>
            {ticketsList.map((ticket, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  bgcolor: 'rgba(0, 0, 0, 0.2)', // Subtle dark background for each ticket item
                  px: 2,
                  py: 1.5,
                  borderRadius: '8px',
                  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                }}
              >
                <Box>
                  <Typography fontWeight="medium" sx={{ color: '#FFFFFF' }}>{ticket.section}</Typography>
                  <Typography variant="caption" sx={{ color: '#B0B0B0' }}>
                    {ticket.zone}
                  </Typography>
                </Box>
                <Box textAlign="right">
                  <Typography fontWeight="medium" sx={{ color: '#FFFFFF' }}>
                    ${ticket.price != null ? ticket.price.toFixed(2) : '0.00'}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#B0B0B0' }}>
                    $3.46** fees
                  </Typography>
                </Box>
              </Box>
            ))}
            <Box display="flex" justifyContent="flex-end" fontWeight="600" mt={1} sx={{ color: '#E0E0E0' }}>
              SUBTOTAL: ${subtotal.toFixed(2)}
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Payment Options */}
      <Box>
        <Typography variant="h6" fontWeight="bold" mb={2} sx={{ color: '#E0E0E0' }}>
          Choose a Payment Option
        </Typography>
        <RadioGroup
          value={selectedPayment}
          onChange={(e) => setSelectedPayment(e.target.value)}
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', // Responsive grid
            gap: 2,
          }}
        >
          {paymentOptions.map((opt) => (
            <FormControlLabel
              key={opt.id}
              value={opt.id}
              control={
                <Radio
                  sx={{
                    color: '#B0B0B0', // Default radio color
                    '&.Mui-checked': {
                      color: '#E91E63', // Vibrant pink when checked
                    },
                  }}
                />
              }
              label={
                <Typography sx={{ color: '#FFFFFF', fontWeight: 500 }}>
                  {opt.label}
                </Typography>
              }
              sx={{
                border: selectedPayment === opt.id ? '2px solid #E91E63' : '1px solid rgba(255, 255, 255, 0.3)', // Highlight selected
                borderRadius: '10px', // More rounded
                padding: 1.5, // More padding
                backgroundColor: selectedPayment === opt.id ? 'rgba(233, 30, 99, 0.1)' : 'rgba(0, 0, 0, 0.2)', // Subtle background for selected
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: '#E91E63',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)',
                },
              }}
            />
          ))}
        </RadioGroup>
      </Box>

      {/* Payment Summary */}
      <Card
        sx={{
          backgroundColor: '#2C0050', // Dark purple background for card
          borderRadius: '12px',
          boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 3,
          }}
        >
          <Box>
            <Typography sx={{ color: '#E0E0E0' }}>Payment Fee</Typography>
            <Typography fontWeight="600" variant="h5" sx={{ color: '#E0E0E0' }}> {/* Larger and bold */}
              TOTAL
            </Typography>
          </Box>
          <Box textAlign="right">
            <Typography sx={{ color: '#FFFFFF' }}>${paymentFee.toFixed(2)}</Typography>
            <Typography fontWeight="600" variant="h5" sx={{ color: '#E91E63' }}> {/* Vibrant pink for total */}
              ${total.toFixed(2)}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Pay Button */}
      <Box textAlign="center">
        <GradientButton
          onClick={handlePayment}
          disabled={isPaying || paymentSuccess}
        >
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

      {/* Success Message */}
      {paymentSuccess && (
        <Alert severity="success" sx={{ mt: 2, borderRadius: '8px', backgroundColor: 'rgba(76, 175, 80, 0.2)', color: '#A5D6A7' }}>
          Your payment was successful! Thank you for your purchase.
        </Alert>
      )}

      {/* Error Message */}
      {errorMessage && (
        <Alert severity="error" sx={{ mt: 2, borderRadius: '8px', backgroundColor: 'rgba(244, 67, 54, 0.2)', color: '#EF9A9A' }}>
          {errorMessage}
        </Alert>
      )}
    </Box>
  );
};

export default TicketCheckout;
