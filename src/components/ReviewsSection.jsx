import React from 'react';
import {
  Box,
  Typography,
  Divider,
  LinearProgress,
  Avatar,
  Rating,
  Button
} from '@mui/material';

const reviewsData = [
  {
    name: 'Rick',
    date: 'Apr 24, 2025',
    rating: 4,
    content:
      'Great ride. Got great pictures. We really enjoyed the scenery from up the top of the ferris wheel.'
  },
  {
    name: 'Divyank',
    date: 'Jan 18, 2025',
    rating: 5,
    content:
      'The experience was astounding. It was no less than a magical experience like the roof of the great dining hall in Harry Potter. I was totally immersed.'
  },
  {
    name: 'Laura',
    date: 'Dec 30, 2024',
    rating: 4,
    content:
      'Great experience, my only complaint would be that there should be some sort of defroster to keep the windows clear so that you can see the beautiful views of the city.'
  }
];

const ratingCounts = {
  5: 357,
  4: 62,
  3: 24,
  2: 7,
  1: 6
};

const ReviewsSection = () => {
  const total = Object.values(ratingCounts).reduce((a, b) => a + b, 0);

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Ratings & reviews
      </Typography>

      <Box display="flex" alignItems="flex-start" gap={3}>
        <Box>
          <Typography variant="h2" fontWeight="bold">4.7</Typography>
          <Rating value={4.7} precision={0.1} readOnly />
          <Typography color="text.secondary" fontSize={14}>
            456 verified customer reviews
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          {[5, 4, 3, 2, 1].map((star) => (
            <Box key={star} display="flex" alignItems="center" mb={1}>
              <Typography variant="body2" sx={{ width: 20 }}>
                {star}★
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(ratingCounts[star] / total) * 100}
                sx={{ flex: 1, height: 8, borderRadius: 5, mx: 1 }}
              />
              <Typography variant="body2">{ratingCounts[star]}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography fontWeight="bold">{total} reviews</Typography>
        <Typography color="primary" sx={{ cursor: 'pointer', fontSize: 14 }}>
          Most relevant first
        </Typography>
      </Box>

      {reviewsData.map((r, i) => (
        <Box key={i} sx={{ mb: 3, border: '1px solid #eee', borderRadius: 2, p: 2 }}>
          <Box display="flex" alignItems="center" gap={2} mb={1}>
            <Avatar>{r.name.charAt(0)}</Avatar>
            <Box>
              <Typography fontWeight="bold">{r.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {r.date} • Verified customer
              </Typography>
            </Box>
          </Box>
          <Rating value={r.rating} readOnly size="small" />
          <Typography mt={1} mb={1}>{r.content}</Typography>
          <Button size="small" color="inherit" sx={{ fontSize: 13 }}>
            Helpful? 👍
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default ReviewsSection;
