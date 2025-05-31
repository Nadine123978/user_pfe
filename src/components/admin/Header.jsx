import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "#fff",
        color: '#333',
        height: 64,
        justifyContent: "center",
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
        px: 3,
      }}
    >
      <Toolbar disableGutters>
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
          Event Management System | Admin Panel
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;