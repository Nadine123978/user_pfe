import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Collapse } from '@mui/material';
import {
  Dashboard, Category, Event, Group, Bookmark, BookOnline, Cancel, Newspaper,
  Settings, SupervisorAccount, Subscriptions, MenuBook, ExpandLess, ExpandMore,
  Add, ManageAccounts
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = () => {
  const [openCategory, setOpenCategory] = React.useState(false);
  const handleClickCategory = () => setOpenCategory(!openCategory);

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
        <ListItem button component={Link} to="/admin">
          <ListItemIcon><Dashboard sx={{ color: '#007bff' }} /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

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

        <ListItem button component={Link} to="/admin/sponsors">
          <ListItemIcon><MenuBook sx={{ color: '#007bff' }} /></ListItemIcon>
          <ListItemText primary="Manage Sponsors" />
        </ListItem>
        <ListItem button component={Link} to="/admin/events">
          <ListItemIcon><Event sx={{ color: '#007bff' }} /></ListItemIcon>
          <ListItemText primary="Events" />
        </ListItem>
        <ListItem button component={Link} to="/admin/users">
          <ListItemIcon><SupervisorAccount sx={{ color: '#007bff' }} /></ListItemIcon>
          <ListItemText primary="Manage Users" />
        </ListItem>
        <ListItem button component={Link} to="/admin/subscribers">
          <ListItemIcon><Subscriptions sx={{ color: '#007bff' }} /></ListItemIcon>
          <ListItemText primary="Manage Subscribers" />
        </ListItem>
        <ListItem button component={Link} to="/admin/bookings">
          <ListItemIcon><BookOnline sx={{ color: '#007bff' }} /></ListItemIcon>
          <ListItemText primary="Manage Bookings" />
        </ListItem>
        <ListItem button component={Link} to="/admin/news">
          <ListItemIcon><Newspaper sx={{ color: '#007bff' }} /></ListItemIcon>
          <ListItemText primary="News" />
        </ListItem>
        <ListItem button component={Link} to="/admin/settings">
          <ListItemIcon><Settings sx={{ color: '#007bff' }} /></ListItemIcon>
          <ListItemText primary="Website Setting" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
