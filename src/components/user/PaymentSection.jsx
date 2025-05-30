import React, { useState } from 'react';
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  Divider
} from '@mui/material';

const PaymentSection = ({ event }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');

  const subtotal = event.price + 5; // السعر + رسوم رمزية مثل $5
  const fee = 6.38;
  const total = (subtotal + fee).toFixed(2);

  const handlePay = () => {
    alert('✅ Payment submitted! (Mock)');
    // فيك تضيف طلب POST فعلي هون وقت تربطه مع backend
  };

  return (
    <Box>
      <Typography variant="h6">Order Summary</Typography>

      <Box my={2}>
        <Typography>🎫 Section A, C7</Typography>
        <Typography variant="body2" color="text.secondary">
          Price: ${subtotal.toFixed(2)}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1">Choose a Payment Option</Typography>
      <RadioGroup
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        sx={{ mt: 1 }}
      >
        <FormControlLabel value="card" control={<Radio />} label="Credit Card" />
        <FormControlLabel value="omt" control={<Radio />} label="OMT" />
        <FormControlLabel value="cash" control={<Radio />} label="Cash United" />
      </RadioGroup>

      {paymentMethod === 'card' && (
        <Box mt={3}>
          <TextField fullWidth label="Card Number" sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="MM/YY" fullWidth />
            <TextField label="CVV" fullWidth />
          </Box>
        </Box>
      )}

      <Divider sx={{ my: 3 }} />

      <Typography>
        <strong>Subtotal:</strong> ${subtotal.toFixed(2)}
      </Typography>
      <Typography>
        <strong>Fee:</strong> ${fee}
      </Typography>
      <Typography variant="h6" mt={1}>
        <strong>Total:</strong> ${total}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
        fullWidth
        onClick={handlePay}
      >
        Pay
      </Button>
    </Box>
  );
};

export default PaymentSection;
