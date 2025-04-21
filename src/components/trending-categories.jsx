import { Box, Grid, Typography, Button } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const categories = [
  {
    title: 'Fashion',
    image: 'https://images.unsplash.com/photo-1586790188481-d1724e186fda'
  },
  {
    title: 'Music',
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf'
  },
  {
    title: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee'
  },
  {
    title: 'Art',
    image: 'https://images.unsplash.com/photo-1616401787026-6eaa35634719'
  }
];

const TrendingCategories = () => {
  return (
    <Box sx={{ backgroundColor: '#050d30', py: 6, px: 4, mt: 8 }}>
      <Typography variant="h4" color="white" fontWeight="bold" mb={1}>
        Trending categories
      </Typography>
      <Typography variant="body1" color="gray" mb={4}>
        Be sure not to miss these Event today.
      </Typography>

      <Grid container spacing={2}>
        {categories.map((category, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Box
              sx={{
                position: 'relative',
                height: 250,
                borderRadius: 1,
                overflow: 'hidden',
                backgroundImage: `url(${category.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '1px solid #555'
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 16,
                  left: 16,
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.2rem'
                }}
              >
                {category.title}
              </Box>
              <Button
                variant="outlined"
                endIcon={<OpenInNewIcon />}
                sx={{
                  position: 'absolute',
                  bottom: 16,
                  right: 16,
                  color: 'white',
                  borderColor: 'white',
                  backdropFilter: 'blur(4px)',
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  fontWeight: 'bold',
                  px: 2,
                  textTransform: 'none'
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
