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
import LaunchIcon from "@mui/icons-material/Launch";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = ({ scrollTargets }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("userId");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // شاشة صغيرة أقل من 600px

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleScroll = (ref) => {
    handleMenuClose(); // أغلق القائمة لما تختار رابط
    if (location.pathname !== "/") {
      navigate("/");
      requestAnimationFrame(() => {
        ref?.current?.scrollIntoView({ behavior: "smooth" });
      });
    } else {
      ref?.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8081/api/users/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.warn("Logout request failed or not needed.");
    }
    localStorage.removeItem("userId");
    navigate("/login");
  };

  // الروابط اللي تظهر في القائمة
  const navLinks = [
    { label: "Home", action: () => handleScroll(scrollTargets?.homeRef) },
    { label: "Events", action: () => handleScroll(scrollTargets?.eventsRef) },
    { label: "How it Works", action: () => handleScroll(scrollTargets?.howItWorksRef) },
    { label: "Blogs", to: "/blogs" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(to right, #03045E, #000)",
        boxShadow: "none",
        borderBottom: "1px solid #fff",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", letterSpacing: 2 }}>
          SOCIETHY{" "}
          <Typography component="span" sx={{ fontSize: 10, ml: 0.5 }}>
            PARIS
          </Typography>
        </Typography>

        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              {navLinks.map((link) =>
                link.to ? (
                  <MenuItem
                    key={link.label}
                    component={Link}
                    to={link.to}
                    onClick={handleMenuClose}
                  >
                    {link.label}
                  </MenuItem>
                ) : (
                  <MenuItem key={link.label} onClick={link.action}>
                    {link.label}
                  </MenuItem>
                )
              )}

              {!isLoggedIn ? (
                <>
                  <MenuItem component={Link} to="/login" onClick={handleMenuClose}>
                    Login
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/signup"
                    onClick={handleMenuClose}
                    sx={{ fontWeight: "bold" }}
                  >
                    SignUP
                  </MenuItem>
                </>
              ) : (
                <MenuItem onClick={() => { handleLogout(); handleMenuClose(); }}>
                  Logout
                </MenuItem>
              )}
            </Menu>
          </>
        ) : (
          // عرض القائمة عادية على الشاشات الكبيرة
          <>
            <Box sx={{ display: "flex", gap: 4 }}>
              {navLinks.map((link) =>
                link.to ? (
                  <Link key={link.label} to={link.to} style={{ textDecoration: "none" }}>
                    <Button sx={{ color: "#fff", textTransform: "none", fontWeight: 500 }}>
                      {link.label}
                    </Button>
                  </Link>
                ) : (
                  <Button
                    key={link.label}
                    onClick={link.action}
                    sx={{ color: "#fff", textTransform: "none", fontWeight: 500 }}
                  >
                    {link.label}
                  </Button>
                )
              )}
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {!isLoggedIn && (
                <>
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    <Button sx={{ color: "#fff", textTransform: "none" }}>Login</Button>
                  </Link>
                  <Link to="/signup" style={{ textDecoration: "none" }}>
                    <Button
                      variant="outlined"
                      sx={{
                        color: "#fff",
                        borderColor: "#fff",
                        textTransform: "none",
                        "&:hover": {
                          borderColor: "#fff",
                          backgroundColor: "rgba(255,255,255,0.1)",
                        },
                      }}
                      endIcon={<LaunchIcon sx={{ fontSize: 18 }} />}
                    >
                      SignUP
                    </Button>
                  </Link>
                </>
              )}

              {isLoggedIn && (
                <Button
                  onClick={handleLogout}
                  sx={{
                    color: "#fff",
                    border: "1px solid #fff",
                    borderRadius: "20px",
                    textTransform: "none",
                    px: 2,
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  Logout
                </Button>
              )}
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
