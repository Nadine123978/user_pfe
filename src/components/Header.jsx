import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = ({ scrollTargets }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("userId");

  const handleScroll = (ref) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        ref?.current?.scrollIntoView({ behavior: "smooth" });
      }, 100); // مننطر يرجع على الصفحة
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

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(to right, #03045E, #000)",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", letterSpacing: 2 }}>
          SOCIETHY{" "}
          <Typography component="span" sx={{ fontSize: 10, ml: 0.5 }}>
            PARIS
          </Typography>
        </Typography>

        <Box sx={{ display: "flex", gap: 4 }}>
          <Button onClick={() => handleScroll(scrollTargets?.homeRef)} sx={{ color: "#fff", textTransform: "none", fontWeight: 500 }}>
            Home
          </Button>
          <Button onClick={() => handleScroll(scrollTargets?.eventsRef)} sx={{ color: "#fff", textTransform: "none", fontWeight: 500 }}>
            Events
          </Button>
          <Button onClick={() => handleScroll(scrollTargets?.howItWorksRef)} sx={{ color: "#fff", textTransform: "none", fontWeight: 500 }}>
            How it Works
          </Button>
          <Link to="/blogs" style={{ textDecoration: "none" }}>
            <Button sx={{ color: "#fff", textTransform: "none", fontWeight: 500 }}>Blogs</Button>
          </Link>
          <Link to="/contact" style={{ textDecoration: "none" }}>
            <Button sx={{ color: "#fff", textTransform: "none", fontWeight: 500 }}>Contact</Button>
          </Link>
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
      </Toolbar>
    </AppBar>
  );
};

export default Header;
