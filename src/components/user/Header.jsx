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
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
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
      elevation={4}
      sx={{
        backgroundColor: "#200245",
        color: "#ffffff",
        borderBottom: "none",
        py: 1,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            letterSpacing: 1,
            cursor: "pointer",
            userSelect: "none",
            "&:hover": { color: "#1A0237" },
            display: "flex",
            alignItems: "center",
          }}
          onClick={() => navigate("/")}
        >
          SOCIETHY{" "}
          <Typography
            component="span"
            sx={{ fontSize: 14, ml: 0.5, fontWeight: "normal", color: "#E91E63" }}
          >
            EVENTS
          </Typography>
        </Typography>

        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={handleMenuOpen} size="large">
              <MenuIcon sx={{ color: "#ffffff" }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  background:
                    "linear-gradient(135deg, #2C3E50 0%, #4A148C 100%)",
                  color: "#ffffff",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0px 4px 20px rgba(0,0,0,0.3)",
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
                        backgroundColor: "#8E24AA",
                        color: "#fff",
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
                        backgroundColor: "#8E24AA",
                        color: "#fff",
                      },
                    }}
                  >
                    {link.label}
                  </MenuItem>
                )
              )}
              {/* زر My Bookings بسيط بدون أيقونة */}
              {isLoggedIn && (
                <MenuItem
                  component={Link}
                  to="/my-bookings"
                  onClick={handleMenuClose}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#8E24AA",
                      color: "#fff",
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
                        backgroundColor: "#8E24AA",
                        color: "#fff",
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
                      background:
                        "linear-gradient(45deg, #D81B60, #E91E63)",
                      color: "#fff",
                      "&:hover": {
                        background:
                          "linear-gradient(45deg, #C2185B, #D81B60)",
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
                      backgroundColor: "#8E24AA",
                      color: "#fff",
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
                  style={{ textDecoration: "none", color: "#ffffff" }}
                >
                  <Button
                    sx={{
                      color: "#ffffff",
                      textTransform: "none",
                      fontWeight: "600",
                      "&:hover": {
                        backgroundColor: "transparent",
                        color: "#E91E63",
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
                    color: "#ffffff",
                    textTransform: "none",
                    fontWeight: "600",
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: "#E91E63",
                    },
                  }}
                >
                  {link.label}
                </Button>
              )
            )}

            {isLoggedIn && (
              <Button
                onClick={() => navigate("/my-bookings")}
                sx={{
                  color: "#ffffff",
                  textTransform: "none",
                  fontWeight: "600",
                  border: "1px solid #E91E63",
                  borderRadius: "25px",
                  px: 2,
                  "&:hover": {
                    backgroundColor: "#E91E63",
                    color: "#fff",
                  },
                }}
              >
                My Bookings
              </Button>
            )}

            {isLoggedIn ? (
              <Button
                onClick={handleLogout}
                sx={{
                  color: "white",
                  background: "linear-gradient(45deg, #D81B60, #E91E63)",
                  borderRadius: "25px",
                  px: 3,
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": {
                    background: "linear-gradient(45deg, #C2185B, #D81B60)",
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
                      color: "#ffffff",
                      textTransform: "none",
                      fontWeight: "600",
                      "&:hover": {
                        backgroundColor: "transparent",
                        color: "#E91E63",
                      },
                    }}
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  <Button
                    sx={{
                      background: "linear-gradient(45deg, #D81B60, #E91E63)",
                      color: "white",
                      borderRadius: "25px",
                      px: 3,
                      textTransform: "none",
                      fontWeight: "bold",
                      "&:hover": {
                        background: "linear-gradient(45deg, #C2185B, #D81B60)",
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
