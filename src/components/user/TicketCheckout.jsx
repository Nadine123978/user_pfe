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
} from '@mui/material';

const TicketCheckout = ({ tickets }) => {
  const [selectedPayment, setSelectedPayment] = useState('MPGS');

  // لو لم يتم تمرير تذاكر نعرض مصفوفة فارغة لتجنب الأخطاء
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

  return (
    <Box maxWidth={600} mx="auto" p={3} display="flex" flexDirection="column" gap={4}>
      {/* Tickets List */}
      <Card>
        <CardContent>
          <Stack spacing={2}>
            {ticketsList.map((ticket, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                bgcolor="#f5f5f5"
                px={2}
                py={1.5}
                borderRadius={1}
              >
                <Box>
                  <Typography fontWeight="medium">
                    Section B, {ticket.section}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {ticket.zone}
                  </Typography>
                </Box>
                <Box textAlign="right">
                  <Typography fontWeight="medium">${ticket.price.toFixed(2)}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    $3.46** fees
                  </Typography>
                </Box>
              </Box>
            ))}
            <Box display="flex" justifyContent="flex-end" fontWeight="600" mt={1}>
              SUBTOTAL: ${subtotal.toFixed(2)}
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Payment Options */}
      <Box>
        <Typography variant="h6" mb={2}>
          Choose a Payment Option
        </Typography>
        <RadioGroup
          value={selectedPayment}
          onChange={(e) => setSelectedPayment(e.target.value)}
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 2,
          }}
        >
          {paymentOptions.map((opt) => (
            <FormControlLabel
              key={opt.id}
              value={opt.id}
              control={<Radio />}
              label={opt.label}
              sx={{
                border: '1px solid #ccc',
                borderRadius: 1,
                padding: 1,
                '& .MuiFormControlLabel-label': { fontWeight: 500 },
              }}
            />
          ))}
        </RadioGroup>
      </Box>

      {/* Payment Summary */}
      <Card>
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 3,
          }}
        >
          <Box>
            <Typography>Payment Fee</Typography>
            <Typography fontWeight="600" variant="h6">
              TOTAL
            </Typography>
          </Box>
          <Box textAlign="right">
            <Typography>${paymentFee.toFixed(2)}</Typography>
            <Typography fontWeight="600" variant="h6">
              ${total.toFixed(2)}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TicketCheckout;
