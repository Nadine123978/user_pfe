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
import { styled, keyframes } from '@mui/material/styles';

const drawerWidth = 240;

// Keyframe animations
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
`;

const sparkleAnimation = keyframes`
  0%, 100% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
`;

const shimmerAnimation = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// Styled components
const CosmicDrawer = styled(Drawer)({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #2d1b69 100%)',
    borderRight: '1px solid rgba(99, 102, 241, 0.2)',
    boxShadow: '4px 0 24px rgba(0, 0, 0, 0.3)',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `
        radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)
      `,
      animation: `${floatAnimation} 8s ease-in-out infinite`,
      pointerEvents: 'none',
    },
  },
});

const FloatingParticles = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none',
  zIndex: 0,
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    width: '3px',
    height: '3px',
    background: '#6366f1',
    borderRadius: '50%',
    animation: `${sparkleAnimation} 4s linear infinite`,
  },
  '&::before': {
    top: '30%',
    left: '20%',
    animationDelay: '0s',
  },
  '&::after': {
    top: '70%',
    right: '20%',
    animationDelay: '2s',
    background: '#06b6d4',
  },
});

const BrandSection = styled(Box)({
  padding: '24px',
  borderBottom: '1px solid rgba(99, 102, 241, 0.2)',
  marginBottom: '8px',
  background: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(10px)',
  position: 'relative',
  zIndex: 1,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: 'linear-gradient(90deg, #6366f1, #06b6d4)',
  },
});

const BrandTitle = styled(Typography)({
  fontWeight: 700,
  fontSize: '1.2rem',
  letterSpacing: '0.5px',
  textAlign: 'center',
  background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  marginBottom: '4px',
});

const BrandSubtitle = styled(Typography)({
  color: 'rgba(255, 255, 255, 0.6)',
  fontSize: '0.75rem',
  textAlign: 'center',
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '1px',
});

const StyledList = styled(List)({
  paddingTop: '8px',
  paddingLeft: '8px',
  paddingRight: '8px',
  position: 'relative',
  zIndex: 1,
});

const StyledListItem = styled(ListItem)(({ 
  isActive = false, 
  isSubItem = false, 
  isLogout = false 
}) => ({
  paddingLeft: isSubItem ? '32px' : '24px',
  paddingRight: '24px',
  paddingTop: '12px',
  paddingBottom: '12px',
  marginLeft: '12px',
  marginRight: '12px',
  marginTop: '4px',
  marginBottom: '4px',
  borderRadius: '12px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  cursor: 'pointer',
  overflow: 'hidden',
  ...(isActive && {
    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(6, 182, 212, 0.1) 100%)',
    border: '1px solid rgba(99, 102, 241, 0.3)',
    boxShadow: '0 4px 20px rgba(99, 102, 241, 0.2)',
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: '4px',
      background: 'linear-gradient(180deg, #6366f1, #06b6d4)',
      borderRadius: '0 2px 2px 0',
    },
  }),
  '&:hover': {
    background: isLogout 
      ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%)'
      : 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%)',
    transform: 'translateX(4px)',
    boxShadow: isLogout
      ? '0 4px 20px rgba(239, 68, 68, 0.2)'
      : '0 4px 20px rgba(99, 102, 241, 0.15)',
    border: `1px solid ${isLogout ? 'rgba(239, 68, 68, 0.3)' : 'rgba(99, 102, 241, 0.2)'}`,
    '& .MuiListItemIcon-root': {
      transform: 'scale(1.1)',
      color: isLogout ? '#ef4444' : '#6366f1',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
      transition: 'left 0.5s ease',
      left: '100%',
    },
  },
  '&:active': {
    transform: 'translateX(2px)',
  },
}));

const StyledListItemIcon = styled(ListItemIcon)(({ isLogout = false, isActive = false }) => ({
  color: isLogout ? '#ef4444' : (isActive ? '#6366f1' : 'rgba(255, 255, 255, 0.7)'),
  minWidth: '40px',
  transition: 'all 0.3s ease',
  '& .MuiSvgIcon-root': {
    fontSize: '1.25rem',
    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
  },
}));

const StyledListItemText = styled(ListItemText)(({ isLogout = false, isActive = false }) => ({
  '& .MuiListItemText-primary': {
    fontSize: '0.875rem',
    fontWeight: isActive ? 600 : 500,
    color: isLogout ? '#ef4444' : (isActive ? '#6366f1' : 'rgba(255, 255, 255, 0.9)'),
    letterSpacing: '0.025em',
    transition: 'all 0.3s ease',
  },
}));

const ExpandIcon = styled(Box)(({ isOpen }) => ({
  color: 'rgba(255, 255, 255, 0.6)',
  transition: 'all 0.3s ease',
  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
}));

const LogoutSection = styled(Box)({
  marginTop: '16px',
  paddingTop: '16px',
  borderTop: '1px solid rgba(99, 102, 241, 0.2)',
  marginLeft: '12px',
  marginRight: '12px',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '20%',
    right: '20%',
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.5), transparent)',
  },
});

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

  return (
    <CosmicDrawer variant="permanent">
      <FloatingParticles />
      <Toolbar />
      
      {/* Brand Section */}
      <BrandSection>
        <BrandTitle variant="h6">
          ✨ Cosmic Events
        </BrandTitle>
        <BrandSubtitle variant="caption">
          Admin Portal
        </BrandSubtitle>
      </BrandSection>

      <StyledList>
        <StyledListItem 
          component={Link} 
          to="/admin"
          isActive={isActive('/admin')}
          button
        >
          <StyledListItemIcon isActive={isActive('/admin')}><Dashboard /></StyledListItemIcon>
          <StyledListItemText primary="🏠 Dashboard" isActive={isActive('/admin')} />
        </StyledListItem>

        {/* Category */}
        <StyledListItem onClick={handleClickCategory} button>
          <StyledListItemIcon><Category /></StyledListItemIcon>
          <StyledListItemText primary="📂 Category" />
          <ExpandIcon isOpen={openCategory}>
            {openCategory ? <ExpandLess /> : <ExpandMore />}
          </ExpandIcon>
        </StyledListItem>
        <Collapse in={openCategory} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <StyledListItem 
              isSubItem 
              component={Link} 
              to="/admin/category/add"
              isActive={isActive('/admin/category/add')}
              button
            >
              <StyledListItemIcon isActive={isActive('/admin/category/add')}><Add /></StyledListItemIcon>
              <StyledListItemText primary="➕ Add" isActive={isActive('/admin/category/add')} />
            </StyledListItem>
            <StyledListItem 
              isSubItem 
              component={Link} 
              to="/admin/category/manage"
              isActive={isActive('/admin/category/manage')}
              button
            >
              <StyledListItemIcon isActive={isActive('/admin/category/manage')}><ManageAccounts /></StyledListItemIcon>
              <StyledListItemText primary="⚙️ Manage" isActive={isActive('/admin/category/manage')} />
            </StyledListItem>
          </List>
        </Collapse>

        {/* Location */}
        <StyledListItem onClick={handleClickLocation} button>
          <StyledListItemIcon><LocationOn /></StyledListItemIcon>
          <StyledListItemText primary="📍 Location" />
          <ExpandIcon isOpen={openLocation}>
            {openLocation ? <ExpandLess /> : <ExpandMore />}
          </ExpandIcon>
        </StyledListItem>
        <Collapse in={openLocation} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <StyledListItem 
              isSubItem 
              component={Link} 
              to="/admin/location/add"
              isActive={isActive('/admin/location/add')}
              button
            >
              <StyledListItemIcon isActive={isActive('/admin/location/add')}><Add /></StyledListItemIcon>
              <StyledListItemText primary="➕ Add" isActive={isActive('/admin/location/add')} />
            </StyledListItem>
            <StyledListItem 
              isSubItem 
              component={Link} 
              to="/admin/location/manage"
              isActive={isActive('/admin/location/manage')}
              button
            >
              <StyledListItemIcon isActive={isActive('/admin/location/manage')}><ManageAccounts /></StyledListItemIcon>
              <StyledListItemText primary="⚙️ Manage" isActive={isActive('/admin/location/manage')} />
            </StyledListItem>
          </List>
        </Collapse>

        {/* Seating */}
        <StyledListItem 
          component={Link} 
          to="/admin/seating"
          isActive={isActive('/admin/seating')}
          button
        >
          <StyledListItemIcon isActive={isActive('/admin/seating')}><EventSeat /></StyledListItemIcon>
          <StyledListItemText primary="🪑 Manage Section" isActive={isActive('/admin/seating')} />
        </StyledListItem>

        {/* Events */}
        <StyledListItem onClick={handleClickEvents} button>
          <StyledListItemIcon><Event /></StyledListItemIcon>
          <StyledListItemText primary="🎪 Events" />
          <ExpandIcon isOpen={openEvents}>
            {openEvents ? <ExpandLess /> : <ExpandMore />}
          </ExpandIcon>
        </StyledListItem>
        <Collapse in={openEvents} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <StyledListItem 
              isSubItem 
              component={Link} 
              to="/admin/events/add"
              isActive={isActive('/admin/events/add')}
              button
            >
              <StyledListItemIcon isActive={isActive('/admin/events/add')}><Add /></StyledListItemIcon>
              <StyledListItemText primary="➕ Add Event" isActive={isActive('/admin/events/add')} />
            </StyledListItem>
            <StyledListItem 
              isSubItem 
              component={Link} 
              to="/admin/events/manage"
              isActive={isActive('/admin/events/manage')}
              button
            >
              <StyledListItemIcon isActive={isActive('/admin/events/manage')}><ManageAccounts /></StyledListItemIcon>
              <StyledListItemText primary="⚙️ Manage Events" isActive={isActive('/admin/events/manage')} />
            </StyledListItem>
          </List>
        </Collapse>

        <StyledListItem 
          component={Link} 
          to="/admin/gallery"
          isActive={isActive('/admin/gallery')}
          button
        >
          <StyledListItemIcon isActive={isActive('/admin/gallery')}><MenuBook /></StyledListItemIcon>
          <StyledListItemText primary="🖼️ Gallery" isActive={isActive('/admin/gallery')} />
        </StyledListItem>

        <StyledListItem 
          component={Link} 
          to="/admin/users"
          isActive={isActive('/admin/users')}
          button
        >
          <StyledListItemIcon isActive={isActive('/admin/users')}><SupervisorAccount /></StyledListItemIcon>
          <StyledListItemText primary="👥 Manage Users" isActive={isActive('/admin/users')} />
        </StyledListItem>

        {/* Bookings */}
        <StyledListItem onClick={handleClickBookings} button>
          <StyledListItemIcon><BookOnline /></StyledListItemIcon>
          <StyledListItemText primary="📋 Manage Bookings" />
          <ExpandIcon isOpen={openBookings}>
            {openBookings ? <ExpandLess /> : <ExpandMore />}
          </ExpandIcon>
        </StyledListItem>
        <Collapse in={openBookings} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <StyledListItem 
              isSubItem 
              component={Link} 
              to="/admin/bookings/all"
              isActive={isActive('/admin/bookings/all')}
              button
            >
              <StyledListItemIcon isActive={isActive('/admin/bookings/all')}><MenuBook /></StyledListItemIcon>
              <StyledListItemText primary="📊 All Bookings" isActive={isActive('/admin/bookings/all')} />
            </StyledListItem>
            <StyledListItem 
              isSubItem 
              component={Link} 
              to="/admin/bookings/new"
              isActive={isActive('/admin/bookings/new')}
              button
            >
              <StyledListItemIcon isActive={isActive('/admin/bookings/new')}><Add /></StyledListItemIcon>
              <StyledListItemText primary="🆕 New Bookings" isActive={isActive('/admin/bookings/new')} />
            </StyledListItem>
            <StyledListItem 
              isSubItem 
              component={Link} 
              to="/admin/bookings/cancelled"
              isActive={isActive('/admin/bookings/cancelled')}
              button
            >
              <StyledListItemIcon isActive={isActive('/admin/bookings/cancelled')}><MenuBook /></StyledListItemIcon>
              <StyledListItemText primary="❌ Cancelled Bookings" isActive={isActive('/admin/bookings/cancelled')} />
            </StyledListItem>
            <StyledListItem 
              isSubItem 
              component={Link} 
              to="/admin/bookings/confirmed"
              isActive={isActive('/admin/bookings/confirmed')}
              button
            >
              <StyledListItemIcon isActive={isActive('/admin/bookings/confirmed')}><MenuBook /></StyledListItemIcon>
              <StyledListItemText primary="✅ Confirmed Bookings" isActive={isActive('/admin/bookings/confirmed')} />
            </StyledListItem>
          </List>
        </Collapse>

        {/* Inbox */}
        <StyledListItem 
          component={Link} 
          to="/admin/inbox"
          isActive={isActive('/admin/inbox')}
          button
        >
          <StyledListItemIcon isActive={isActive('/admin/inbox')}><Inbox /></StyledListItemIcon>
          <StyledListItemText primary="📧 Inbox" isActive={isActive('/admin/inbox')} />
        </StyledListItem>

        <StyledListItem 
          component={Link} 
          to="/admin/settings"
          isActive={isActive('/admin/settings')}
          button
        >
          <StyledListItemIcon isActive={isActive('/admin/settings')}><Settings /></StyledListItemIcon>
          <StyledListItemText primary="⚙️ Website Setting" isActive={isActive('/admin/settings')} />
        </StyledListItem>

        {/* Logout with special styling */}
        <LogoutSection>
          <StyledListItem onClick={handleLogout} isLogout button>
            <StyledListItemIcon isLogout><Logout /></StyledListItemIcon>
            <StyledListItemText primary="🚪 Logout" isLogout />
          </StyledListItem>
        </LogoutSection>
      </StyledList>
    </CosmicDrawer>
  );
};

export default Sidebar;

