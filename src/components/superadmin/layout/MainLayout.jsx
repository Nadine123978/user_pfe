import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '../../admin/Sidebar';
import Header from './Header';

const drawerWidth = 240; // لازم يتوافق مع عرض Sidebar عندك

const MainLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar ثابت بالعرض المحدد */}
      <Box
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          position: 'fixed',
          height: '100vh',
          top: 0,
          left: 0,
          overflowY: 'auto',
          bgcolor: 'background.paper',
          zIndex: 1200, // فوق المحتوى
        }}
      >
        <Sidebar />
      </Box>

      {/* المحتوى الرئيسي مع Header */}
      <Box
        component="main"
        sx={{
          marginLeft: `${drawerWidth}px`, // نترك مساحة للـ Sidebar
          width: `calc(100% - ${drawerWidth}px)`,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        {/* Header مثبت فوق */}
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 1100,
            width: '100%',
            bgcolor: 'background.default',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
          }}
        >
          <Header />
        </Box>
        

        {/* محتوى الصفحة */}
        <Box sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
