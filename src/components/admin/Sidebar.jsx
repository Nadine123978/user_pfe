import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Collapse } from '@mui/material';
import {
  Dashboard,
  Category,
  Event,
  Group,
  Bookmark,
  BookOnline,
  Cancel,
  Newspaper,
  Settings,
  SupervisorAccount,
  Subscriptions,
  MenuBook,
  ExpandLess,
  ExpandMore,
  Add,
  ManageAccounts
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = () => {
  const [openCategory, setOpenCategory] = React.useState(false);

  const handleClickCategory = () => {
    setOpenCategory(!openCategory);
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
          backgroundColor: '#f8f9fa',
          color: '#333'
        },
      }}
    >
      <Toolbar />
      <List>
        <ListItem button component={Link} to="/admin">
          <ListItemIcon sx={{ color: '#007bff' }}><Dashboard /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        {/* Category with nested items */}
        <ListItem button onClick={handleClickCategory}>
          <ListItemIcon sx={{ color: '#007bff' }}><Category /></ListItemIcon>
          <ListItemText primary="Category" />
          {openCategory ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openCategory} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button sx={{ pl: 4 }} component={Link} to="/admin/category/add">
              <ListItemIcon sx={{ color: '#007bff' }}><Add /></ListItemIcon>
              <ListItemText primary="Add" />
            </ListItem>
            <ListItem button sx={{ pl: 4 }} component={Link} to="/admin/category/manage">
              <ListItemIcon sx={{ color: '#007bff' }}><ManageAccounts /></ListItemIcon>
              <ListItemText primary="Manage" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button component={Link} to="/admin/sponsors">
          <ListItemIcon sx={{ color: '#007bff' }}><MenuBook /></ListItemIcon>
          <ListItemText primary="Manage Sponsors" />
        </ListItem>
        <ListItem button component={Link} to="/admin/events">
          <ListItemIcon sx={{ color: '#007bff' }}><Event /></ListItemIcon>
          <ListItemText primary="Events" />
        </ListItem>
        <ListItem button component={Link} to="/admin/users">
          <ListItemIcon sx={{ color: '#007bff' }}><SupervisorAccount /></ListItemIcon>
          <ListItemText primary="Manage Users" />
        </ListItem>
        <ListItem button component={Link} to="/admin/subscribers">
          <ListItemIcon sx={{ color: '#007bff' }}><Subscriptions /></ListItemIcon>
          <ListItemText primary="Manage Subscribers" />
        </ListItem>
        <ListItem button component={Link} to="/admin/bookings">
          <ListItemIcon sx={{ color: '#007bff' }}><BookOnline /></ListItemIcon>
          <ListItemText primary="Manage Bookings" />
        </ListItem>
        <ListItem button component={Link} to="/admin/news">
          <ListItemIcon sx={{ color: '#007bff' }}><Newspaper /></ListItemIcon>
          <ListItemText primary="News" />
        </ListItem>
        <ListItem button component={Link} to="/admin/settings">
          <ListItemIcon sx={{ color: '#007bff' }}><Settings /></ListItemIcon>
          <ListItemText primary="Website Setting" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
