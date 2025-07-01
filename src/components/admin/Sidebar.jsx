import React from 'react';
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText,
  Toolbar, Collapse, Box, Typography
} from '@mui/material';
import {
  Dashboard, Category, Event, SupervisorAccount, Subscriptions,
  BookOnline, Newspaper, Settings, MenuBook, ExpandLess, ExpandMore,
  Add, ManageAccounts, Logout, EventSeat, LocationOn, Inbox
} from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = () => {
  const [openCategory, setOpenCategory] = React.useState(false);
  const [openBookings, setOpenBookings] = React.useState(false);
  const [openEvents, setOpenEvents] = React.useState(false);
  const [openLocation, setOpenLocation] = React.useState(false);
  const [openSection, setOpenSection] = React.useState(false);
  const [openSeating, setOpenSeating] = React.useState(false);

  const handleClickCategory = () => setOpenCategory(!openCategory);
  const handleClickBookings = () => setOpenBookings(!openBookings);
  const handleClickEvents = () => setOpenEvents(!openEvents);
  const handleClickLocation = () => setOpenLocation(!openLocation);
  const handleClickSection = () => setOpenSection(!openSection);
  const handleClickSeating = () => setOpenSeating(!openSeating);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login", { replace: true });
  };

  // Check if current path matches the given path
  const isActive = (path) => location.pathname === path;

  // Enhanced ListItem component with professional styling
  const StyledListItem = ({ 
    children, 
    onClick, 
    component, 
    to, 
    isActive = false, 
    isSubItem = false,
    isLogout = false 
  }) => (
    <ListItem
      button
      onClick={onClick}
      component={component}
      to={to}
      sx={{
        px: isSubItem ? 4 : 3,
        py: 1.5,
        mx: 1,
        my: 0.5,
        borderRadius: 2,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        cursor: 'pointer',
        ...(isActive && {
          backgroundColor: 'rgba(79, 70, 229, 0.15)',
          borderLeft: '4px solid #4f46e5',
          '&::before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '4px',
            backgroundColor: '#4f46e5',
            borderRadius: '0 2px 2px 0',
          }
        }),
        '&:hover': {
          backgroundColor: isLogout 
            ? 'rgba(239, 68, 68, 0.1)' 
            : 'rgba(255, 255, 255, 0.08)',
          transform: 'translateX(4px)',
          '& .MuiListItemIcon-root': {
            transform: 'scale(1.1)',
          }
        },
        '&:active': {
          transform: 'translateX(2px)',
        }
      }}
    >
      {children}
    </ListItem>
  );

  // Enhanced ListItemIcon with consistent styling
  const StyledListItemIcon = ({ children, isLogout = false }) => (
    <ListItemIcon 
      sx={{ 
        color: isLogout ? '#ef4444' : '#ffffff',
        minWidth: 40,
        transition: 'all 0.3s ease',
        '& .MuiSvgIcon-root': {
          fontSize: '1.25rem',
          filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))'
        }
      }}
    >
      {children}
    </ListItemIcon>
  );

  // Enhanced ListItemText with better typography
  const StyledListItemText = ({ primary, isLogout = false }) => (
    <ListItemText 
      primary={primary}
      sx={{ 
        '& .MuiListItemText-primary': { 
          fontSize: '0.875rem',
          fontWeight: 500,
          color: isLogout ? '#ef4444' : '#ffffff',
          letterSpacing: '0.025em',
          transition: 'color 0.3s ease'
        } 
      }} 
    />
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#1a2332',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          backgroundImage: 'linear-gradient(180deg, #1a2332 0%, #1e293b 100%)',
        },
      }}
    >
      <Toolbar />
      
      {/* Brand Section */}
      <Box sx={{ 
        p: 3, 
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        mb: 1
      }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 700, 
            color: '#ffffff',
            fontSize: '1.1rem',
            letterSpacing: '0.5px',
            textAlign: 'center'
          }}
        >
          Event Manager
        </Typography>
        <Typography 
          variant="caption" 
          sx={{ 
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '0.75rem',
            textAlign: 'center',
            display: 'block',
            mt: 0.5
          }}
        >
          Admin Panel
        </Typography>
      </Box>

      <List sx={{ pt: 1, px: 1 }}>
        <StyledListItem 
          component={Link} 
          to="/admin"
          isActive={isActive('/admin')}
        >
          <StyledListItemIcon><Dashboard /></StyledListItemIcon>
          <StyledListItemText primary="Dashboard" />
        </StyledListItem>

        {/* Category */}
        <StyledListItem onClick={handleClickCategory}>
          <StyledListItemIcon><Category /></StyledListItemIcon>
          <StyledListItemText primary="Category" />
          {openCategory ? <ExpandLess sx={{ color: '#ffffff' }} /> : <ExpandMore sx={{ color: '#ffffff' }} />}
        </StyledListItem>
        <Collapse in={openCategory} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <StyledListItem 
              isSubItem 
              component={Link} 
              to="/admin/category/add"
              isActive={isActive('/admin/category/add')}
            >
              <StyledListItemIcon><Add /></StyledListItemIcon>
              <StyledListItemText primary="Add" />
            </StyledListItem>
            <StyledListItem 
              isSubItem 
              component={Link} 
              to="/admin/category/manage"
              isActive={isActive('/admin/category/manage')}
            >
              <StyledListItemIcon><ManageAccounts /></StyledListItemIcon>
              <StyledListItemText primary="Manage" />
            </StyledListItem>
          </List>
        </Collapse>

        {/* Location */}
        <StyledListItem onClick={handleClickLocation}>
          <StyledListItemIcon><LocationOn /></StyledListItemIcon>
          <StyledListItemText primary="Location" />
          {openLocation ? <ExpandLess sx={{ color: '#ffffff' }} /> : <ExpandMore sx={{ color: '#ffffff' }} />}
        </StyledListItem>
        <Collapse in={openLocation} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <StyledListItem 
              isSubItem 
              component={Link} 
              to="/admin/location/add"
              isActive={isActive('/admin/location/add')}
            >
              <StyledListItemIcon><Add /></StyledListItemIcon>
              <StyledListItemText primary="Add" />
            </StyledListItem>
            <StyledListItem 
              isSubItem 
              component={Link} 
              to="/admin/location/manage"
              isActive={isActive('/admin/location/manage')}
            >
              <StyledListItemIcon><ManageAccounts /></StyledListItemIcon>
              <StyledListItemText primary="Manage" />
            </StyledListItem>
          </List>
        </Collapse>

        {/* Seating */}
        <StyledListItem 
          component={Link} 
          to="/admin/seating"
          isActive={isActive('/admin/seating')}
        >
          <StyledListItemIcon><EventSeat /></StyledListItemIcon>
          <StyledListItemText primary="Manage Section" />
        </StyledListItem>

        <StyledListItem onClick={handleClickSeating}>
          <StyledListItemIcon><EventSeat /></StyledListItemIcon>
          <StyledListItemText primary="Manage Seating" />
          {openSeating ? <ExpandLess sx={{ color: '#ffffff' }} /> : <ExpandMore sx={{ color: '#ffffff' }} />}
        </StyledListItem>

        <Collapse in={openSeating} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <StyledListItem 
              isSubItem 
              component={Link} 
              to="/admin/manage-seats"
              isActive={isActive('/admin/manage-seats')}
            >
              <StyledListItemIcon><Add /></StyledListItemIcon>
              <StyledListItemText primary="Add Seat" />
            </StyledListItem>
            <StyledListItem 
              isSubItem 
              component={Link} 
              to="/admin/seating/managee"
              isActive={isActive('/admin/seating/managee')}
            >
              <StyledListItemIcon><ManageAccounts /></StyledListItemIcon>
              <StyledListItemText primary="Manage Seats" />
            </StyledListItem>
          </List>
        </Collapse>

        {/* Manage Sponsors */}
        <StyledListItem 
          component={Link} 
          to="/admin/sponsors"
          isActive={isActive('/admin/sponsors')}
        >
          <StyledListItemIcon><MenuBook /></StyledListItemIcon>
          <StyledListItemText primary="Manage Sponsors" />
        </StyledListItem>

        {/* Events */}
        <StyledListItem onClick={handleClickEvents}>
          <StyledListItemIcon><Event /></StyledListItemIcon>
          <StyledListItemText primary="Events" />
          {openEvents ? <ExpandLess sx={{ color: '#ffffff' }} /> : <ExpandMore sx={{ color: '#ffffff' }} />}
        </StyledListItem>
        <Collapse in={openEvents} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <StyledListItem 
              isSubItem 
              component={Link} 
              to="/admin/events/add"
              isActive={isActive('/admin/events/add')}
            >
              <StyledListItemIcon><Add /></StyledListItemIcon>
              <StyledListItemText primary="Add Event" />
            </StyledListItem>
            <StyledListItem 
              isSubItem 
              component={Link} 
              to="/admin/events/manage"
              isActive={isActive('/admin/events/manage')}
            >
              <StyledListItemIcon><ManageAccounts /></StyledListItemIcon>
              <StyledListItemText primary="Manage Events" />
            </StyledListItem>
          </List>
        </Collapse>

        <StyledListItem 
          component={Link} 
          to="/admin/gallery"
          isActive={isActive('/admin/gallery')}
        >
          <StyledListItemIcon><MenuBook /></StyledListItemIcon>
          <StyledListItemText primary="Gallery" />
        </StyledListItem>

        <StyledListItem 
          component={Link} 
          to="/admin/users"
          isActive={isActive('/admin/users')}
        >
          <StyledListItemIcon><SupervisorAccount /></StyledListItemIcon>
          <StyledListItemText primary="Manage Users" />
        </StyledListItem>

        <StyledListItem 
          component={Link} 
          to="/admin/subscribers"
          isActive={isActive('/admin/subscribers')}
        >
          <StyledListItemIcon><Subscriptions /></StyledListItemIcon>
          <StyledListItemText primary="Manage Subscribers" />
        </StyledListItem>

        {/* Bookings */}
        <StyledListItem onClick={handleClickBookings}>
          <StyledListItemIcon><BookOnline /></StyledListItemIcon>
          <StyledListItemText primary="Manage Bookings" />
          {openBookings ? <ExpandLess sx={{ color: '#ffffff' }} /> : <ExpandMore sx={{ color: '#ffffff' }} />}
        </StyledListItem>
        <Collapse in={openBookings} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <StyledListItem 
              isSubItem 
              component={Link} 
              to="/admin/bookings/all"
              isActive={isActive('/admin/bookings/all')}
            >
              <StyledListItemIcon><MenuBook /></StyledListItemIcon>
              <StyledListItemText primary="All Bookings" />
            </StyledListItem>
            <StyledListItem 
              isSubItem 
              component={Link} 
              to="/admin/bookings/new"
              isActive={isActive('/admin/bookings/new')}
            >
              <StyledListItemIcon><Add /></StyledListItemIcon>
              <StyledListItemText primary="New Bookings" />
            </StyledListItem>
            <StyledListItem 
              isSubItem 
              component={Link} 
              to="/admin/bookings/cancelled"
              isActive={isActive('/admin/bookings/cancelled')}
            >
              <StyledListItemIcon><MenuBook /></StyledListItemIcon>
              <StyledListItemText primary="Cancelled Bookings" />
            </StyledListItem>
            <StyledListItem 
              isSubItem 
              component={Link} 
              to="/admin/bookings/confirmed"
              isActive={isActive('/admin/bookings/confirmed')}
            >
              <StyledListItemIcon><MenuBook /></StyledListItemIcon>
              <StyledListItemText primary="Confirmed Bookings" />
            </StyledListItem>
          </List>
        </Collapse>

        {/* Inbox */}
        <StyledListItem 
          component={Link} 
          to="/admin/inbox"
          isActive={isActive('/admin/inbox')}
        >
          <StyledListItemIcon><Inbox /></StyledListItemIcon>
          <StyledListItemText primary="Inbox" />
        </StyledListItem>

        <StyledListItem 
          component={Link} 
          to="/admin/news"
          isActive={isActive('/admin/news')}
        >
          <StyledListItemIcon><Newspaper /></StyledListItemIcon>
          <StyledListItemText primary="News" />
        </StyledListItem>

        <StyledListItem 
          component={Link} 
          to="/admin/settings"
          isActive={isActive('/admin/settings')}
        >
          <StyledListItemIcon><Settings /></StyledListItemIcon>
          <StyledListItemText primary="Website Setting" />
        </StyledListItem>

        {/* Logout with special styling */}
        <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <StyledListItem onClick={handleLogout} isLogout>
            <StyledListItemIcon isLogout><Logout /></StyledListItemIcon>
            <StyledListItemText primary="Logout" isLogout />
          </StyledListItem>
        </Box>
      </List>
    </Drawer>
  );
};

export default Sidebar;

