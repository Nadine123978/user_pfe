import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Button } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useNavigate } from 'react-router-dom'; // أضف هذا في الأعلى

import axios from 'axios';

const TrendingCategories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); // بعد useState


  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get('http://localhost:8081/api/categories/trending?limit=4');
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch trending categories", err);
      }
    };
    fetchTrending();
  }, []);

  return (
    <Box sx={{ backgroundColor: '#050d30', py: 6, px: 4, mt: 8 }}>
      <Typography variant="h4" color="white" fontWeight="bold" mb={1}>
        Trending Categories
      </Typography>
      <Typography variant="body1" color="gray" mb={4}>
        Don’t miss out on these events today.
      </Typography>

      <Grid container spacing={2}>
        {categories.map((category, index) => {
          console.log('Trending Category:', category);

          let cleanedUrl = category.imageUrl || '';
          // تنظيف الرابط من التكرارات والأجزاء الغلط
          cleanedUrl = cleanedUrl.replace('//', '/').replace('/images/', '/uploads/');
          const fullImageUrl = cleanedUrl.startsWith('http')
            ? cleanedUrl
            : `http://localhost:8081${cleanedUrl}`;

          console.log('Image URL raw:', category.imageUrl);
          console.log('Full Image URL:', fullImageUrl);

          return (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                sx={{
                  backgroundColor: '#0b1b4d',
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: 3,
                  height: '100%'
                }}
              >
                <img
                  src={fullImageUrl}
                  alt={category.name}
                  style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                />
                <Box sx={{ p: 2 }}>
                  <Typography variant="h6" color="white" fontWeight="bold">
                    {category.name}
                  </Typography>
                  <Button
  variant="text"
  color="primary"
  endIcon={<OpenInNewIcon />}
  sx={{ mt: 1 }}
  onClick={() => navigate(`/category/${category.id}/events`)}
>
  Explore
</Button>

                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default TrendingCategories;
