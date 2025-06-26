import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = ({ scrollTargets }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("userId");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Changed to md for slightly larger mobile breakpoint
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleScroll = (ref) => {
    handleMenuClose();
    if (location.pathname !== "/") {
      navigate("/");
      requestAnimationFrame(() =>
        ref?.current?.scrollIntoView({ behavior: "smooth" })
      );
    } else {
      ref?.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  const navLinks = [
    { label: "Home", action: () => handleScroll(scrollTargets?.homeRef) },
    { label: "Events", action: () => handleScroll(scrollTargets?.eventsRef) },
    { label: "How it Works", action: () => handleScroll(scrollTargets?.howItWorksRef) },
    { label: "Blogs", to: "/blogs" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <AppBar
      position="sticky"
      elevation={4} // Added subtle shadow for depth
      sx={{
        backgroundColor: "#ffffff", // Clean white background
        color: "#333333", // Darker text for better contrast
        borderBottom: "none", // Removed bottom border for cleaner look
        py: 1,
        fontFamily: "'Inter', sans-serif", // Modern sans-serif font
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            letterSpacing: 1,
            cursor: "pointer",
            userSelect: "none",
            "&:hover": { color: "#6a1b9a" }, // Purple hover color
            display: 'flex',
            alignItems: 'center',
          }}
          onClick={() => navigate("/")}
        >
          SOCIETHY{' '}
          <Typography component="span" sx={{ fontSize: 14, ml: 0.5, fontWeight: "normal", color: '#6a1b9a' }}>
            EVENTS
          </Typography>
        </Typography>

        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <MenuIcon sx={{ color: "#333333" }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  backgroundColor: "#ffffff",
                  color: "#333333",
                  border: "1px solid #e0e0e0",
                  boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
                },
              }}
            >
              {navLinks.map((link) =>
                link.to ? (
                  <MenuItem
                    key={link.label}
                    component={Link}
                    to={link.to}
                    onClick={handleMenuClose}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#f3e5f5", // Light purple hover
                        color: "#6a1b9a",
                      },
                    }}
                  >
                    {link.label}
                  </MenuItem>
                ) : (
                  <MenuItem
                    key={link.label}
                    onClick={link.action}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#f3e5f5",
                        color: "#6a1b9a",
                      },
                    }}
                  >
                    {link.label}
                  </MenuItem>
                )
              )}
              {isLoggedIn && (
                <MenuItem
                  component={Link}
                  to="/my-bookings"
                  onClick={handleMenuClose}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f3e5f5",
                      color: "#6a1b9a",
                    },
                  }}
                >
                  My Bookings
                </MenuItem>
              )}
              {!isLoggedIn ? (
                <>
                  <MenuItem
                    component={Link}
                    to="/login"
                    onClick={handleMenuClose}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#f3e5f5",
                        color: "#6a1b9a",
                      },
                    }}
                  >
                    Login
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/signup"
                    onClick={handleMenuClose}
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: "#6a1b9a", // Purple background for signup
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#4a148c", // Darker purple on hover
                        color: "#fff",
                      },
                    }}
                  >
                    Sign Up
                  </MenuItem>
                </>
              ) : (
                <MenuItem
                  onClick={() => {
                    handleLogout();
                    handleMenuClose();
                  }}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f3e5f5",
                      color: "#6a1b9a",
                    },
                  }}
                >
                  Logout
                </MenuItem>
              )}
            </Menu>
          </>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            {navLinks.map((link) =>
              link.to ? (
                <Link
                  key={link.label}
                  to={link.to}
                  style={{ textDecoration: "none", color: "#333333" }}
                >
                  <Button
                    sx={{
                      color: "#333333",
                      textTransform: "none",
                      fontWeight: "600",
                      "&:hover": {
                        backgroundColor: "transparent",
                        color: "#6a1b9a",
                      },
                    }}
                  >
                    {link.label}
                  </Button>
                </Link>
              ) : (
                <Button
                  key={link.label}
                  onClick={link.action}
                  sx={{
                    color: "#333333",
                    textTransform: "none",
                    fontWeight: "600",
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: "#6a1b9a",
                    },
                  }}
                >
                  {link.label}
                </Button>
              )
            )}

            {isLoggedIn ? (
              <Button
                onClick={handleLogout}
                sx={{
                  color: "white",
                  backgroundColor: "#6a1b9a", // Purple logout button
                  borderRadius: "25px", // More rounded corners
                  px: 3,
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#4a148c",
                  },
                }}
              >
                Logout
              </Button>
            ) : (
              <>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Button
                    sx={{
                      color: "#333333",
                      textTransform: "none",
                      fontWeight: "600",
                      "&:hover": {
                        backgroundColor: "transparent",
                        color: "#6a1b9a",
                      },
                    }}
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  <Button
                    sx={{
                      backgroundColor: "#6a1b9a", // Purple signup button
                      color: "white",
                      borderRadius: "25px",
                      px: 3,
                      textTransform: "none",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#4a148c",
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;


