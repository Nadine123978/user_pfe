import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardMedia
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TrendingCategories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get("http://localhost:8081/api/categories/trending?limit=4");
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch trending categories", err);
      }
    };
    fetchTrending();
  }, []);

  const handleSeeAll = () => {
    navigate("/categories");
  };

  return (
    <Box sx={{ backgroundColor: "#050d30", py: 6, px: { xs: 2, md: 6 }, mt: 8 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" color="white" fontWeight="bold">
          Trending categories
        </Typography>
        <Button
          variant="outlined"
          color="inherit"
          onClick={handleSeeAll}
          sx={{ color: "white", borderColor: "white" }}
        >
          SEE ALL
        </Button>
      </Box>

      <Typography variant="body1" color="gray" mb={4}>
        Be sure not to miss these Event today.
      </Typography>

      <Grid container spacing={4}>
        {categories.map((category, index) => {
          let cleanedUrl = category.imageUrl || "";
          cleanedUrl = cleanedUrl.replace("//", "/").replace("/images/", "/uploads/");
          const fullImageUrl = cleanedUrl.startsWith("http")
            ? cleanedUrl
            : `http://localhost:8081${cleanedUrl}`;

          return (
        <Grid item xs={6} sm={6} md={6} lg={6} key={index}>
  <Card sx={{ position: "relative", borderRadius: 2, overflow: "hidden" }}>
    <CardMedia
      component="img"
      height="240"
      image={fullImageUrl}
      alt={category.name}
      sx={{ filter: "brightness(0.85)" }}
    />
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        px: 2,
        py: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
      }}
    >
      <Typography variant="h6" color="white" fontWeight="bold">
        {category.name}
      </Typography>
      <Button
        variant="contained"
        size="small"
        color="primary"
        endIcon={<OpenInNewIcon />}
        onClick={() => navigate(`/category/${category.id}/events`)}
        sx={{ fontWeight: "bold" }}
      >
        Preview
      </Button>
    </Box>
  </Card>
</Grid>

          );
        })}
      </Grid>
    </Box>
  );
};

export default TrendingCategories;
