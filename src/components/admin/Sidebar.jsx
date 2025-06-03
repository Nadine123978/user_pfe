import React from 'react';
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText,
  Toolbar, Collapse
} from '@mui/material';
import {
  Dashboard, Category, Event, SupervisorAccount, Subscriptions,
  BookOnline, Newspaper, Settings, MenuBook, ExpandLess, ExpandMore,
  Add, ManageAccounts, Logout, EventSeat
} from '@mui/icons-material';  // استوردنا EventSeat هنا
import { Link, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = () => {
  const [openCategory, setOpenCategory] = React.useState(false);
  const [openBookings, setOpenBookings] = React.useState(false);

  const handleClickCategory = () => setOpenCategory(!openCategory);
  const handleClickBookings = () => setOpenBookings(!openBookings);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#f9f9f9',
          borderRight: '1px solid #ddd',
        },
      }}
    >
      <Toolbar />
      <List sx={{ pt: 1 }}>

        {/* Dashboard */}
        <ListItem button component={Link} to="/admin">
          <ListItemIcon><Dashboard sx={{ color: '#007bff' }} /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        {/* Category */}
        <ListItem button onClick={handleClickCategory}>
          <ListItemIcon><Category sx={{ color: '#007bff' }} /></ListItemIcon>
          <ListItemText primary="Category" />
          {openCategory ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openCategory} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button sx={{ pl: 4 }} component={Link} to="/admin/category/add">
              <ListItemIcon><Add sx={{ color: '#007bff' }} /></ListItemIcon>
              <ListItemText primary="Add" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} component={Link} to="/admin/category/manage">
              <ListItemIcon><ManageAccounts sx={{ color: '#007bff' }} /></ListItemIcon>
              <ListItemText primary="Manage" />
            </ListItem>
          </List>
        </Collapse>

        {/* New Section: Seating Panel */}
      <ListItem button component={Link} to="/admin/seating">
  <ListItemIcon><EventSeat sx={{ color: '#007bff' }} /></ListItemIcon>
  <ListItemText primary="Manage Seating" />
</ListItem>


        {/* Manage Sponsors */}
        <ListItem button component={Link} to="/admin/sponsors">
          <ListItemIcon><MenuBook sx={{ color: '#007bff' }} /></ListItemIcon>
          <ListItemText primary="Manage Sponsors" />
        </ListItem>

        {/* Events */}
        <ListItem button component={Link} to="/admin/events">
          <ListItemIcon><Event sx={{ color: '#007bff' }} /></ListItemIcon>
          <ListItemText primary="Events" />
        </ListItem>

        {/* Gallery */}
        <ListItem button component={Link} to="/admin/gallery">
          <ListItemIcon><MenuBook sx={{ color: '#007bff' }} /></ListItemIcon>
          <ListItemText primary="Gallery" />
        </ListItem>

        {/* Manage Users */}
        <ListItem button component={Link} to="/admin/users">
          <ListItemIcon><SupervisorAccount sx={{ color: '#007bff' }} /></ListItemIcon>
          <ListItemText primary="Manage Users" />
        </ListItem>

        {/* Manage Subscribers */}
        <ListItem button component={Link} to="/admin/subscribers">
          <ListItemIcon><Subscriptions sx={{ color: '#007bff' }} /></ListItemIcon>
          <ListItemText primary="Manage Subscribers" />
        </ListItem>

        {/* Manage Bookings */}
        <ListItem button onClick={handleClickBookings}>
          <ListItemIcon><BookOnline sx={{ color: '#007bff' }} /></ListItemIcon>
          <ListItemText primary="Manage Bookings" />
          {openBookings ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openBookings} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button sx={{ pl: 4 }} component={Link} to="/admin/bookings/all">
              <ListItemIcon><MenuBook sx={{ color: '#007bff' }} /></ListItemIcon>
              <ListItemText primary="All Bookings" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} component={Link} to="/admin/bookings/new">
              <ListItemIcon><Add sx={{ color: '#007bff' }} /></ListItemIcon>
              <ListItemText primary="New Bookings" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} component={Link} to="/admin/bookings/cancelled">
              <ListItemIcon><MenuBook sx={{ color: '#007bff' }} /></ListItemIcon>
              <ListItemText primary="Cancelled Bookings" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} component={Link} to="/admin/bookings/confirmed">
              <ListItemIcon><MenuBook sx={{ color: '#007bff' }} /></ListItemIcon>
              <ListItemText primary="Confirmed Bookings" />
            </ListItem>
          </List>
        </Collapse>

        {/* News */}
        <ListItem button component={Link} to="/admin/news">
          <ListItemIcon><Newspaper sx={{ color: '#007bff' }} /></ListItemIcon>
          <ListItemText primary="News" />
        </ListItem>

        {/* Website Setting */}
        <ListItem button component={Link} to="/admin/settings">
          <ListItemIcon><Settings sx={{ color: '#007bff' }} /></ListItemIcon>
          <ListItemText primary="Website Setting" />
        </ListItem>

        {/* Logout */}
        <ListItem button onClick={handleLogout}>
          <ListItemIcon><Logout sx={{ color: 'red' }} /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
