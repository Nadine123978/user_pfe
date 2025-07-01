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

  // Enhanced ListItem component with light, professional styling
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
        mx: 1.5,
        my: 0.5,
        borderRadius: 3,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        cursor: 'pointer',
        ...(isActive && {
          backgroundColor: 'rgba(99, 102, 241, 0.12)',
          borderLeft: '4px solid #6366f1',
          boxShadow: '0 2px 8px rgba(99, 102, 241, 0.15)',
          '&::before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '4px',
            backgroundColor: '#6366f1',
            borderRadius: '0 2px 2px 0',
          }
        }),
        '&:hover': {
          backgroundColor: isLogout 
            ? 'rgba(239, 68, 68, 0.08)' 
            : 'rgba(99, 102, 241, 0.06)',
          transform: 'translateX(4px)',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
          '& .MuiListItemIcon-root': {
            transform: 'scale(1.1)',
            color: isLogout ? '#ef4444' : '#6366f1',
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

  // Enhanced ListItemIcon with light theme styling
  const StyledListItemIcon = ({ children, isLogout = false, isActive = false }) => (
    <ListItemIcon 
      sx={{ 
        color: isLogout ? '#ef4444' : (isActive ? '#6366f1' : '#6b7280'),
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

  // Enhanced ListItemText with light theme typography
  const StyledListItemText = ({ primary, isLogout = false, isActive = false }) => (
    <ListItemText 
      primary={primary}
      sx={{ 
        '& .MuiListItemText-primary': { 
          fontSize: '0.875rem',
          fontWeight: isActive ? 600 : 500,
          color: isLogout ? '#ef4444' : (isActive ? '#6366f1' : '#374151'),
          letterSpacing: '0.025em',
          transition: 'all 0.3s ease'
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
          backgroundColor: '#ffffff',
          borderRight: '1px solid rgba(0, 0, 0, 0.08)',
          backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
          boxShadow: '2px 0 12px rgba(0, 0, 0, 0.04)',
        },
      }}
    >
      <Toolbar />
      
      {/* Brand Section */}
      <Box sx={{ 
        p: 3, 
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        mb: 1,
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)'
      }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 700, 
            color: '#1f2937',
            fontSize: '1.1rem',
            letterSpacing: '0.5px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #1f2937 0%, #6366f1 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Event Manager
        </Typography>
        <Typography 
          variant="caption" 
          sx={{ 
            color: '#6b7280',
            fontSize: '0.75rem',
            textAlign: 'center',
            display: 'block',
            mt: 0.5,
            fontWeight: 500
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
          <StyledListItemIcon isActive={isActive('/admin')}><Dashboard /></StyledListItemIcon>
          <StyledListItemText primary="Dashboard" isActive={isActive('/admin')} />
        </StyledListItem>

        {/* Category */}
        <StyledListItem onClick={handleClickCategory}>
          <StyledListItemIcon><Category /></StyledListItemIcon>
          <StyledListItemText primary="Category" />
          {openCategory ? 
            <ExpandLess sx={{ color: '#6b7280', transition: 'all 0.3s ease' }} /> : 
            <ExpandMore sx={{ color: '#6b7280', transition: 'all 0.3s ease' }} />
          }
        </StyledListItem>
        <Collapse in={openCategory} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <StyledListItem 
              isSubItem 
              component={Link} 
              to="/admin/category/add"
              isActive={isActive('/admin/category/add')}
            >
              <StyledListItemIcon isActive={isActive('/admin/category/add')}><Add /></StyledListItemIcon>
              <StyledListItemText primary="Add" isActive={isActive('/admin/category/add')} />
            </StyledListItem>
            <StyledListItem 
              isSubItem 
              component={Link} 
              to="/admin/category/manage"
              isActive={isActive('/admin/category/manage')}
            >
              <StyledListItemIcon isActive={isActive('/admin/category/manage')}><ManageAccounts /></StyledListItemIcon>
              <StyledListItemText primary="Manage" isActive={isActive('/admin/category/manage')} />
            </StyledListItem>
          </List>
        </Collapse>

        {/* Location */}
        <StyledListItem onClick={handleClickLocation}>
          <StyledListItemIcon><LocationOn /></StyledListItemIcon>
          <StyledListItemText primary="Location" />
          {openLocation ? 
            <ExpandLess sx={{ color: '#6b7280', transition: 'all 0.3s ease' }} /> : 
            <ExpandMore sx={{ color: '#6b7280', transition: 'all 0.3s ease' }} />
          }
        </StyledListItem>
        <Collapse in={openLocation} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <StyledListItem 
              isSubItem 
              component={Link} 
              to="/admin/location/add"
              isActive={isActive('/admin/location/add')}
            >
              <StyledListItemIcon isActive={isActive('/admin/location/add')}><Add /></StyledListItemIcon>
              <StyledListItemText primary="Add" isActive={isActive('/admin/location/add')} />
            </StyledListItem>
            <StyledListItem 
              isSubItem 
              component={Link} 
              to="/admin/location/manage"
              isActive={isActive('/admin/location/manage')}
            >
              <StyledListItemIcon isActive={isActive('/admin/location/manage')}><ManageAccounts /></StyledListItemIcon>
              <StyledListItemText primary="Manage" isActive={isActive('/admin/location/manage')} />
            </StyledListItem>
          </List>
        </Collapse>

        {/* Seating */}
        <StyledListItem 
          component={Link} 
          to="/admin/seating"
          isActive={isActive('/admin/seating')}
        >
          <StyledListItemIcon isActive={isActive('/admin/seating')}><EventSeat /></StyledListItemIcon>
          <StyledListItemText primary="Manage Section" isActive={isActive('/admin/seating')} />
        </StyledListItem>

        <StyledListItem onClick={handleClickSeating}>
          <StyledListItemIcon><EventSeat /></StyledListItemIcon>
          <StyledListItemText primary="Manage Seating" />
          {openSeating ? 
            <ExpandLess sx={{ color: '#6b7280', transition: 'all 0.3s ease' }} /> : 
            <ExpandMore sx={{ color: '#6b7280', transition: 'all 0.3s ease' }} />
          }
        </StyledListItem>

        <Collapse in={openSeating} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <StyledListItem 
              isSubItem 
              component={Link} 
              to="/admin/manage-seats"
              isActive={isActive('/admin/manage-seats')}
            >
              <StyledListItemIcon isActive={isActive('/admin/manage-seats')}><Add /></StyledListItemIcon>
              <StyledListItemText primary="Add Seat" isActive={isActive('/admin/manage-seats')} />
            </StyledListItem>
            <StyledListItem 
              isSubItem 
              component={Link} 
              to="/admin/seating/managee"
              isActive={isActive('/admin/seating/managee')}
            >
              <StyledListItemIcon isActive={isActive('/admin/seating/managee')}><ManageAccounts /></StyledListItemIcon>
              <StyledListItemText primary="Manage Seats" isActive={isActive('/admin/seating/managee')} />
            </StyledListItem>
          </List>
        </Collapse>

        {/* Manage Sponsors */}
        <StyledListItem 
          component={Link} 
          to="/admin/sponsors"
          isActive={isActive('/admin/sponsors')}
        >
          <StyledListItemIcon isActive={isActive('/admin/sponsors')}><MenuBook /></StyledListItemIcon>
          <StyledListItemText primary="Manage Sponsors" isActive={isActive('/admin/sponsors')} />
        </StyledListItem>

        {/* Events */}
        <StyledListItem onClick={handleClickEvents}>
          <StyledListItemIcon><Event /></StyledListItemIcon>
          <StyledListItemText primary="Events" />
          {openEvents ? 
            <ExpandLess sx={{ color: '#6b7280', transition: 'all 0.3s ease' }} /> : 
            <ExpandMore sx={{ color: '#6b7280', transition: 'all 0.3s ease' }} />
          }
        </StyledListItem>
        <Collapse in={openEvents} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <StyledListItem 
              isSubItem 
              component={Link} 
              to="/admin/events/add"
              isActive={isActive('/admin/events/add')}
            >
              <StyledListItemIcon isActive={isActive('/admin/events/add')}><Add /></StyledListItemIcon>
              <StyledListItemText primary="Add Event" isActive={isActive('/admin/events/add')} />
            </StyledListItem>
            <StyledListItem 
              isSubItem 
              component={Link} 
              to="/admin/events/manage"
              isActive={isActive('/admin/events/manage')}
            >
              <StyledListItemIcon isActive={isActive('/admin/events/manage')}><ManageAccounts /></StyledListItemIcon>
              <StyledListItemText primary="Manage Events" isActive={isActive('/admin/events/manage')} />
            </StyledListItem>
          </List>
        </Collapse>

        <StyledListItem 
          component={Link} 
          to="/admin/gallery"
          isActive={isActive('/admin/gallery')}
        >
          <StyledListItemIcon isActive={isActive('/admin/gallery')}><MenuBook /></StyledListItemIcon>
          <StyledListItemText primary="Gallery" isActive={isActive('/admin/gallery')} />
        </StyledListItem>

        <StyledListItem 
          component={Link} 
          to="/admin/users"
          isActive={isActive('/admin/users')}
        >
          <StyledListItemIcon isActive={isActive('/admin/users')}><SupervisorAccount /></StyledListItemIcon>
          <StyledListItemText primary="Manage Users" isActive={isActive('/admin/users')} />
        </StyledListItem>

        <StyledListItem 
          component={Link} 
          to="/admin/subscribers"
          isActive={isActive('/admin/subscribers')}
        >
          <StyledListItemIcon isActive={isActive('/admin/subscribers')}><Subscriptions /></StyledListItemIcon>
          <StyledListItemText primary="Manage Subscribers" isActive={isActive('/admin/subscribers')} />
        </StyledListItem>

        {/* Bookings */}
        <StyledListItem onClick={handleClickBookings}>
          <StyledListItemIcon><BookOnline /></StyledListItemIcon>
          <StyledListItemText primary="Manage Bookings" />
          {openBookings ? 
            <ExpandLess sx={{ color: '#6b7280', transition: 'all 0.3s ease' }} /> : 
            <ExpandMore sx={{ color: '#6b7280', transition: 'all 0.3s ease' }} />
          }
        </StyledListItem>
        <Collapse in={openBookings} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <StyledListItem 
              isSubItem 
              component={Link} 
              to="/admin/bookings/all"
              isActive={isActive('/admin/bookings/all')}
            >
              <StyledListItemIcon isActive={isActive('/admin/bookings/all')}><MenuBook /></StyledListItemIcon>
              <StyledListItemText primary="All Bookings" isActive={isActive('/admin/bookings/all')} />
            </StyledListItem>
            <StyledListItem 
              isSubItem 
              component={Link} 
              to="/admin/bookings/new"
              isActive={isActive('/admin/bookings/new')}
            >
              <StyledListItemIcon isActive={isActive('/admin/bookings/new')}><Add /></StyledListItemIcon>
              <StyledListItemText primary="New Bookings" isActive={isActive('/admin/bookings/new')} />
            </StyledListItem>
            <StyledListItem 
              isSubItem 
              component={Link} 
              to="/admin/bookings/cancelled"
              isActive={isActive('/admin/bookings/cancelled')}
            >
              <StyledListItemIcon isActive={isActive('/admin/bookings/cancelled')}><MenuBook /></StyledListItemIcon>
              <StyledListItemText primary="Cancelled Bookings" isActive={isActive('/admin/bookings/cancelled')} />
            </StyledListItem>
            <StyledListItem 
              isSubItem 
              component={Link} 
              to="/admin/bookings/confirmed"
              isActive={isActive('/admin/bookings/confirmed')}
            >
              <StyledListItemIcon isActive={isActive('/admin/bookings/confirmed')}><MenuBook /></StyledListItemIcon>
              <StyledListItemText primary="Confirmed Bookings" isActive={isActive('/admin/bookings/confirmed')} />
            </StyledListItem>
          </List>
        </Collapse>

        {/* Inbox */}
        <StyledListItem 
          component={Link} 
          to="/admin/inbox"
          isActive={isActive('/admin/inbox')}
        >
          <StyledListItemIcon isActive={isActive('/admin/inbox')}><Inbox /></StyledListItemIcon>
          <StyledListItemText primary="Inbox" isActive={isActive('/admin/inbox')} />
        </StyledListItem>

        <StyledListItem 
          component={Link} 
          to="/admin/news"
          isActive={isActive('/admin/news')}
        >
          <StyledListItemIcon isActive={isActive('/admin/news')}><Newspaper /></StyledListItemIcon>
          <StyledListItemText primary="News" isActive={isActive('/admin/news')} />
        </StyledListItem>

        <StyledListItem 
          component={Link} 
          to="/admin/settings"
          isActive={isActive('/admin/settings')}
        >
          <StyledListItemIcon isActive={isActive('/admin/settings')}><Settings /></StyledListItemIcon>
          <StyledListItemText primary="Website Setting" isActive={isActive('/admin/settings')} />
        </StyledListItem>

        {/* Logout with special styling */}
        <Box sx={{ 
          mt: 2, 
          pt: 2, 
          borderTop: '1px solid rgba(0, 0, 0, 0.08)',
          mx: 1.5
        }}>
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

