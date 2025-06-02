import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Button } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import axios from 'axios';

const TrendingCategories = () => {
  const [categories, setCategories] = useState([]);
console.log("Trending categories: ", categories);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get("http://localhost:8081/api/categories/trending");
        setCategories(res.data);
        console.log("Trending categories:", res.data); // 👈 console log hon
      } catch (err) {
        console.error("Failed to fetch trending categories", err);
      }
    };
    fetchTrending();
  }, []);

  return (
    <Box sx={{ backgroundColor: '#050d30', py: 6, px: 4, mt: 8 }}>
      <Typography variant="h4" color="white" fontWeight="bold" mb={1}>
        Trending categories
      </Typography>
      <Typography variant="body1" color="gray" mb={4}>
        Be sure not to miss these Event today.
      </Typography>

     <Grid container spacing={2}>
  {/* الصف العلوي مع 2 صناديق */}
  {categories.slice(0, 2).map((category, index) => (
    <Grid item xs={12} md={6} key={index}>
      <Box
        sx={{
          position: 'relative',
          height: 300,
          borderRadius: 2,
          overflow: 'hidden',
          backgroundImage: `url(https://source.unsplash.com/random/800x600?sig=${index})`, // أو استخدم الصورة الحقيقية
          backgroundColor: '#222',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: '2px solid #444',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: 2
        }}
      >
        <Typography variant="h6" color="white" fontWeight="bold">
          {category.name}
        </Typography>
        <Button
          variant="outlined"
          endIcon={<OpenInNewIcon />}
          sx={{
            alignSelf: 'flex-end',
            color: 'white',
            borderColor: 'white',
            backdropFilter: 'blur(4px)',
            backgroundColor: 'rgba(0,0,0,0.5)',
            fontWeight: 'bold',
            px: 2,
            textTransform: 'none',
            mt: 'auto'
          }}
        >
          Preview
        </Button>
      </Box>
    </Grid>
  ))}
</Grid>

{/* الصف السفلي مع 2 صناديق */}
<Grid container spacing={2} sx={{ mt: 4 }}>
  {categories.slice(2, 4).map((category, index) => (
    <Grid item xs={12} md={6} key={index}>
      <Box
        sx={{
          position: 'relative',
          height: 300,
          borderRadius: 2,
          overflow: 'hidden',
          backgroundImage: `url(https://source.unsplash.com/random/800x600?sig=${index})`, // أو استخدم الصورة الحقيقية
          backgroundColor: '#222',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: '2px solid #444',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: 2
        }}
      >
        <Typography variant="h6" color="white" fontWeight="bold">
          {category.name}
        </Typography>
        <Button
          variant="outlined"
          endIcon={<OpenInNewIcon />}
          sx={{
            alignSelf: 'flex-end',
            color: 'white',
            borderColor: 'white',
            backdropFilter: 'blur(4px)',
            backgroundColor: 'rgba(0,0,0,0.5)',
            fontWeight: 'bold',
            px: 2,
            textTransform: 'none',
            mt: 'auto'
          }}
        >
          Preview
        </Button>
      </Box>
    </Grid>
  ))}
</Grid>

    </Box>
  );
};

export default TrendingCategories;
